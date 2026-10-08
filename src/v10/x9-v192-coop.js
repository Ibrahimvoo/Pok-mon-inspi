// =====================================================================
// Version 19.2 : l'aventure à plusieurs, vraiment ensemble
//  - dans une aventure, le combat d'un joueur appelle TOUTE l'équipe, sans question (ralliement dès qu'on est libre)
//  - si l'équipe gagne, personne n'a perdu : ta dernière créature se relève avec 1 PV, sur place
//  - moins de rencontres à plusieurs, puisque chaque combat réunit tout le monde
//  - toucher une créature pendant le combat d'un ami : on rejoint plutôt le combat de l'ami
//  - un joueur de l'aventure n'a pas la même version : on prévient (recharger la page)
// =====================================================================
const coN=()=>{if(!G||typeof advCode!=='function'||!advCode()||!NET.on)return 1;return Math.min(4,1+matePeers().filter(P=>isAdvMate(P)&&P.dv===NETDV()).length)};
const coK=()=>1/coN();
// Rencontres classiques : une chance sur N ; faune visible : moins nombreuse, charges et herbes frémissantes plus rares
{const er=encRoll;encRoll=function(M,tall){const r=er(M,tall);return r&&(coN()<2||Math.random()<coK())}}
{const fc=fauCharge;fauCharge=async function(){if(coN()>1&&Math.random()>coK())return false;return fc()}}
{const rn=ruNew;ruNew=function(k,p){return rn(k,p*coK())}}
{const fa=fauAdj;fauAdj=function(M,n){n=fa(M,n);const N=coN();return N>1?Math.max(2,Math.round(n/Math.sqrt(N))):n}}
// Un ami est déjà en combat : on le rejoint au lieu d'ouvrir un second combat
const coMateFight=()=>coN()>1&&!CB&&!CBG&&!CBJ?matePeers().find(P=>isAdvMate(P)&&P.cb&&P.dv===NETDV()&&P.cb.n<CBMAX&&!CBSKIP.has(P.cb.i)):null;
{const fm=faunaMeet;faunaMeet=async function(n){const P=coMateFight();if(P&&G.party.some(alive)){sfx('alert');NET.note(`${P.name} est déjà en combat : tu le rejoins !`);await cbJoin(P,P.cb.i);return}return fm.apply(this,arguments)}}
// L'équipe a gagné : on ne perd jamais tant que les amis tiennent bon
{const eb=endBattle;endBattle=async function(r){if(r!=='lose'&&B&&!B.pvp&&coN()>1&&G.party.length&&!G.party.some(alive)){const m=B.me&&G.party.includes(B.me)?B.me:G.party[0];m.hp=1;m.st=null;m.slp=0;
  await say(`Ton équipe a gagné ! Tant que tes amis tiennent bon, tu ne perds jamais : ${nm(m)} se relève avec 1 PV.`)}return eb.apply(this,arguments)}}
// Versions différentes dans la même aventure : impossible de combattre ensemble, on le dit une fois
{const COV=new Set();setInterval(()=>{if(!G||typeof advCode!=='function'||!advCode()||!NET.on||mode!=='world')return;
 for(const P of NET.peers.values())if(isAdvMate(P)&&P.dv&&P.dv!==NETDV()&&!COV.has(P.pid)){COV.add(P.pid);NET.note(`${P.name} n'a pas la même version du jeu : rechargez tous les deux la page pour combattre ensemble.`)}},3000)}
