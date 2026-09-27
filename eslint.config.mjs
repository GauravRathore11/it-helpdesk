import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Seed scripts are dev-only utilities, not production code
    "prisma/seed/**",
    "prisma/seed.ts",
  ]),
  {
    rules: {
      // Downgrade from error → warn so CI doesn't block on these
      // They're code quality issues, not bugs — fix incrementally
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Keep these as errors — they are real bugs
      "react-hooks/rules-of-hooks": "error",
      "react/no-unescaped-entities": "error",
    },
  },
]);

export default eslintConfig;
