CREATE TABLE `counter_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`value` integer NOT NULL,
	`created_at` integer NOT NULL,
	CONSTRAINT "counter_events_value_check" CHECK("value" in (-1, 1))
);
