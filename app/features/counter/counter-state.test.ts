import { describe, expect, it } from "vitest";
import type { CounterEvent, CounterSnapshot } from "~/features/counter/counter";
import {
	applyCounterEvent,
	createCounterViewState,
} from "~/features/counter/counter-state";

function createEvent(id: number, value: 1 | -1 = 1): CounterEvent {
	return {
		id,
		value,
		createdAt: `2026-07-27T12:34:${String(id).padStart(2, "0")}.000Z`,
	};
}

describe("counter client state", () => {
	it("applies new events once even when they arrive out of order", () => {
		const snapshot: CounterSnapshot = {
			value: 10,
			lastEventId: 10,
			events: [createEvent(10)],
		};
		const initialState = createCounterViewState(snapshot);
		const withEventTwelve = applyCounterEvent(initialState, createEvent(12));
		const withEventEleven = applyCounterEvent(
			withEventTwelve,
			createEvent(11, -1),
		);
		const duplicate = applyCounterEvent(withEventEleven, createEvent(12));
		const alreadyLoaded = applyCounterEvent(withEventEleven, createEvent(10));

		expect(withEventEleven.snapshot.value).toBe(10);
		expect(withEventEleven.snapshot.lastEventId).toBe(12);
		expect(withEventEleven.snapshot.events.map(({ id }) => id)).toEqual([
			12, 11, 10,
		]);
		expect(duplicate).toBe(withEventEleven);
		expect(alreadyLoaded).toBe(withEventEleven);
	});

	it("keeps only the ten newest events", () => {
		let state = createCounterViewState({
			value: 0,
			lastEventId: 0,
			events: [],
		});

		for (let id = 1; id <= 12; id += 1) {
			state = applyCounterEvent(state, createEvent(id));
		}

		expect(state.snapshot.events).toHaveLength(10);
		expect(state.snapshot.events.map(({ id }) => id)).toEqual([
			12, 11, 10, 9, 8, 7, 6, 5, 4, 3,
		]);
	});
});
