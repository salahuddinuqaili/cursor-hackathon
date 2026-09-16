import { describe, expect, it } from "vitest";

import {
	applyCounterDelta,
	COUNTER_DELTA,
	formatCounterTimestamp,
	formatCounterValue,
	readCounterDelta,
	readCounterEvent,
} from "~/features/counter/counter";

describe("counter domain", () => {
	it("applies both supported deltas", () => {
		expect(applyCounterDelta(7, COUNTER_DELTA.increment)).toBe(8);
		expect(applyCounterDelta(7, COUNTER_DELTA.decrement)).toBe(6);
	});

	it("rejects values outside the counter contract", () => {
		expect(readCounterDelta("1")).toBe(COUNTER_DELTA.increment);
		expect(readCounterDelta("-1")).toBe(COUNTER_DELTA.decrement);
		expect(readCounterDelta("2")).toBeNull();
		expect(readCounterDelta(null)).toBeNull();
	});

	it("formats persisted timestamps deterministically in UTC", () => {
		expect(formatCounterTimestamp("2026-07-27T12:34:56.789Z")).toBe(
			"2026-07-27 12:34:56 UTC",
		);
	});

	it("formats large counter values for scanning", () => {
		expect(formatCounterValue(1234)).toBe("1,234");
	});

	it("accepts only complete persisted events at the stream boundary", () => {
		expect(
			readCounterEvent({
				id: 7,
				value: 1,
				createdAt: "2026-07-27T12:34:56.000Z",
			}),
		).toEqual({
			id: 7,
			value: 1,
			createdAt: "2026-07-27T12:34:56.000Z",
		});
		expect(
			readCounterEvent({ id: 7, value: 2, createdAt: "invalid" }),
		).toBeNull();
		expect(readCounterEvent(null)).toBeNull();
	});
});
