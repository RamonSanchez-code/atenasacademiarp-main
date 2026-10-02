import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './', plugins: [react(), tailwindcss()],
    // Nao existe `define` de variaveis de ambiente aqui de proposito: tudo que e
    // declarado em `define` vai embutido no JavaScript publico e fica visivel
    // para qualquer visitante. Segredos devem ficar no servidor, nunca no bundle.
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Divide as bibliotecas em um arquivo proprio: elas quase nunca mudam,
      // entao o visitante reaproveita o cache a cada atualizacao do site.
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['motion'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
