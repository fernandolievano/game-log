import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
