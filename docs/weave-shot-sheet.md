# Shot sheet — Figma Weave (motion depuis chaque asset)

> Pour piloter le motion dans **Figma Weave**. Chaque ligne = un clip.
> **Start frames** prêtes dans `assets/weave-frames/` (toutes **4:5**, 960×1200). Tu peux les upscaler à 1080×1350 dans Weave.
> Cible d'export → chemin `.mp4` de `docs/media-map.md`. Prompts détaillés → `docs/ai-videos-prompts.md`.

## Réglages communs (à répéter sur chaque clip)
- **Format** 4:5 · **durée** 8–10 s · **boucle seamless** · **mouvement faible** (Weave : *motion/strength* bas) · **caméra quasi statique**.
- **Easing** : ease-in-out doux, pas d'à-coups · pas de coupe.
- **Palette verrouillée** (chrome tiède + sépia + bleu écran rare) — ne pas la laisser dériver.
- **Anti-IA** : `no morphing, no warping, no melting, no new objects, stable photoreal`.
- **Type de mouvement** :
  - **G = génératif** (Weave invente le mouvement : fumée, écran, respiration) → repose sur le prompt.
  - **C = caméra** (push-in / pan léger) → je peux te fabriquer une **end-frame synthétique** (zoom/pan par recadrage) si tu veux du frame-to-frame propre. Dis-le-moi.

---

| # | Start frame | Type | Mouvement à prompter dans Weave | État de fin visé (last frame) |
|---|---|---|---|---|
| 1 · **Hero** | `weave-frames/01-hero-scent-diffuser.png` | **G** + C léger | La fumée monte/s'enroule en continu vers le haut-droite ; la star specular du rebord scintille ; reflets marbre qui glissent. Caméra locked (ou push-in 2%). | Fumée plus haute/étalée, reflets légèrement décalés — quasi identique au départ (boucle). |
| 2 · **Photobooth** | `weave-frames/02-photobooth.png` | **G** faible + C | Reflets dorés qui ondulent lentement sur la surface chromée froissée ; glow intérieur qui pulse doucement ; push-in 2%. | Reflets déplacés, glow au pic — structure identique. ⚠️ asset faible (re-gen conseillé). |
| 3 · **Engraving** | `weave-frames/03-engraving.png` | **G** | Un glint specular glisse le long du bras chrome ; highlight qui bouge dans le flacon ; l'écran « lèvres » palpite. Caméra locked. | Glint arrivé en bas du bras, highlight décalé — objet immobile. |
| 4 · **Gaming** | `weave-frames/04-gaming.png` | **G** | Les facettes **bleu-gris** de l'écran se refractent/glissent lentement (seul cool tone) ; rim doré qui respire. Locked + push-in très lent. | Motif facetté recomposé, rim au pic — cadre chrome identique. |
| 5 · **Scent (carte)** | `weave-frames/05-scent.png` | **G** + C léger | Le panache de fumée s'enroule et monte en continu ; le flare du rebord scintille ; reflets marbre qui bougent. Caméra locked. | Fumée plus déployée — cylindre identique (boucle). |
| 6 · **Kiosk & hostess** | `weave-frames/06-kiosk-hostess.png` | **G** (min.) | L'hôtesse **respire** et bouge très légèrement le regard/la tête ; shimmer d'écran froid qui passe ; reflets chauds sur le cadre. Locked. **Mouvement minime** (anti-uncanny). | Tête/regard à peine bougés, shimmer déplacé — visage stable, jamais déformé. |
| 7 · **Custom** ⭐ | `weave-frames/07-custom.png` | **G** + C | Le couple avance lentement dans l'installation de bulles chrome ; reflets dorés qui coulent sur les sphères ; push-in lent. | Couple un peu plus avancé, reflets recomposés — boucle propre. |

---

## Conseils Weave spécifiques
- **Boucle** : si Weave n'a pas de « loop » natif, génère 10 s puis en post fais un **crossfade début↔fin** (0.5 s) — ou demande-moi de te le faire au montage (ffmpeg dispo).
- **Prioriser le génératif « sûr »** : fumée (hero/scent) d'abord, puis écran (gaming), puis visage (kiosk) — le plus risqué.
- **Un seul mouvement dominant par clip** — n'empile pas fumée + caméra + écran, sinon Weave part en morphing.
- **Garde la seed / duplique** la meilleure prise pour itérer sans tout reperdre.

## ✅ Frame-to-frame (start + end) — GÉNÉRÉ
End-frames **push-in** créées dans `assets/weave-frames/` (`*-END.png`, 4:5) pour les 5 clips caméra.
Dans Weave : **first frame = la start** · **last frame = la `-END`** · le prompt décrit le mouvement *entre* les deux.

| # | First frame | Last frame | Prompt Weave (frame-to-frame) |
|---|---|---|---|
| 1 Hero | `01-hero-scent-diffuser.png` | `01-…-END.png` | Between the frames, the fragrance smoke rises and curls continuously above the chrome cylinder as a slow smooth push-in occurs; the specular star on the rim shimmers; warm marble reflections drift. Seamless loop, low motion. No morphing, no warping, photoreal. |
| 5 Scent | `05-scent.png` | `05-…-END.png` | The pale smoke unfurls and rises continuously beside the chrome cylinder as a slow push-in occurs; the rim flare shimmers. Seamless, natural smoke, low motion. No morphing, photoreal. |
| 4 Gaming | `04-gaming.png` | `04-…-END.png` | The faceted blue-grey screen pattern refracts and shifts slowly (only cool tone) and the golden rim breathes as a slow push-in toward the screen occurs. Seamless, low motion. No text, no neon, no morphing, photoreal. |
| 7 Custom | `07-custom.png` | `07-…-END.png` | The elegant couple walks slowly forward through the chrome-bubble installation as a slow push-in follows; warm reflections flow across the mirrored spheres. Seamless, low motion, coherent reflections. No morphing, photoreal. |
| 2 Photobooth | `02-photobooth.png` | `02-…-END.png` | Warm golden reflections ripple slowly across the metallic booth and a faint interior glow pulses as a gentle push-in occurs; structure stays solid. Seamless, low motion. No morphing, photoreal. |

**Sans end-frame (caméra fixe, start frame seule) :**
- **3 Engraving** (`03-engraving.png`) : `A specular glint travels along the chrome arm; a highlight moves inside the perfume bottle; the lips screen palpitates. Locked camera, seamless loop, low motion. No morphing, photoreal.`
- **6 Kiosk** (`06-kiosk-hostess.png`) : `The on-screen hostess breathes and shifts her gaze very slightly; a cool screen shimmer passes; warm reflections drift on the chrome frame. Locked camera, minimal motion, face stable. No morphing, no face distortion, photoreal.`

## ▶️ Étape par étape — par quel frame tu commences
1. **Commence par le HERO** → `01-hero-scent-diffuser.png`. Dans Weave : importe-la en **first frame**, `01-hero-scent-diffuser-END.png` en **last frame**. Durée **8 s**, colle le **prompt ligne 1**, *motion/strength* **bas**, génère. Vérifie la boucle (crossfade 0.5 s si besoin). Export → `hero.mp4`.
2. **`05-scent`** puis **`04-gaming`** — même méthode (first + END + prompt de la ligne).
3. **`07-custom`** puis **`02-photobooth`**.
4. **`03-engraving`** et **`06-kiosk`** = **start frame seule** (pas de END), prompt génératif. **Kiosk en dernier** (visage = le plus délicat).
5. Dépose chaque `.mp4` au chemin de `docs/media-map.md` → dis-moi **« vidéos prêtes »**, je câble + compresse.

> **Pourquoi le hero/scent d'abord :** la fumée est le mouvement le plus « pardonnant » (zéro risque uncanny) → tu valides ton réglage Weave sur un cas sûr avant les visages.

## Encore dispo (dis-moi)
- **Upscale** start+end (960×1200 → 1440×1800) pour une entrée Weave plus propre.
- **Boucle/crossfade + compression** des `.mp4` en sortie.
- **Câbler** les `.mp4` (hero + cartes) dès dépôt.
