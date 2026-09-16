import { useEffect, useReducer } from "react";
import {
	data,
	type ShouldRevalidateFunctionArgs,
	useFetcher,
	useRevalidator,
} from "react-router";

import { Button } from "~/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import {
	COUNTER_DELTA,
	type CounterEvent,
	type CounterSnapshot,
	formatCounterTimestamp,
	formatCounterValue,
} from "~/features/counter/counter";
import {
	getCounterSnapshot,
	parseCounterDelta,
	recordCounterEvent,
} from "~/features/counter/counter.server";
import { publishCounterEvent } from "~/features/counter/counter-events.server";
import {
	applyCounterEvent,
	createCounterViewState,
} from "~/features/counter/counter-state";
import { subscribeToCounterChanges } from "~/features/counter/counter-sync.client";

import type { Route } from "./+types/route";

interface CounterActionError {
	ok: false;
	error: string;
}

interface CounterActionSuccess {
	ok: true;
	event: CounterEvent;
}

type CounterActionData = CounterActionError | CounterActionSuccess;

export function meta() {
	return [
		{ title: "Counter" },
		{
			name: "description",
			content:
				"A persistent counter backed by an append-only SQLite event log.",
		},
	];
}

export async function loader() {
	return getCounterSnapshot();
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const parsedDelta = parseCounterDelta(formData);

	if (!parsedDelta.success) {
		return data<CounterActionError>(
			{ ok: false, error: "Choose plus one or minus one." },
			{ status: 400 },
		);
	}

	const event = await recordCounterEvent(parsedDelta.data);
	publishCounterEvent(event);

	return { ok: true, event };
}

export function shouldRevalidate({
	formMethod,
	defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs): boolean {
	if (formMethod && formMethod.toUpperCase() !== "GET") {
		return false;
	}

	return defaultShouldRevalidate;
}

export default function CounterRoute({ loaderData }: Route.ComponentProps) {
	return (
		<CounterScreen key={loaderData.lastEventId} initialSnapshot={loaderData} />
	);
}

function CounterScreen({
	initialSnapshot,
}: {
	initialSnapshot: CounterSnapshot;
}) {
	const [counterState, applyEvent] = useReducer(
		applyCounterEvent,
		initialSnapshot,
		createCounterViewState,
	);
	const { snapshot } = counterState;

	useCounterSync(initialSnapshot.lastEventId, applyEvent);

	return (
		<main className="hardframe-safe-area flex min-h-dvh bg-frame-ink">
			<div className="flex w-full flex-1 flex-col bg-background">
				<header className="bg-frame-ink px-4 py-3 text-background">
					<h1 className="text-balance font-ui text-heading-2">
						Counter / Event Log
					</h1>
				</header>

				<div
					id="main-content"
					className="mx-auto flex w-full min-w-0 max-w-3xl flex-1 flex-col gap-section-sm px-3 py-8 compact:px-4 md:py-12"
				>
					<CounterControls snapshot={snapshot} onEvent={applyEvent} />
					<CounterHistory events={snapshot.events} />
				</div>

				<footer className="border-t border-frame-ink px-4 py-3 font-body text-body-sm text-muted-foreground">
					SQLite is the source of truth. Every change is an immutable event.
				</footer>
			</div>
		</main>
	);
}

function CounterControls({
	snapshot,
	onEvent,
}: {
	snapshot: CounterSnapshot;
	onEvent: (event: CounterEvent) => void;
}) {
	const fetcher = useFetcher<CounterActionData>();
	const isPending = fetcher.state !== "idle";
	const error = fetcher.data?.ok === false ? fetcher.data.error : null;
	const persistedEvent = fetcher.data?.ok ? fetcher.data.event : null;

	useEffect(() => {
		if (persistedEvent) {
			onEvent(persistedEvent);
		}
	}, [onEvent, persistedEvent]);

	return (
		<section
			aria-labelledby="current-count-heading"
			className="flex flex-col border border-frame-ink bg-card"
		>
			<div className="bg-tint-sage px-4 py-3">
				<h2
					id="current-count-heading"
					className="text-balance font-ui text-heading-2"
				>
					Current Count
				</h2>
			</div>

			<div className="flex flex-col items-center gap-6 px-4 py-8 md:py-10">
				<output
					aria-label="Current count"
					aria-live="polite"
					aria-atomic="true"
					data-value={snapshot.value}
					className="min-w-0 font-display text-8xl leading-none tabular-nums"
				>
					{formatCounterValue(snapshot.value)}
				</output>

				<fetcher.Form
					method="post"
					aria-busy={isPending}
					className="grid w-full max-w-sm grid-cols-2 gap-3"
				>
					<Button
						type="submit"
						name="delta"
						value={COUNTER_DELTA.decrement}
						variant="outline"
						size="lg"
						disabled={isPending}
						aria-label="Decrease by one"
					>
						−1
					</Button>
					<Button
						type="submit"
						name="delta"
						value={COUNTER_DELTA.increment}
						size="lg"
						disabled={isPending}
						aria-label="Increase by one"
					>
						+1
					</Button>
				</fetcher.Form>

				<p
					role="status"
					aria-live="polite"
					className="min-h-5 text-pretty font-body text-body-sm text-muted-foreground"
				>
					{error ?? (isPending ? "Recording change…" : "")}
				</p>
			</div>
		</section>
	);
}

function CounterHistory({ events }: { events: CounterEvent[] }) {
	return (
		<section
			aria-labelledby="recent-changes-heading"
			className="flex flex-col gap-3"
		>
			<h2
				id="recent-changes-heading"
				className="text-balance font-display text-heading-1"
			>
				Last 10 Changes
			</h2>

			<Table>
				<TableCaption className="sr-only">
					The ten most recently recorded counter events, newest first.
				</TableCaption>
				<TableHeader>
					<TableRow className="bg-card">
						<TableHead scope="col">Event</TableHead>
						<TableHead scope="col">Change</TableHead>
						<TableHead scope="col">Recorded (UTC)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{events.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={3}
								className="h-24 text-center text-pretty text-muted-foreground"
							>
								No changes yet. Use either button to record the first event.
							</TableCell>
						</TableRow>
					) : (
						events.map((event) => (
							<TableRow key={event.id} data-counter-event>
								<TableCell className="tabular-nums">#{event.id}</TableCell>
								<TableCell className="font-ui text-ui tabular-nums">
									{event.value === COUNTER_DELTA.increment ? "+1" : "−1"}
								</TableCell>
								<TableCell className="tabular-nums">
									<time dateTime={event.createdAt}>
										{formatCounterTimestamp(event.createdAt)}
									</time>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</section>
	);
}

function useCounterSync(
	afterEventId: number,
	onEvent: (event: CounterEvent) => void,
): void {
	const { revalidate } = useRevalidator();

	useEffect(() => {
		return subscribeToCounterChanges({
			afterEventId,
			onEvent,
			onReconnect: revalidate,
		});
	}, [afterEventId, onEvent, revalidate]);
}
