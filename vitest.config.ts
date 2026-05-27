import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    pool: "forks",
    // Parallel forks intermittently crash on Windows ("Cannot read properties of
    // undefined (reading 'config')") when several files load the AI SDK at once.
    // The suite is small, so run files sequentially for deterministic results.
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
