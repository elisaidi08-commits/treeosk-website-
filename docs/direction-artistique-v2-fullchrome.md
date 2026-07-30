# TREEOSK — Direction Artistique v2.0 · Full Chrome (VERROUILLÉE)

> **Remplace intégralement la v1.0 « Chrome × Cinéma warm ».** Slanted Media SRL · juillet 2026.
> Territoire : **chrome pur · silence muséal · discipline typographique**. Aucune teinte, aucune chaleur, aucun accent coloré.

## Palette — 9 stops greyscale (un seul axe : luminance)
| Token | Hex | Rôle |
|---|---|---|
| `canvas` | `#FAFAFB` | Fond global (blanc très légèrement grisé, jamais `#FFFFFF`) |
| `section` | `#E5E6E6` | Bloc alterné (rythme scroll) |
| `hairline` | `#C9CCCF` | Filets 0.5px, borders |
| `chrome` | `#B9B8B8` | Textures chrome, surfaces 3D |
| `steel` | `#9C9C9E` | Chrome médium, décoratif |
| `muted` | `#7D7C7E` | Texte secondaire, eyebrow, meta |
| `body` | `#555455` | Paragraphes |
| `title` | `#2C2C2E` | Titres alternatifs (hiérarchie fine) |
| `ink` | `#141418` | Titres display, CTA, fond nuit (noir **neutre**, légèrement froid) |

WCAG : body/canvas 7.94 AAA · ink/canvas 14.87 AAA · muted/canvas 4.79 AA.

## 5 principes (ne jamais casser)
1. **Aucune teinte, jamais** — warmth strictement -3 à +3. Pas de sépia/or/bleu écran/warm shadow.
2. **La typographie porte l'expression** — contraste de taille radical (12px → 120px), 2 poids max (400/500), sentence case.
3. **Le vide est le sujet** — marges ≥ 12% desktop, un titre + un paragraphe par écran plié.
4. **La matière chrome = unique source de « vie »** — textures chrome (liquide/brushed/poli) à ≥ 4 moments (hero, produits, immersif, footer).
5. **Le noir est absolu `#141418`** — neutre, jamais chaud.

## Typo
**Neue Haas Grotesk** (Display 500 / Text 400) · fallback libre **Inter**. Mono : **JetBrains Mono**. Sentence case, 2 poids, letter-spacing displays `-0.02em`, line-height titres 1.05 / body 1.6. **Aucun italic.**

## Photo
Product-hero **museum catalog** : objet 55%, fond neutre 40%. Lumière **4500K neutre** (softbox 90×120 upper-right, fill 4:1, rim neutre, fond dégradé canvas→ink). **Interdits** : 2900K tungsten, warm rim, sépia, halation. Film : **Kodak Tri-X 400 b&w** / digital medium format neutre / Fuji Neopan 400. Réfs : **Bang & Olufsen · Rimowa · Nicholas Alan Cope · Levon Biss** (macro) · **Kubrick 2001 · Villeneuve Arrival** (hero/custom). **PAS** Deakins/Van Hoytema warm/Delbonnel.

## Grammaire web
Grille 8pt, 12 col, **marges 12% min**, gutters 32px. Hairline unique `0.5px #C9CCCF`. Radius **cartes 4px · boutons 2px · images 8px** (jamais > 8px). 3 types de sections : canvas / alternée `#E5E6E6` / **nuit `#141418` (un seul par landing)**. Icônes 1px outline (Phosphor/Tabler), jamais filled. CTA principal `ink`/`canvas` radius 2px ; CTA secondaire = **lien souligné** (fini l'outline sépia).

## Do / Don't (résumé)
**DO** : neutres stricts · contraste de taille radical · vide 12%+ · chrome = vie · noir neutre · 2 poids · sentence case · 1 moment nuit · icônes 1px · radius ≤ 8.
**DON'T** : ✗ toute chaleur (sépia/or/warm) · ✗ bleu écran · ✗ italic · ✗ photographes/film warm · ✗ halation · ✗ radius > 8 · ✗ icônes filled · ✗ marges < 12% · ✗ > 1 moment nuit.

> Doc complet (manifeste, territoire, références étendues) : conservé dans le handoff employeur. Ce fichier = ancre projet.
