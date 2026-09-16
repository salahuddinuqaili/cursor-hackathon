import type { CounterEvent } from "~/features/counter/counter";

type CounterEventListener = (event: CounterEvent) => void;

interface CounterEventSubscription {
	latestEventId: number;
	unsubscribe: () => void;
}

export function createCounterEventHub() {
	const listeners = new Set<CounterEventListener>();
	let latestEventId = 0;

	return {
		publish(event: CounterEvent): void {
			latestEventId = Math.max(latestEventId, event.id);

			for (const listener of listeners) {
				listener(event);
			}
		},
		subscribe(listener: CounterEventListener): CounterEventSubscription {
			listeners.add(listener);

			return {
				latestEventId,
				unsubscribe: () => {
					listeners.delete(listener);
				},
			};
		},
	};
}

const counterEventHub = createCounterEventHub();

export function publishCounterEvent(event: CounterEvent): void {
	counterEventHub.publish(event);
}

export function subscribeToCounterEvents(
	listener: CounterEventListener,
): CounterEventSubscription {
	return counterEventHub.subscribe(listener);
}
