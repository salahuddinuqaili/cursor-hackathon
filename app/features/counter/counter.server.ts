import { desc, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/.server/db";
import {
	COUNTER_DELTA,
	type CounterDelta,
	type CounterEvent,
	type CounterSnapshot,
	RECENT_COUNTER_EVENT_LIMIT,
} from "~/features/counter/counter";
import { counterEvents } from "~/features/counter/schema.server";

const counterDeltaSchema = z
	.union([
		z.literal(String(COUNTER_DELTA.decrement)),
		z.literal(String(COUNTER_DELTA.increment)),
	])
	.transform(
		(value): CounterDelta =>
			value === String(COUNTER_DELTA.increment)
				? COUNTER_DELTA.increment
				: COUNTER_DELTA.decrement,
	);

export function parseCounterDelta(formData: FormData) {
	return counterDeltaSchema.safeParse(formData.get("delta"));
}

export async function recordCounterEvent(
	value: CounterDelta,
): Promise<CounterEvent> {
	const [event] = await db
		.insert(counterEvents)
		.values({ value, createdAt: new Date() })
		.returning();

	if (!event) {
		throw new Error("The counter event could not be recorded.");
	}

	return {
		...event,
		value,
		createdAt: event.createdAt.toISOString(),
	};
}

export async function getCounterSnapshot(): Promise<CounterSnapshot> {
	const [totalRows, recentRows] = await Promise.all([
		db
			.select({
				value: sql<number>`coalesce(sum(${counterEvents.value}), 0)`,
			})
			.from(counterEvents),
		db
			.select()
			.from(counterEvents)
			.orderBy(desc(counterEvents.id))
			.limit(RECENT_COUNTER_EVENT_LIMIT),
	]);

	return {
		value: Number(totalRows[0]?.value ?? 0),
		lastEventId: recentRows[0]?.id ?? 0,
		events: recentRows.map((event) => ({
			...event,
			value:
				event.value === COUNTER_DELTA.increment
					? COUNTER_DELTA.increment
					: COUNTER_DELTA.decrement,
			createdAt: event.createdAt.toISOString(),
		})),
	};
}
