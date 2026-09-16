export const COUNTER_DELTA = {
	decrement: -1,
	increment: 1,
} as const;
export const RECENT_COUNTER_EVENT_LIMIT = 10;

export type CounterDelta = (typeof COUNTER_DELTA)[keyof typeof COUNTER_DELTA];

export interface CounterEvent {
	id: number;
	value: CounterDelta;
	createdAt: string;
}

export interface CounterSnapshot {
	value: number;
	events: CounterEvent[];
	lastEventId: number;
}

const counterNumberFormatter = new Intl.NumberFormat("en-US");
const counterTimestampFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	hour: "2-digit",
	hourCycle: "h23",
	minute: "2-digit",
	month: "2-digit",
	second: "2-digit",
	timeZone: "UTC",
	year: "numeric",
});

export function applyCounterDelta(value: number, delta: CounterDelta): number {
	return value + delta;
}

export function readCounterDelta(
	value: FormDataEntryValue | null,
): CounterDelta | null {
	if (value === String(COUNTER_DELTA.increment)) {
		return COUNTER_DELTA.increment;
	}

	if (value === String(COUNTER_DELTA.decrement)) {
		return COUNTER_DELTA.decrement;
	}

	return null;
}

export function readCounterEvent(value: unknown): CounterEvent | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}

	if (
		!("id" in value) ||
		typeof value.id !== "number" ||
		!Number.isSafeInteger(value.id) ||
		value.id < 1
	) {
		return null;
	}

	if (
		!("value" in value) ||
		(value.value !== COUNTER_DELTA.increment &&
			value.value !== COUNTER_DELTA.decrement)
	) {
		return null;
	}

	if (
		!("createdAt" in value) ||
		typeof value.createdAt !== "string" ||
		Number.isNaN(Date.parse(value.createdAt))
	) {
		return null;
	}

	return {
		id: value.id,
		value: value.value,
		createdAt: value.createdAt,
	};
}

export function formatCounterValue(value: number): string {
	return counterNumberFormatter.format(value);
}

export function formatCounterTimestamp(timestamp: string): string {
	const parts = counterTimestampFormatter.formatToParts(new Date(timestamp));
	const readPart = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? "";

	return `${readPart("year")}-${readPart("month")}-${readPart("day")} ${readPart("hour")}:${readPart("minute")}:${readPart("second")} UTC`;
}
