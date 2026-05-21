import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Exclude generated LD components from Fast Refresh — they are read-only
      exclude: /src\/components\/ld\/.*/,
    }),
  ],
  base: '/pages/r0d088m/Explore/',
  server: {
    port: 3099,
  },
});
