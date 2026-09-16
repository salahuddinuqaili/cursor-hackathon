import { sql } from "drizzle-orm";
import { check, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const counterEvents = sqliteTable(
	"counter_events",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		value: integer().notNull(),
		createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
	},
	(table) => [
		check("counter_events_value_check", sql`${table.value} in (-1, 1)`),
	],
);
