// Among Us inside the console: the game behind the launch splash, kept alive while the session is suspended
// (Home / Control Center) and closed with the session.
import './among.css';
import { h } from '../ui.js';
import { audio } from '../audio.js';
import { AmongApp } from './app.js';
import { endSession } from '../screens/game.js';

export const AMONG_ID = 'among-us';
let app = null;

export function amongScreen() {
  const fresh = !app;
  app ||= new AmongApp();
  const a = app;
  a.exit = () => endSession();
  const root = h('div.au-layer', a.root);
  return {
    root, opaque: true, bg: null, mood: 'party', shade: 0, noHints: true,
    onAction: (act, ev) => (act === 'ps' ? false : a.action(act, ev) || true),
    back: () => a.action('back'),
    onEnter() { audio.duck(0, .4); if (fresh) a.start(); else a.resume(); },
    onResume() { audio.duck(0, .4); a.resume(); },
    onLeave() { a.suspend(); },
  };
}
export function closeAmong() { app?.destroy(); app = null; }
