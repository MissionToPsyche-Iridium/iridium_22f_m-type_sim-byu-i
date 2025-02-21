import { defineConfig } from "vitest/config";

 export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.js',
        include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)', 'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  

    }
});