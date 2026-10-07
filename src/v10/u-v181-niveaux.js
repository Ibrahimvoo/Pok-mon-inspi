// =====================================================================
// 18.1 — SYSTÈME DE NIVEAUX : un plafond suit l'histoire (badges, chapitres). Aucune créature sauvage, aucun dresseur
// ordinaire, aucun mini-boss ne dépasse ce plafond, ni n'a plus de 6 à 8 niveaux d'avance sur ta meilleure créature.
// Les Champions et les grands combats de l'histoire gardent leurs niveaux (ils sont équilibrés). Une équipe en retard
// sur le niveau conseillé gagne plus d'EXP pour rattraper vite. Niveau des lieux affiché à l'entrée de chaque zone.
// =====================================================================
// [niveau conseillé, plafond] selon l'avancée de l'histoire
function lvBand(){const g=f();if(!g)return[5,100];if(g.balance)return[45,100];
 return!g.starter?[5,6]:!g.badge?[12,15]:!g.mine||!g.rival2?[14,16]:!g.boss?[16,18]:!g.portScene?[18,22]:!g.badge2?[26,25]:!g.kael3?[26,26]:!g.volArr?[26,27]
  :!g.baseDone?[28,30]:!g.badge4?[30,32]:!g.obsScene&&!g.v18arr?[31,34]:!g.obsScene&&!g.badge5?[34,36]:!g.obsScene&&!g.v18done?[35,37]:[35,38]}
const lvRec=()=>lvBand()[0],lvCap=()=>lvBand()[1];
const lvTop=()=>Math.max(1,...(G?.party||[]).map(m=>m.lv));
// Niveau autorisé pour un adversaire : jamais au-dessus du plafond, ni trop loin devant ta meilleure créature.
const lvClamp=(lv,extra,gap)=>Math.max(2,Math.min(lv,lvCap()+extra,lvTop()+gap));
function lvSet(m,lv){if(!m||lv>=m.lv)return;const full=m.hp>=st(m).hp;m.lv=lv;m.exp=xpFor(lv);if(full||m.hp>st(m).hp)m.hp=st(m).hp}
const lvWildCap=(lv)=>{const c=lvClamp(lv,0,6);return lv>c?Math.max(2,c-rnd(0,2)):lv};
{const bt181=battle;battle=async function(foes,o={}){
 if(G&&Array.isArray(foes)&&G.map!=='songe'&&!o.noCap){
  const boss=o.tr&&(o.tr.boss||o.tr.vs);
  if(!o.tr)for(const m of foes){if(!m)continue;lvSet(m,o.legend||o.roam?lvClamp(m.lv,4,8):lvWildCap(m.lv))}
  else if(!boss)for(const m of foes)if(m)lvSet(m,lvClamp(m.lv,2,8))}
 return bt181(foes,o)}}
// Rattrapage : une créature sous le niveau conseillé gagne jusqu'à 2,5 fois plus d'EXP (mode normal).
const lvBoost=m=>{const d=lvRec()-m.lv;return f()?.expert||d<=0?1:1+Math.min(1.5,d*.15)};
{const gx181=gainXp;gainXp=function(m,n,q){if(m&&n>0){const k=lvBoost(m);if(k>1)n=Math.ceil(n*k)}return gx181(m,n,q)}}
// Niveaux d'une zone (ce que l'on peut vraiment y rencontrer maintenant)
const lvNowE=c=>!c||(c==='j'?!night():c==='n'?night():c==='r'?rain():c==='e'?ecl():true);
function lvZone(k){const M=MAPS[k],E=(M?.enc||[]).filter(e=>lvNowE(e[4]));if(!E.length||isInt(M))return null;const lo=Math.min(...E.map(e=>e[1])),hi=Math.max(...E.map(e=>e[2]));
 const a=Math.min(lo,lvClamp(lo,0,6)),b=Math.max(a,lvClamp(hi,0,6));return[a,b]}
// Pastille de niveau sous le nom du lieu : verte (facile), jaune (à ta hauteur), rouge (prudence)
{const dw181b=drawWorld;drawWorld=function(t){dw181b(t);if(!ui.banner||!G)return;const z=lvZone(G.map);if(!z)return;const k=now()-ui.banner.t0;if(k>2800)return;
 const y=Math.min(8,-48+k/3,8+(2400-k)/3)+48,top=lvTop(),c=top>=z[1]+3?'#3aa84a':top>=z[0]?'#d8a020':'#d84040',s=`NV ${z[0]}-${z[1]}`,w=tw(s,2,1)+16;
 if(y<-14)return;rr(14,y,w,16,2,C.ink);rr(16,y+2,w-4,12,2,c);txt(s,22,y+11,'#ffffff',{mini:1})}}
// Conseil dans le bandeau de la flèche-guide quand l'équipe est en retard
{const gr181=gdRoute;gdRoute=function(){const r=gr181();if(r&&!r.hint&&lvTop()<lvRec()-2)r.hint=`Conseil : entraîne ton équipe (niveau conseillé ${lvRec()})`;return r}}
