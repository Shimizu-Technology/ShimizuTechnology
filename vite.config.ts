import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        work: fileURLToPath(new URL('./work/index.html', import.meta.url)),
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
