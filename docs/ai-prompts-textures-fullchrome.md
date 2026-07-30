# Pack TEXTURES & ASSETS — Treeosk Full Chrome (Midjourney / Weave)

> Bibliothèque de **matière chrome** pour nourrir le site (la v2 : « le chrome est l'unique source de vie »).
> **Greyscale strict, zéro teinte** (cf. `docs/direction-artistique-v2-fullchrome.md`). Au plus tu en as, au mieux c'est.
> Range les rendus dans `assets/generated/textures/`. Vidéos loop → `web/public/media/textures/`.

## À coller dans CHAQUE prompt
**Suffixe DA :** `strictly greyscale, no colour, no warmth, neutral tone, pure neutral chrome (silver, museum quality), neutral 4500K lighting, deep neutral near-black #141418, canvas-grey highlights #FAFAFB, minimal, photoreal material, not AI-looking.`
**Négatif :** `--no warm tones, sepia, gold, amber, blue, teal, colour cast, rainbow reflection, oil-slick iridescence, AI-generated look, CGI plastic, 3D render, oversaturated, HDR halos, text, watermark, logo, warped geometry`
**Params :** `--style raw --v 7 --stylize 50 --chaos 6` · fonds `--ar 16:9` / bandeaux `--ar 21:9` / **tuiles seamless `--ar 1:1 --tile`** / mobile `--ar 9:16`.

---

## A · Matières chrome (fonds & fills)
1. **Liquide/mercure** — `Abstract liquid chrome surface, molten mercury flowing in smooth organic ripples, mirror-polished, soft neutral reflections` `--ar 16:9`
2. **Brushed fin** — `Fine brushed neutral chrome texture, tight parallel directional grain, raking neutral light revealing the metal grain, flat even surface` `--ar 1:1 --tile`
3. **Miroir poli** — `Pure mirror-polished chrome surface with soft blurred neutral reflections and gentle gradients, seamless, calm` `--ar 16:9`
4. **Ondulé/wave** — `Rippled chrome sheet, slow smooth waves catching neutral light, mirror finish, sculptural` `--ar 21:9`
5. **Chrome fondu (pool)** — `A still pool of molten chrome, glass-smooth mirror surface with faint concentric ripples, neutral greyscale` `--ar 1:1`
6. **Foil froissé** — `Crumpled chrome foil, sharp faceted folds and creases, editorial metallic texture, high micro-contrast, neutral` `--ar 16:9`
7. **Cannelé/fluted** — `Fluted vertical chrome, parallel rounded ridges of brushed metal, soft neutral highlights running down each groove` `--ar 1:1 --tile`
8. **Martelé** — `Hammered chrome surface, subtle dappled dimples catching neutral light, artisanal metal, muted reflections` `--ar 1:1 --tile`
9. **Maille/woven** — `Woven metal chrome mesh, fine interlaced steel threads, macro, neutral, precise` `--ar 1:1 --tile`

## B · Fonds de section (subtils)
10. **Section claire** — `Almost-white neutral canvas #FAFAFB with a barely-there brushed chrome sheen, extremely subtle, minimal, silent` `--ar 21:9`
11. **Section alternée** — `Soft neutral grey field #E5E6E6 with a faint chrome gradient sweep, quiet, museum wall` `--ar 21:9`
12. **Section nuit** — `Deep neutral near-black #141418 with a faint mirror-chrome sheen emerging from a single soft light, vast void, gallery` `--ar 21:9`
13. **Dégradé hero** — `Smooth neutral gradient from canvas grey #FAFAFB to near-black #141418, ultra-clean, no banding` `--ar 16:9`

## C · Immersif / section nuit (grands abstracts)
14. **Formes liquid-metal** — `Large sculptural liquid-metal chrome forms floating in a near-black void, smooth flowing masses, single soft neutral light, Kubrick 2001` `--ar 16:9`
15. **Ruban chrome** — `A single flowing chrome ribbon twisting slowly through near-black space, mirror surface, weightless, Denis Villeneuve Arrival` `--ar 21:9`
16. **Monolithe** — `A monolithic brushed-chrome slab standing in a dark neutral void, one soft edge light, silent, museum, 2001 monolith` `--ar 16:9`
17. **Sphères chrome** — `A cluster of mirror-chrome spheres of varied sizes on a neutral floor, reflecting each other, Bang & Olufsen, calm` `--ar 16:9`
18. **Drapé métallique** — `Chrome metallic drapery, heavy fabric folds rendered in mirror metal, slow waves, neutral, editorial` `--ar 16:9`

## D · Détails & accents (motifs)
19. **Glint/streak** — `A single sharp specular light streak travelling along a polished chrome edge against near-black, minimal, for a divider` `--ar 21:9`
20. **Sphère isolée** — `A single perfect mirror-chrome sphere isolated on deep neutral near-black, soft studio reflection, product motif` `--ar 1:1`
21. **Grain film** — `Fine black-and-white film grain overlay, Kodak Tri-X 400 texture, subtle, even, neutral, no colour` `--ar 16:9`
22. **Tige/hairline** — `A thin polished chrome rod / hairline against neutral background, precise, minimal, macro` `--ar 21:9`
23. **Goutte/bead** — `A single chrome droplet bead on brushed metal, macro, mirror reflection, neutral, high detail` `--ar 1:1`

## E · Fonds animés loop (à générer/animer dans Weave)
24. **Liquide lent** — start = A1 · `Molten chrome flows and ripples very slowly, seamless loop, mirror reflections drifting, locked frame, neutral, no morphing`
25. **Reflets qui dérivent** — start = A2/A3 · `Soft neutral reflections drift slowly across the brushed chrome, seamless loop, minimal motion, no warping`
26. **Monolithe rotation** — start = C16 · `The chrome monolith rotates imperceptibly, a soft light sweeps its edge, seamless loop, locked, no morphing`
27. **Brume sur chrome** — start = C14 · `Fine neutral-grey mist drifts slowly over the liquid-metal forms, seamless loop, natural, no warping`

## F · Variantes mobile (9:16)
28. **Chrome vertical** — `Vertical liquid chrome texture, smooth flowing ripples, mirror, neutral` `--ar 9:16`
29. **Nuit verticale** — `Deep neutral near-black #141418 with a vertical chrome sheen, void, gallery` `--ar 9:16`

---

## Carte d'usage (où ça sert sur le site)
| Asset | Où |
|---|---|
| A1–A5, B13, C14–15 | **Fond hero** (fenêtre immersive / pleine largeur) |
| B10–B12 | **Fonds de section** (canvas / alternée / **nuit**) |
| A2, A7–A9 | **Fills produits** (fond derrière les cartes), footer |
| C14–C18 | **Section immersive / nuit** (le moment radical, 1 par landing) |
| D19, D22 | **Dividers / filets** animés entre sections |
| D21 (grain) | **Overlay** léger sur toute la page (texture argentique) |
| E24–E27 | **Vidéos de fond** (hero/section, boucle lente) |
| F28–F29 | **Mobile** |

## Conseils
- **Seamless** : pour les fills répétables, ajoute `--tile` (Midjourney génère un motif raccordable).
- **Quantité** : lance chaque prompt en plusieurs rerolls (`--chaos 6-10`) et garde 2-3 variantes → une vraie librairie.
- **Cohérence** : si un rendu a une teinte (bleuté/chaud), rejette-le — greyscale strict only.
- **Poids web** : je compresse/optimise (WebP, dimensions) quand tu as sélectionné tes préférés.

## Après génération
Range dans `assets/generated/textures/`, dis-moi lesquels tu gardes → je les optimise et les **câble** (fond hero, fonds de section, overlay grain, dividers, vidéos loop).
