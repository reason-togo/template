import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.mts',
    css: false,
    server: {
      deps: {
        inline: [/@csstools/, /@asamuzakjp/, /tailwindcss/],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '\\.(css|less|scss|sass)$': path.resolve(__dirname, './vitest-css-mock.js'),
    },
  },
});
