import type { CounterEvent } from "~/features/counter/counter";
import { subscribeToCounterEvents } from "~/features/counter/counter-events.server";

import type { Route } from "./+types/counter-events.route";

const encoder = new TextEncoder();
const CONNECTED_MESSAGE = encoder.encode(": connected\n\n");
const SYNC_REQUIRED_MESSAGE = encoder.encode(
	"event: counter-sync-required\ndata: {}\n\n",
);
const HEARTBEAT_MESSAGE = encoder.encode(": heartbeat\n\n");
const HEARTBEAT_INTERVAL_MS = 15_000;

function encodeCounterEvent(event: CounterEvent): Uint8Array {
	return encoder.encode(
		`id: ${event.id}\nevent: counter-changed\ndata: ${JSON.stringify(event)}\n\n`,
	);
}

function readLastEventId(request: Request): number {
	const value = Number(
		new URL(request.url).searchParams.get("afterEventId") ?? 0,
	);

	return Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

export function loader({ request }: Route.LoaderArgs) {
	const lastEventId = readLastEventId(request);
	let closeConnection: () => void = () => undefined;

	const stream = new ReadableStream<Uint8Array>({
		start(controller) {
			let isClosed = false;
			let unsubscribe: () => void = () => undefined;

			const close = () => {
				if (isClosed) {
					return;
				}

				isClosed = true;
				clearInterval(heartbeat);
				unsubscribe();
				request.signal.removeEventListener("abort", close);
			};
			const send = (message: Uint8Array) => {
				if (isClosed) {
					return;
				}

				try {
					controller.enqueue(message);
				} catch {
					close();
				}
			};
			const heartbeat = setInterval(
				() => send(HEARTBEAT_MESSAGE),
				HEARTBEAT_INTERVAL_MS,
			);

			const subscription = subscribeToCounterEvents((event) =>
				send(encodeCounterEvent(event)),
			);
			unsubscribe = subscription.unsubscribe;
			closeConnection = close;
			request.signal.addEventListener("abort", close, { once: true });
			send(CONNECTED_MESSAGE);

			if (subscription.latestEventId > lastEventId) {
				send(SYNC_REQUIRED_MESSAGE);
			}
		},
		cancel() {
			closeConnection();
		},
	});

	return new Response(stream, {
		headers: {
			"Cache-Control": "no-cache, no-transform",
			Connection: "keep-alive",
			"Content-Type": "text/event-stream",
			"X-Accel-Buffering": "no",
		},
	});
}
