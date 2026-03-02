import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicos: resolve(__dirname, 'servicos.html'),
        emergencia: resolve(__dirname, 'emergencia.html'),
      },
    },
  },
});

