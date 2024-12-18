import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["answerstack_*"],
} satisfies Config;
