import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "../env";

const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle({ client });

if (import.meta.hot) {
	import.meta.hot.dispose(() => client.close());
}
