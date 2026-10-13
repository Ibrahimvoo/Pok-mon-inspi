// =====================================================================
// VERSION 20.0 — en dernier : les nouveautés 20.0 en tête de l'écran des nouveautés, sauvegarde marquée 20.
// =====================================================================
NEWS.unshift([()=>ICO.bGiv,'Les Terres de Givre','Après la première aube, il neige sur Lunévie ! Le Col du Givre, Frimas et son Arène Givre, le Lac Gelé et le Cœur du Glacier : Neva, les Figés de Boréa et Hivernel, le gardien des saisons.'],
 [()=>ICO.glacon,'Le type GLACE','Un neuvième type, fort contre PLANTE et ÉLEC, faible face au FEU et à la ROCHE. Quinze nouvelles créatures, neuf capacités, la Givre Capsule et la Pierre Givre.'],
 [()=>ICO.givrecapsule,'Glace et congères','Sur la glace, on glisse jusqu\'au premier obstacle : trois énigmes à résoudre. Une créature FEU fait fondre les congères. Et un jour sur trois, l\'hiver revient sur Lunévie.']);
{const norm20=normalize;normalize=function(g){g=norm20(g);if(g&&(g.v||0)<20){g.wn=1;g.v=20}return g}}
