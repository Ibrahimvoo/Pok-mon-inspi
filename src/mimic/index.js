// Mimic Party inside the console: a real game behind the launch splash, kept alive while the session is suspended
// (Home / Control Center) and closed with the session.
import './mimic.css';
import { h } from '../ui.js';
import { audio } from '../audio.js';
import { Game } from './game.js';
import { online } from './online.js';
import { ID } from './signals.js';

export { ID as MIMIC_ID };
let game = null;

export function mimicScreen() {
  const fresh = !game;
  game ||= new Game();
  const g = game;
  // a new wrapper each time: the previous one may still be fading out after a suspend
  const root = h('div.mmp-layer', g.root);
  const layer = {
    root, opaque: true, bg: null, mood: 'party', shade: 0,
    hints: () => g.hints(),
    onAction: a => g.action(a),
    back: () => g.action('back'),
    onEnter() {
      g.layer = layer;
      audio.duck(0, .6);
      if (fresh) {
        // launched from a friend's invitation: straight to their lobby
        g.start().then(() => { const by = online.invited(); if (by && !g.closed) online.join(g, by); }).catch(e => console.error(e));
      }
      else g.resume();
    },
    onResume() { audio.duck(0, .4); },
    onLeave() { g.lastFocus = layer.focused; g.suspend(); },
  };
  g.layer = layer;
  if (g.lastFocus?.isConnected) layer.focused = g.lastFocus;
  return layer;
}
export function closeMimic() { game?.destroy(); game = null; }
