// Who is using the console: the signed-in online account, or a local offline profile when no server is reachable.
// Only public profile data is kept in localStorage; the online session itself lives in an httpOnly cookie.
import { net } from './net.js';

const KNOWN = 'ps5ux.accounts', CURRENT = 'ps5ux.current';
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } };
const clean = u => ({ id: u.id, psn: u.psn, avatar: u.avatar, online: !!u.online });

export const session = {
  current: null,
  get online() { return !!this.current?.online && net.mode === 'online'; },
  known() { return read(KNOWN, []); },
  remember(u) {
    const list = this.known().filter(x => x.id !== u.id);
    list.unshift(clean(u));
    write(KNOWN, list.slice(0, 6));
  },
  forget(id) { write(KNOWN, this.known().filter(x => x.id !== id)); if (read(CURRENT, null) === id) write(CURRENT, null); },
  use(u, online) {
    this.current = clean({ ...u, online });
    this.remember(this.current);
    write(CURRENT, this.current.id);
    document.dispatchEvent(new CustomEvent('session:change', { detail: this.current }));
  },
  lastId() { return read(CURRENT, null); },
  createLocal(psn, avatar) {
    const u = { id: 'local-' + Math.random().toString(36).slice(2, 10), psn, avatar, online: false };
    this.use(u, false);
    return this.current;
  },
  async signOut() {
    if (this.current?.online) await net.logout();
    try { sessionStorage.removeItem('ps5ux.nav'); } catch { /* ignore */ }
    write(CURRENT, null);
    this.current = null;
    document.dispatchEvent(new CustomEvent('session:change', { detail: null }));
  },
};
