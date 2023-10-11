import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
    },
    sequence: {
      concurrent: true,
    },
    testTimeout: 20000,
  },
});
