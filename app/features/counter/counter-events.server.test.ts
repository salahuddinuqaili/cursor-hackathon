import { describe, expect, it, vi } from "vitest";

import { createCounterEventHub } from "~/features/counter/counter-events.server";

describe("counter event hub", () => {
	it("publishes persisted events and reports the latest published id", () => {
		const hub = createCounterEventHub();
		const firstListener = vi.fn();
		const secondListener = vi.fn();
		const firstSubscription = hub.subscribe(firstListener);
		const secondSubscription = hub.subscribe(secondListener);
		const firstEvent = {
			id: 41,
			value: 1 as const,
			createdAt: "2026-07-27T12:34:56.000Z",
		};
		const secondEvent = {
			id: 42,
			value: -1 as const,
			createdAt: "2026-07-27T12:35:56.000Z",
		};

		expect(firstSubscription.latestEventId).toBe(0);
		hub.publish(firstEvent);
		firstSubscription.unsubscribe();
		hub.publish(secondEvent);

		expect(firstListener).toHaveBeenCalledOnce();
		expect(firstListener).toHaveBeenCalledWith(firstEvent);
		expect(secondListener).toHaveBeenNthCalledWith(1, firstEvent);
		expect(secondListener).toHaveBeenNthCalledWith(2, secondEvent);
		expect(secondSubscription.latestEventId).toBe(0);
		expect(hub.subscribe(vi.fn()).latestEventId).toBe(42);
	});
});
