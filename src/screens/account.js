// Account creation and sign-in. Online accounts are validated by the server; without a server, a local profile is offered.
import { GAMES, byId } from '../data.js';
import { isPhoto } from '../avatars.js';
import { pickPhoto } from '../photo.js';
import { h, icon, art, img } from '../ui.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { audio } from '../audio.js';
import { go, renderHints } from '../shell.js';
import { net, NetError } from '../net.js';
import { session } from '../session.js';
import { openKeyboard } from '../keyboard.js';

const PSN_RE = /^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
const PADS = ['ps', 'xbox', 'nintendo', 'generic'];
export function checkSignup({ psn, password, confirm }, offline) {
  const e = {};
  if (!PSN_RE.test(psn)) e.psn = 'De 3 à 16 caractères : lettres, chiffres, « - » ou « _ », en commençant par une lettre.';
  if (!offline) {
    if (password.length < 8) e.password = 'Au moins 8 caractères.';
    else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) e.password = 'Utilisez au moins une lettre et un chiffre.';
    if (confirm !== password) e.confirm = 'Les mots de passe ne correspondent pas.';
  }
  return e;
}

function field({ label, type = 'text', value = '', hint, autocomplete, maxLength = 32, onEnter }) {
  const inp = h('input.f-input', { type, value, autocomplete, maxLength, autocapitalize: 'none', autocorrect: 'off', spellcheck: false, enterkeyhint: 'next', 'aria-label': label });
  const err = h('div.f-err', { role: 'alert' });
  const row = h('div.f-row', { f: true, onok: () => edit() }, h('label.f-label', label), inp, hint && h('div.f-hint', hint), err);
  function edit() {
    if (PADS.includes(input.device)) {
      openKeyboard({ title: label, value: inp.value, password: type === 'password', maxLength, onDone: v => { inp.value = v; inp.dispatchEvent(new Event('input')); } });
    } else inp.focus();
  }
  row.addEventListener('focus:f', () => { if (input.device === 'kb') inp.focus({ preventScroll: true }); });
  inp.addEventListener('focus', () => { if (nav.top?.root.contains(row) && nav.top.focused !== row) nav.focus(row, { silent: true }); });
  inp.addEventListener('input', () => { row.classList.remove('error'); err.textContent = ''; });
  inp.addEventListener('keydown', e => {
    const k = e.key;
    if (!['ArrowDown', 'ArrowUp', 'Tab', 'Enter'].includes(k)) return;
    e.preventDefault(); e.stopPropagation();
    if (k === 'Enter' && onEnter) { inp.blur(); onEnter(); return; }
    inp.blur();
    nav.move(k === 'ArrowUp' || (k === 'Tab' && e.shiftKey) ? 'up' : 'down');
  });
  return {
    row, inp,
    get value() { return inp.value; },
    error(msg) { err.textContent = msg || ''; row.classList.toggle('error', !!msg); },
  };
}

export function accountScreen({ mode = 'signup', psn = '', first = false, onDone } = {}) {
  let busy = false;
  const offline = () => net.mode !== 'online';
  const root = h('div.account');
  let avatar = GAMES[(Math.random() * GAMES.length) | 0].id;
  let f = {};

  function render() {
    const signup = mode === 'signup';
    const off = offline();
    f = {
      psn: field({ label: 'Identifiant en ligne', value: f.psn?.value ?? psn, hint: signup ? '3 à 16 caractères. C’est le nom que verront vos amis.' : null, autocomplete: 'username', maxLength: 16 }),
      password: off ? null : field({ label: 'Mot de passe', type: 'password', value: '', hint: signup ? 'Au moins 8 caractères, dont une lettre et un chiffre.' : null, autocomplete: signup ? 'new-password' : 'current-password', maxLength: 128, onEnter: signup ? null : submit }),
      confirm: off || !signup ? null : field({ label: 'Confirmer le mot de passe', type: 'password', autocomplete: 'new-password', maxLength: 128, onEnter: submit }),
    };
    const pick = (el, a) => { avatar = a; root.querySelectorAll('.av-opt').forEach(x => x.classList.toggle('on', x === el)); preview.replaceChildren(img(art.thumb(avatar))); audio.play('toggle'); };
    // first option: a photo from the gallery (or the camera)
    const photoOpt = signup ? h(`div.av-opt.av-photo${isPhoto(avatar) ? '.on' : ''}`, { f: true, title: 'Choisir une photo', onok: async () => {
      try {
        const url = await pickPhoto();
        if (!url) return;
        photoOpt.replaceChildren(img(url));
        pick(photoOpt, url);
      } catch (e) { audio.play('error'); layer.showError(e.message); }
    } }, isPhoto(avatar) ? img(avatar) : [h('span.icw', { html: icon('plus') }), h('small', 'Ma photo')]) : null;
    const avatars = signup ? h('div.av-pick', { 'data-row': '', 'data-scroll': 'x', 'data-pad': 60 }, photoOpt, GAMES.map(g => {
      const el = h(`div.av-opt${g.id === avatar ? '.on' : ''}`, { f: true, title: g.title, onok: () => pick(el, g.id) }, img(art.thumb(g.id)));
      return el;
    })) : null;
    const preview = h('div.avatar.acc-preview', img(art.thumb(signup ? avatar : (session.known().find(k => k.psn.toLowerCase() === (psn || '').toLowerCase())?.avatar || avatar))));
    const banner = h('div.acc-banner.hidden');
    const submitBtn = h('button.btn.primary.acc-submit', { f: true, onok: submit }, off ? 'Créer mon profil' : signup ? 'Créer mon compte' : 'Se connecter');
    root.replaceChildren(
      h('div.acc-wrap',
        h('div.acc-side', preview,
          h('h1', signup ? (first ? 'Bienvenue' : 'Créer un compte') : 'Se connecter'),
          h('p', signup ? (off ? 'Choisissez votre pseudo et votre avatar. Vous pourrez ensuite inviter un ami dans un salon pour jouer et parler ensemble.' : 'Créez votre compte pour retrouver vos amis, rejoindre leurs groupes et discuter en vocal.') : 'Connectez-vous avec votre identifiant en ligne et votre mot de passe.'),
          h('div.acc-privacy', h('span.icw', { html: icon('lock') }), off ? 'Profil enregistré uniquement sur cet appareil, sans mot de passe.' : 'Votre mot de passe est chiffré sur le serveur (scrypt) et jamais stocké sur l’appareil. Session protégée par un cookie sécurisé.')),
        h('div.acc-form',
          off ? h('div.acc-banner', h('span.icw', { html: icon('wifi') }), h('div', h('b', 'Pas besoin de compte en ligne'), h('div', 'Choisissez un pseudo : votre profil reste sur cet appareil. Pour jouer et parler avec un ami : Base de jeu → Créer un salon.')),
            h('button.btn.small', { f: true, onok: retry }, 'Réessayer')) : null,
          banner,
          f.psn.row, f.password?.row, f.confirm?.row,
          avatars ? [h('div.f-label.av-label', 'Avatar'), avatars] : null,
          h('div.acc-actions', submitBtn,
            off ? null : h('button.btn', { f: true, onok: () => { mode = signup ? 'login' : 'signup'; audio.play('tab'); render(); } }, signup ? 'J’ai déjà un compte' : 'Créer un compte')))));
    layer.banner = banner; layer.submitBtn = submitBtn;
    f.psn.row.setAttribute('data-autofocus', '');
    if (nav.top === layer) nav.focusFirst(layer);
  }

  async function retry() {
    audio.play('ok');
    await net.probe();
    render();
    if (offline()) layer.showError('Toujours aucune réponse du serveur. Vérifiez votre connexion.');
  }

  async function submit() {
    if (busy) return;
    const signup = mode === 'signup', off = offline();
    const values = { psn: f.psn.value.trim(), password: f.password?.value || '', confirm: f.confirm?.value || '' };
    Object.values(f).forEach(x => x?.error(''));
    layer.banner.classList.add('hidden');
    const errs = signup ? checkSignup(values, off) : (!values.psn || !values.password ? { psn: !values.psn ? 'Saisissez votre identifiant.' : '', password: !values.password ? 'Saisissez votre mot de passe.' : '' } : {});
    const bad = Object.entries(errs).filter(([, v]) => v);
    if (bad.length) {
      bad.forEach(([k, v]) => f[k]?.error(v));
      audio.play('error');
      nav.focus(f[bad[0][0]].row);
      return;
    }
    if (off) { // local profile
      const u = session.createLocal(values.psn, avatar);
      audio.play('ok');
      return done(u, false);
    }
    busy = true;
    const label = layer.submitBtn.textContent;
    layer.submitBtn.replaceChildren(h('span.btn-spin'), signup ? 'Création du compte…' : 'Connexion…');
    layer.submitBtn.setAttribute('aria-busy', 'true');
    try {
      const user = signup ? await net.register({ psn: values.psn, password: values.password, avatar }) : await net.login({ psn: values.psn, password: values.password });
      audio.play('ok');
      done(user, true);
    } catch (e) {
      audio.play('error');
      if (e.fields) Object.entries(e.fields).forEach(([k, v]) => f[k]?.error(v));
      else if (e.code === 'bad_credentials') { f.password?.error(e.message); }
      layer.showError(e instanceof NetError ? e.message : 'Une erreur inattendue est survenue.');
      if (e.code === 'network') { await net.probe(); if (offline()) render(); }
    } finally {
      busy = false;
      if (layer.submitBtn.isConnected) { layer.submitBtn.textContent = label; layer.submitBtn.removeAttribute('aria-busy'); }
    }
  }

  async function done(user, online) {
    if (onDone) return onDone(user, online);
    const { enterHome } = await import('./boot.js');
    enterHome(user, online);
  }

  const layer = {
    root, bg: null, mood: 'home', shade: .5, dim: .55,
    hints: () => [['ok', 'Sélectionner'], ...(first ? [] : [['back', 'Retour']])],
    back() { if (!first) import('../shell.js').then(s => s.back()); },
    showError(msg) { layer.banner.replaceChildren(h('span.icw', { html: icon('info') }), h('div', msg)); layer.banner.classList.remove('hidden'); },
    onAction(a) { if (a === 'ps' || a === 'search' || a === 'create') return true; },
  };
  render();
  return layer;
}
