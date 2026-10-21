// Builds the claude.ai artifact variant: one HTML page with inlined CSS/JS and Google Fonts; art files ship alongside.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist-artifact');
execSync('npx vite build --mode artifact', { cwd: root, stdio: 'inherit' });
let html = readFileSync(join(out, 'index.html'), 'utf8');
const asset = f => readFileSync(join(out, f.replace(/^\.\//, '')), 'utf8');
const fonts = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600&family=Cinzel:wght@700&family=Bebas+Neue&family=Syncopate:wght@700&family=Cormorant+Garamond:wght@600&family=Teko:wght@600&family=Big+Shoulders+Display:wght@800&family=Unbounded:wght@700&family=Rajdhani:wght@600&family=Josefin+Sans:wght@300&family=Playfair+Display:ital,wght@1,700&family=Anton&family=Luckiest+Guy&display=swap';
html = html
  .replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/, (_, f) => `<link rel="stylesheet" href="${fonts}">\n<style>${asset(f)}</style>`)
  .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, f) => `<script type="module">${asset(f).replace(/<\/script/g, '<\\/script')}</script>`)
  .replace(/<!doctype html>|<\/?html[^>]*>|<\/?head>|<\/?body>/gi, '')
  .replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/g, '')
  .replace('<title>Console UI — Concept PS5</title>', '<title>Console UI Concept</title>');
writeFileSync(join(out, 'page.html'), html.trim() + '\n');
const art = readdirSync(join(out, 'art'));
writeFileSync(join(out, 'files.json'), JSON.stringify(Object.fromEntries(art.map(f => [`art/${f}`, `dist-artifact/art/${f}`])), null, 0));
console.log(`page.html ${(html.length / 1024).toFixed(0)} KB · ${art.length} art files`);
