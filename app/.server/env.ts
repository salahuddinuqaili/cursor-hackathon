import "dotenv/config";

import { z } from "zod";

const serverEnvironmentSchema = z.object({
	DATABASE_URL: z
		.string()
		.trim()
		.min(1, "DATABASE_URL is required")
		.startsWith("file:", "DATABASE_URL must use the file: SQLite URL scheme"),
});

const serverEnvironment = serverEnvironmentSchema.safeParse(process.env);

if (!serverEnvironment.success) {
	throw new Error(
		`Invalid server environment:\n${z.prettifyError(serverEnvironment.error)}`,
	);
}

export const env = serverEnvironment.data;
