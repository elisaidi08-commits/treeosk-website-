# Treeosk — Design Tokens (référence complète)

> **Direction : Chrome × Cinéma (CHAUDE — VERROUILLÉE 2026-07-02)** — chrome tiède champagne + chaleur
> cinéma tungstène, base **claire**. Ratio d'usage **Chrome 65 / chaleur cinéma 25 / bleu écran 5 / encre 5**.
> **Source de vérité canonique** : les tokens live `web/src/app/globals.css` (bloc `@theme`) — ce doc les mirroir.
> ⚠️ L'ancienne palette **« Graphite Chrome » froide** (bleu-gris `#0B0B0C`/`#5B616B`/`#BFC4CB`…) et la V0.5
> **blanc/vert/bleu** sont **retirées**. Typo **inchangée** (Base One + Inter).

## 0. Les 5 règles d'or (ne jamais casser)
1. Le **chrome est toujours tiède** (champagne), **jamais froid** (pas de bleu-gris acier).
2. Le **sépia vient d'une lumière tungstène**, jamais un aplat de couleur.
3. Le **bleu écran est un régulateur** : uniquement sur des scènes à écran (hero, gaming, kiosk), **≤ 5%**, jamais ailleurs.
4. **Un seul accent chaud visible** par écran plié.
5. **Pas de bloc plein coloré** — la couleur vient de la lumière et des visuels, pas d'aplats marketing.

## 1. Couleurs — Chrome × Cinéma (chaud)

Base **claire** tiède (`#FCFCFA`). Grands visuels immersifs = **fenêtres sombres** (encre `#110E06`). Chrome métallique
tiède = signature premium, en gradient, **jamais en aplat plein de section**. Contrastes WCAG validés (voir §1.4).

### 1.1 Neutres (échelle chaude encre → canvas)
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#110E06` | Encre profonde — titres, CTA, cavités, fenêtres immersives |
| `graphite-900` | `#1A150D` | Surface sombre alternative |
| `graphite-700` | `#33291C` | Cartes / visuels sombres, hairline sur sombre |
| `tobacco` | `#37200D` | Noir cinéma — voile sur visuels, blocs immersifs alternatifs |
| `graphite-500` / `fg-subtle` | `#635751` | Chrome ombre — metadata / texte muted |
| `steel-400` | `#928A84` | Chrome médium — surfaces UI |
| `chrome-300` / `hairline` | `#BAB5B1` | Chrome pâle — hairlines / bordures (sur clair) |
| `chrome-200` / `section` | `#D9DCDC` | Section alternée — rythme du scroll |
| `chrome-100` | `#ECE9E5` | Fonds doux, hover clair |
| `canvas` | `#FCFCFA` | **Fond global clair** (crème très subtile, tiède) |
| `surface` | `#FFFFFF` | Surfaces, cartes claires, header |

### 1.2 Accents cinéma (chauds)
| Token | Hex | Usage |
|---|---|---|
| `sepia` | `#563C22` | Sépia tungstène — eyebrow, texte accent (7.34 AAA sur canvas) |
| `tobacco` | `#37200D` | Noir cinéma chaud — voiles, cavités |
| `screen` | `#8EA3C6` | **Bleu écran** — RARE (≤ 5%, écrans uniquement : hero/gaming/kiosk) |

### 1.3 Chrome métallique (gradients — tiède champagne, jamais froid)
| Token | Valeur | Usage |
|---|---|---|
| `bg-chrome` | `linear-gradient(145deg,#efe9e1,#cabfb2,#9c9187,#e6ded3)` | CTA premium, logo, détails, filets hero |
| `bg-graphite-metal` | `linear-gradient(145deg,#3a3126,#17130b)` | Surfaces sombres à reflet, boutons dark premium |
| `text-chrome` | idem `bg-chrome` + `background-clip:text` | Titres/mots à reflet chrome |

### 1.4 Rôles sémantiques thémables (swap en `.dark`)
| Token | Light | Dark | Usage |
|---|---|---|---|
| `fg` | `#110E06` | `#FCFCFA` | Titres / texte fort (15.61 AAA light) |
| `fg-muted` | `#3D3A35` | `#BAB5B1` | Body chaud — paragraphes (10.66 AAA sur canvas) |
| `fg-subtle` | `#635751` | `#928A84` | Metadata / muted |
| `canvas` | `#FCFCFA` | `#110E06` | Fond global |
| `surface` | `#FFFFFF` | `#1A150D` | Cards / surfaces |
| `section` | `#D9DCDC` | `#191308` | Bande alternée |
| `immersive` | `#110E06` | `#000000` | Fenêtres immersives (sombres dans les 2 thèmes) |
| `hairline` | `#BAB5B1` | `#33291C` | Filets |
| `on-dark` | `#FCFCFA` | `#FCFCFA` | Texte sur fenêtre sombre |
| `inverse` / `inverse-fg` | `#110E06` / `#FCFCFA` | `#FCFCFA` / `#110E06` | Blocs inversés |

> En dark, on ne swappe **que les rôles sémantiques**. La palette chrome/steel/tobacco et les fenêtres immersives restent fixes.

### 1.5 États (sobres — 1 seul signal couleur)
| Token | Hex | Usage |
|---|---|---|
| `state/error` | `#B23B3B` | Erreurs de formulaire uniquement |
| `state/success` | `#110E06` + icône | Validé (pas de vert) |
| `state/info` | `#635751` + icône | Information neutre |

## 2. Typographie — Base One + Inter (verrouillé, inchangé)

- **Titres → `Base One`** (Domenico Catapano · SIL OFL, commercial OK). Regular 400 · Bold 700 · Heavy 900.
  - Hero / Display → **Heavy 900** · H1–H2 → **Bold 700**.
- **Body / UI → `Inter`** (400/500/600).
- Fichiers fonts : self-hosted `web/src/fonts/` (Base One) + `web/src/app/fonts.ts` (Inter).
- ⚠️ Base One = **display** → titres uniquement. Tout le texte courant en Inter.

### Échelle (Desktop · taille / mobile / line-height / tracking)
| Style | Famille | Desktop | Mobile | LH | Tracking |
|---|---|---|---|---|---|
| Display XL | Base One | 80 | 44 | 1.02 | -2% |
| Display | Base One | 64 | 40 | 1.05 | -1.5% |
| H1 | Base One | 48 | 32 | 1.10 | -1% |
| H2 | Base One | 36 | 26 | 1.15 | -0.5% |
| H3 | Inter | 26 | 22 | 1.25 | 0 |
| H4 | Inter | 20 | 18 | 1.30 | 0 |
| Overline | Inter Med | 12 | 12 | 1.2 | +10% MAJ |
| Body L | Inter | 18 | 17 | 1.55 | 0 |
| Body M | Inter | 16 | 16 | 1.60 | 0 |
| Body S | Inter | 14 | 14 | 1.50 | 0 |
| Caption | Inter | 12 | 12 | 1.40 | 0 |

## 3. Espacement (base 4)
`2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120 · 160`
- **Padding section (Y)** : 112 desktop / 56 mobile
- **Container max** : 1248 · gutter 96 desktop / 20 mobile
- **Grille** : 12 colonnes, gap 24

## 4. Rayons (radius)
Sharp = luxe. `xs 4 · sm 8 · md 12 (cartes) · lg 20 · pill 999 (CTA)`

## 5. Ombres (subtiles — luxe = on s'appuie sur les hairlines chrome)
| Token | Valeur |
|---|---|
| `sh/1` | `0 1px 2px rgba(11,11,12,.06)` |
| `sh/2` | `0 8px 24px rgba(11,11,12,.08)` |
| `sh/3` | `0 20px 48px rgba(11,11,12,.12)` |

## 6. Boutons — chaud (encre / chrome / sépia en accent)
| Variante | Fond | Texte | Bordure | Hover |
|---|---|---|---|---|
| **Primary** | `#110E06` (ink) | `#FCFCFA` | — | `#33291C` (graphite-700) |
| **Chrome (premium)** | gradient `bg-chrome` | `#110E06` | 1px `#BAB5B1` | assombrir ~6% |
| **Secondary** | `#FFFFFF` | `#110E06` | 1px `#BAB5B1` | fond `#ECE9E5` |
| **On-dark** | transparent | `#FCFCFA` | 1px `#BAB5B1` | fond `rgba(252,252,250,.08)` |
| **Ghost / Link** | transparent | `#110E06` | underline 1px | texte `#635751` |
| **Disabled** | `#ECE9E5` | `#928A84` | — | — |

Hauteur 54 desktop / 44 mobile · padding-x 28 · label Body M Medium · radius pill.
**CTA chrome = 1 par vue max** (moments premium). Sépia réservé aux eyebrows/accents texte, **jamais un fond de bouton**.

## 7. Breakpoints
`375 · 768 · 1024 · 1440` — maquetter **390 (mobile) + 1440 (desktop)** en priorité.

## CSS variables de départ (mirroir de `web/src/app/globals.css`)
```css
:root {
  /* neutres chauds encre → canvas */
  --color-ink:#110e06; --color-graphite-900:#1a150d; --color-graphite-700:#33291c;
  --color-tobacco:#37200d; --color-graphite-500:#635751; --color-steel-400:#928a84;
  --color-chrome-300:#bab5b1; --color-chrome-200:#d9dcdc; --color-chrome-100:#ece9e5;
  --color-canvas:#fcfcfa; --color-surface:#ffffff; --color-section:#d9dcdc;
  --color-immersive:#110e06; --color-on-dark:#fcfcfa;
  /* accents cinéma */
  --color-sepia:#563c22; --color-screen:#8ea3c6;
  /* rôles thémables */
  --color-fg:#110e06; --color-fg-muted:#3d3a35; --color-fg-subtle:#635751;
  --color-hairline:#bab5b1; --color-error:#b23b3b;
  /* chrome métallique tiède */
  --chrome-silver:linear-gradient(145deg,#efe9e1,#cabfb2,#9c9187,#e6ded3);
  --graphite-metal:linear-gradient(145deg,#3a3126,#17130b);
  /* radius / ombres */
  --radius-sm:8px; --radius-md:12px; --radius-lg:20px; --radius-pill:999px;
  --sh-1:0 1px 2px rgba(11,11,12,.06); --sh-2:0 8px 24px rgba(11,11,12,.08); --sh-3:0 20px 48px rgba(11,11,12,.12);
}
.dark {
  --color-canvas:#110e06; --color-surface:#1a150d; --color-section:#191308; --color-immersive:#000000;
  --color-fg:#fcfcfa; --color-fg-muted:#bab5b1; --color-fg-subtle:#928a84; --color-hairline:#33291c;
}
```
