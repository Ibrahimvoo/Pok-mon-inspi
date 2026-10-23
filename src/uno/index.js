// UNO inside the console: a real game behind the launch splash, kept alive while the session is suspended
// (Home / Control Center) and closed with the session.
import './uno.css';
import { h } from '../ui.js';
import { audio } from '../audio.js';
import { UnoGame } from './game.js';
import { online, ID } from './online.js';
import { hostOf } from './online.js';
import { session as account } from '../session.js';

export { ID as UNO_ID };
let game = null;

export function unoScreen() {
  const fresh = !game;
  game ||= new UnoGame();
  const g = game;
  const root = h('div.uno-layer', g.root);
  const layer = {
    root, opaque: true, bg: null, mood: 'party', shade: 0,
    hints: () => g.hints(),
    onAction: a => g.action(a),
    back: () => g.action('back'),
    onEnter() {
      g.layer = layer;
      audio.duck(0, .6);
      if (fresh) {
        g.start();
        // launched from a friend's invitation: straight to their lobby
        const by = hostOf();
        if (by && by !== account.current?.id) g.joinHost(by);
      } else g.resume();
    },
    onResume() { audio.duck(0, .4); },
    onLeave() { g.lastFocus = layer.focused; g.suspend(); },
  };
  g.layer = layer;
  if (g.table) g.table.layer = layer;
  if (g.lastFocus?.isConnected) layer.focused = g.lastFocus;
  return layer;
}
export function closeUno() { game?.destroy(); game = null; }
export { online as unoOnline };
