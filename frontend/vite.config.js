import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://image-generator-xofb.onrender.com', // Proxy API requests to the backend
    },
  },
});
