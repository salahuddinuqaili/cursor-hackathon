import {
	type CounterEvent,
	readCounterEvent,
} from "~/features/counter/counter";

const COUNTER_EVENTS_URL = "/api/counter/events";
const COUNTER_CHANGED_EVENT = "counter-changed";
const COUNTER_SYNC_REQUIRED_EVENT = "counter-sync-required";

interface CounterSubscriptionOptions {
	afterEventId: number;
	onEvent: (event: CounterEvent) => void;
	onReconnect: () => void;
}

export function subscribeToCounterChanges({
	afterEventId,
	onEvent,
	onReconnect,
}: CounterSubscriptionOptions): () => void {
	if (typeof EventSource === "undefined") {
		return () => undefined;
	}

	const eventSource = new EventSource(
		`${COUNTER_EVENTS_URL}?afterEventId=${afterEventId}`,
	);
	const pendingEventTimers = new Set<number>();
	let pendingReconnect: number | undefined;
	let hasOpened = false;

	const scheduleEvent = (event: CounterEvent) => {
		const timer = window.setTimeout(() => {
			pendingEventTimers.delete(timer);
			onEvent(event);
		}, 0);
		pendingEventTimers.add(timer);
	};
	const scheduleReconnect = () => {
		if (pendingReconnect !== undefined) {
			return;
		}

		pendingReconnect = window.setTimeout(() => {
			pendingReconnect = undefined;
			onReconnect();
		}, 0);
	};
	const handleCounterEvent = (message: Event) => {
		if (!(message instanceof MessageEvent)) {
			scheduleReconnect();
			return;
		}

		try {
			const event = readCounterEvent(JSON.parse(String(message.data)));
			if (event) {
				scheduleEvent(event);
				return;
			}
		} catch {
			// A malformed stream event requires an authoritative snapshot.
		}

		scheduleReconnect();
	};
	const handleOpen = () => {
		if (hasOpened) {
			scheduleReconnect();
			return;
		}

		hasOpened = true;
	};

	eventSource.addEventListener(COUNTER_CHANGED_EVENT, handleCounterEvent);
	eventSource.addEventListener(COUNTER_SYNC_REQUIRED_EVENT, scheduleReconnect);
	eventSource.addEventListener("open", handleOpen);

	return () => {
		eventSource.removeEventListener(COUNTER_CHANGED_EVENT, handleCounterEvent);
		eventSource.removeEventListener(
			COUNTER_SYNC_REQUIRED_EVENT,
			scheduleReconnect,
		);
		eventSource.removeEventListener("open", handleOpen);
		eventSource.close();

		for (const timer of pendingEventTimers) {
			window.clearTimeout(timer);
		}

		if (pendingReconnect !== undefined) {
			window.clearTimeout(pendingReconnect);
		}
	};
}
