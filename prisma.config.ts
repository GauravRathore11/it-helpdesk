import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    seed: "ts-node -P tsconfig.seed.json prisma/seed.ts",
  },
  datasource: {
    // Use DIRECT_URL for migrations (bypasses pgbouncer pooler).
    // Falls back to DATABASE_URL if DIRECT_URL is not set.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
