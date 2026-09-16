import { defineConfig } from "drizzle-kit";

import { env } from "./app/.server/env";

export default defineConfig({
	schema: "./app/features/**/schema.server.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
