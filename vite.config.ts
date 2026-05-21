import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Exclude generated LD components from Fast Refresh — they are read-only
      exclude: /src\/components\/ld\/.*/,
    }),
  ],
  // Vercel serves from root (/), GitHub Pages needs /WRMC/
  // Switch back to '/WRMC/' if re-deploying to GitHub Pages
  base: '/',
  server: {
    port: 3099,
  },
});
