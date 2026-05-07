import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    proxy: {
      '/exercises': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
    },
  },
});