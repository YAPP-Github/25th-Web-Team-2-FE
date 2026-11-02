import path from 'path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    reporters: ['junit', 'default'],
    outputFile: 'test-results.xml',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@schema': path.resolve(__dirname, './src/schema'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@edit': path.resolve(__dirname, './src/app/edit'),
      '@home': path.resolve(__dirname, './src/app/home'),
      '@join': path.resolve(__dirname, './src/app/join'),
      '@login': path.resolve(__dirname, './src/app/login'),
      '@my-posts': path.resolve(__dirname, './src/app/my-posts'),
      '@post': path.resolve(__dirname, './src/app/post'),
      '@upload': path.resolve(__dirname, './src/app/upload'),
      '@user': path.resolve(__dirname, './src/app/user'),
    },
  },
});
