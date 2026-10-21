import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Relative base so the build works from any sub-path (GitHub Pages, static hosting).
// `--mode artifact` builds the single-page variant published on claude.ai: fonts come from Google Fonts there.
export default defineConfig(({ mode }) => ({
  base: './',
  resolve: mode === 'artifact' ? { alias: { './fonts.js': fileURLToPath(new URL('./tools/empty.js', import.meta.url)) } } : {},
  build: {
    target: ['es2020', 'safari14'], assetsInlineLimit: 0, chunkSizeWarningLimit: 800,
    outDir: mode === 'artifact' ? 'dist-artifact' : 'dist',
  },
}));
