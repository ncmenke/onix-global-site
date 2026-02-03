import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // This is the safety net that stops the Black Screen crash
  define: {
    'process.env': {},
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
});