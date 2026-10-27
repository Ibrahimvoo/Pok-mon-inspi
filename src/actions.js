// Simulated console operations: purchases, downloads, installs, trophies. No real payment ever happens.
import { state, save, owns, installed, downloading, finalPrice, builtIn } from './state.js';
import { byId, PLANS } from './data.js';
import { toast, dialog, confirmDialog, go } from './shell.js';
import { h, art, price, size, icon, img } from './ui.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { launch } from './screens/game.js';
import { productScreen } from './screens/store.js';
import { hubScreen } from './screens/hub.js';

export const openProduct = id => go(productScreen, { id });
export const openHub = id => go(hubScreen, { id });

export function startDownload(id) {
  const g = byId[id];
  if (installed(id) || downloading(id)) return;
  if (g.preorder) { toast({ title: 'Précommande', sub: `${g.title} sera disponible le ${new Date(g.release).toLocaleDateString('fr-FR')}`, img: art.thumb(id), sound: 'error', log: false }); return; }
  state.downloads.push({ id, p: 0, speed: 0 });
  save('downloads');
  toast({ title: 'Téléchargement démarré', sub: `${g.title} · ${size(g.size)}`, img: art.thumb(id) });
}
// Simulated network: ~110 MB/s with jitter, accelerated so a game completes in well under a minute.
export function tickDownloads(dt) {
  if (!state.downloads.length) return;
  const d = state.downloads[0];
  const g = byId[d.id];
  d.speed = 95 + Math.random() * 40;
  d.p = Math.min(1, d.p + dt * (1 / Math.max(14, g.size * .3)));
  if (d.p >= 1) {
    state.downloads.shift();
    if (!state.installed.includes(d.id)) state.installed.push(d.id);
    save('installed');
    toast({ title: 'Prêt à jouer', sub: g.title, img: art.thumb(d.id) });
    input.rumble(.3, .2, 90);
  } else save('downloads');
}
export function cancelDownload(id) {
  state.downloads = state.downloads.filter(d => d.id !== id);
  save('downloads');
  toast({ title: 'Téléchargement annulé', sub: byId[id].title, img: art.thumb(id), sound: 'back', log: false });
}

export function uninstall(id) {
  const g = byId[id];
  if (builtIn(id)) { toast({ title: 'Jeu intégré à la console', sub: `${g.title} ne peut pas être supprimé`, img: art.thumb(id), sound: 'error', log: false }); return; }
  confirmDialog('Supprimer le jeu ?', `${g.title} sera supprimé du stockage de la console (${size(g.size)} libérés). Vos sauvegardes sont conservées.`, 'Supprimer', () => {
    state.installed = state.installed.filter(x => x !== id);
    save('installed');
    toast({ title: 'Contenu supprimé', sub: `${g.title} · ${size(g.size)} libérés`, img: art.thumb(id), sound: 'back' });
  }, { danger: true });
}

export function play(id) {
  const g = byId[id];
  const limit = state.settings.ageLimit;
  if (limit && g.pegi > limit) {
    dialog({ title: 'Contrôle parental', body: `${g.title} (PEGI ${g.pegi}) dépasse la limite d’âge définie (PEGI ${limit}). Modifiez-la dans Paramètres › Famille et contrôle parental.`, actions: [{ label: 'OK', primary: true }] });
    return;
  }
  if (installed(id)) return launch(id);
  if (downloading(id)) { toast({ title: 'Téléchargement en cours', sub: `${g.title} · ${Math.round(downloading(id).p * 100)} %`, img: art.thumb(id), sound: 'error', log: false }); return; }
  if (owns(id)) return startDownload(id);
  openProduct(id);
}

export function toggleWish(id) {
  const on = state.wishlist.includes(id);
  state.wishlist = on ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id];
  save('wishlist');
  toast({ title: on ? 'Retiré de la liste de souhaits' : 'Ajouté à la liste de souhaits', sub: byId[id].title, icon: 'heart', sound: 'toggle', log: false });
}
export function addToCart(id) {
  if (state.cart.includes(id)) { toast({ title: 'Déjà dans le panier', sub: byId[id].title, icon: 'cart', sound: 'error', log: false }); return; }
  state.cart.push(id);
  save('cart');
  toast({ title: 'Ajouté au panier', sub: byId[id].title, img: art.thumb(id), sound: 'ok', log: false });
}

export function unlockTrophy(id, idx) {
  const list = state.trophies[id] ||= [];
  if (list.includes(idx)) return;
  list.push(idx);
  save('trophies');
  const t = byId[id].trophies[idx];
  toast({ title: `Trophée débloqué : ${t.n}`, sub: t.d, trophy: t.t, sound: 'trophy' });
  input.rumble(.5, .5, 160);
}

// ---------------------------------------------------------------- checkout
function lineItem(id) {
  const g = byId[id], p = finalPrice(g);
  return h('div.checkout-item', img(art.thumb(id)), h('div', h('div.ci-t', g.title), h('div', g.preorder ? 'Précommande · Édition Standard' : 'Édition Standard · Jeu PS5')),
    h('div.ci-p', g.discount ? h('s', price(g.price)) : null, price(p)));
}
export function checkout(ids, { fromCart = false } = {}) {
  ids = ids.filter(id => !owns(id));
  if (!ids.length) return;
  const total = +ids.reduce((s, id) => s + finalPrice(byId[id]), 0).toFixed(2);
  const summary = () => h('div',
    ids.map(lineItem),
    h('div.sum-line', h('span', 'Sous-total'), h('span', price(total))),
    h('div.sum-line', h('span', 'Moyen de paiement'), h('span', `Porte-monnaie · ${price(state.wallet)}`)),
    h('div.sum-line.total', h('span', 'Total'), h('span', price(total))),
    h('div.sim-note', h('span.icw', { html: icon('info') }), 'Achat simulé : aucun paiement réel n’est effectué.'));
  const d = dialog({ title: 'Confirmer l’achat', wide: true, body: summary(), actions: [] });
  const confirm = () => {
    d.body.replaceChildren(h('div', { style: { textAlign: 'center', padding: '4rem 0' } }, h('div.spinner'), h('div', 'Traitement de votre commande…')));
    d.setActions([]);
    d.dismissLock = true; // the order cannot be cancelled while it is being processed
    setTimeout(() => {
      if (state.wallet + 1e-9 < total) {
        audio.play('error');
        d.box.querySelector('h2').textContent = 'Fonds insuffisants';
        d.body.replaceChildren(h('div', `Le solde de votre porte-monnaie (${price(state.wallet)}) ne couvre pas ce montant (${price(total)}).`), h('div.sim-note', h('span.icw', { html: icon('wallet') }), 'Vous pouvez ajouter des fonds fictifs pour continuer.'));
        d.setActions([
          { label: 'Ajouter 100 € (simulé)', primary: true, close: false, sound: 'purchase', onok: () => { state.wallet = +(state.wallet + 100).toFixed(2); save('wallet'); d.box.querySelector('h2').textContent = 'Confirmer l’achat'; d.body.replaceChildren(summary()); d.setActions(buyActions); } },
          { label: 'Annuler', sound: 'back' },
        ]);
        return;
      }
      state.wallet = +(state.wallet - total).toFixed(2);
      ids.forEach(id => { if (!state.owned.includes(id)) state.owned.push(id); });
      state.cart = state.cart.filter(id => !ids.includes(id));
      state.wishlist = state.wishlist.filter(id => !ids.includes(id));
      save('owned');
      audio.play('purchase');
      input.rumble(.4, .3, 120);
      d.box.querySelector('h2').textContent = '';
      const pre = ids.every(id => byId[id].preorder);
      d.body.replaceChildren(h('div', { style: { textAlign: 'center', padding: '2rem 0 0' } },
        h('div.success-ic', { html: icon('check') }),
        h('div', { style: { fontSize: '3.2rem', color: '#fff', marginBottom: '1.4rem' } }, pre ? 'Précommande confirmée' : 'Merci pour votre achat !'),
        h('div', pre ? 'Le jeu sera téléchargeable dès sa sortie.' : 'Le contenu a été ajouté à votre bibliothèque.'),
        h('div.sim-note', { style: { justifyContent: 'center' } }, `Nouveau solde : ${price(state.wallet)}`)));
      const dl = ids.filter(id => !byId[id].preorder);
      d.setActions([
        ...(dl.length ? [{ label: dl.length > 1 ? 'Tout télécharger' : 'Télécharger', icon: 'download', primary: true, onok: () => dl.forEach(startDownload) }] : []),
        { label: 'Fermer', primary: !dl.length, sound: 'back' },
      ]);
    }, 1500);
  };
  const buyActions = [{ label: 'Confirmer l’achat', primary: true, close: false, onok: confirm }, { label: 'Annuler', sound: 'back' }];
  d.setActions(buyActions);
  return d;
}

export function subscribe(planId) {
  const p = PLANS.find(x => x.id === planId);
  if (state.plan === planId) { toast({ title: 'Abonnement actif', sub: p.name, icon: 'sparkle', sound: 'error', log: false }); return; }
  const d = dialog({
    title: `S’abonner au ${p.name}`,
    body: h('div', h('div.sum-line', h('span', 'Formule'), h('span', `${p.name} · 1 mois`)), h('div.sum-line', h('span', 'Moyen de paiement'), h('span', `Porte-monnaie · ${price(state.wallet)}`)),
      h('div.sum-line.total', h('span', 'Total'), h('span', price(p.price))), h('div.sim-note', h('span.icw', { html: icon('info') }), 'Abonnement simulé, sans engagement ni paiement réel.')),
    actions: [{ label: 'Confirmer', primary: true, onok: () => {
      if (state.wallet < p.price) { toast({ title: 'Fonds insuffisants', sub: 'Ajoutez des fonds depuis les paramètres', icon: 'wallet', sound: 'error', log: false }); return; }
      state.wallet = +(state.wallet - p.price).toFixed(2); state.plan = planId; save('plan');
      audio.play('purchase');
      toast({ title: 'Bienvenue dans le ' + p.name, sub: 'Vos avantages sont actifs', icon: 'sparkle' });
    } }, { label: 'Annuler', sound: 'back' }],
  });
  return d;
}
