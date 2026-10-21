import { defineConfig } from 'vite';

// Relative base so the build works from any sub-path (GitHub Pages, static hosting, artifacts).
export default defineConfig({
  base: './',
  build: { target: ['es2020', 'safari14'], assetsInlineLimit: 0, chunkSizeWarningLimit: 800 },
});
