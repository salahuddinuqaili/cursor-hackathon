import {
	type CounterEvent,
	type CounterSnapshot,
	RECENT_COUNTER_EVENT_LIMIT,
} from "~/features/counter/counter";

export interface CounterViewState {
	snapshot: CounterSnapshot;
	initialLastEventId: number;
	appliedEventIds: ReadonlySet<number>;
}

export function createCounterViewState(
	snapshot: CounterSnapshot,
): CounterViewState {
	return {
		snapshot,
		initialLastEventId: snapshot.lastEventId,
		appliedEventIds: new Set(),
	};
}

export function applyCounterEvent(
	state: CounterViewState,
	event: CounterEvent,
): CounterViewState {
	if (
		event.id <= state.initialLastEventId ||
		state.appliedEventIds.has(event.id)
	) {
		return state;
	}

	const appliedEventIds = new Set(state.appliedEventIds);
	appliedEventIds.add(event.id);

	const events = [event, ...state.snapshot.events]
		.sort((first, second) => second.id - first.id)
		.slice(0, RECENT_COUNTER_EVENT_LIMIT);

	return {
		...state,
		appliedEventIds,
		snapshot: {
			value: state.snapshot.value + event.value,
			events,
			lastEventId: Math.max(state.snapshot.lastEventId, event.id),
		},
	};
}
