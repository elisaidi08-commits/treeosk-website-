# Shot sheet Weave v2 — FULL CHROME (motion depuis les nouveaux assets)

> Remplace la shot sheet warm. Frames prêtes dans `assets/weave-frames-v2/` (start + `-END` push-in).
> **Greyscale strict, zéro teinte.** DA : `docs/direction-artistique-v2-fullchrome.md`.
> Cible d'export `.mp4` : hero → `web/public/media/hero/hero.mp4` · cartes → `web/public/media/experiences/<slug>.mp4`.

## Règles communes (chaque clip)
- **Greyscale strict, no colour, no warmth.** Mouvement **subtil et lent**, **boucle seamless 8–10s**, caméra quasi statique.
- Dans Weave : **first frame = la start**, **last frame = la `-END`** (push-in) · *motion/strength* **bas**.
- **Anti-IA motion** : `no morphing, no warping, no melting, no face distortion, stable photoreal, neutral greyscale`.
- Poster fallback reduced-motion = la start frame (je m'en occupe).

---

## Les clips (prompt frame-to-frame à coller dans Weave)

### 00 · HERO — monolithe + figure (`00-hero-monolith` → `-END`)
```
Between the two frames, a very slow cinematic push-in; the standing figure shifts weight almost imperceptibly; a soft neutral light sweeps slowly down the edge of the tall mirror-chrome monolith; faint reflections drift on the floor. Strictly greyscale, no colour, no warmth. Seamless 8s loop, low motion. No morphing, no warping, photoreal, museum-silent, Kubrick 2001.
```
*(alt hero : `00b-hero-boutique` — `Soft neutral reflections drift on the chrome kiosk while a person stands before it in the dark boutique, faint neutral screen glow, slow push-in. Greyscale, seamless loop, no morphing.`)*

### 01 · PHOTOBOOTH (`01-photobooth` → `-END`)
```
Slow push-in; soft neutral reflections drift and travel across the mirror-polished chrome shell of the cabin; a faint neutral light glows from within the open entrance. Strictly greyscale, no warmth. Seamless 8s loop, low motion, structure solid. No morphing, no warping, photoreal.
```

### 02 · ENGRAVING (`02-engraving` → `-END`)
```
The articulated chrome arm makes one slow, small, precise downward move then gently returns; a bright specular glint travels along the polished chrome body; a highlight shifts on the bottle. Near-locked camera with a hint of push-in. Strictly greyscale, no warmth. Seamless 8s loop. No morphing, no warping, no extra parts, photoreal.
```

### 03 · GAMING (`03-gaming` → `-END`)
```
An abstract minimalist greyscale UI pattern shifts and refracts slowly on the vertical screen (neutral luminance only, no colour); neutral reflections drift across the mirror-chrome frame; slow push-in. Strictly greyscale, no warmth. Seamless 8s loop, low motion. No readable text, no neon, no morphing, photoreal.
```

### 04 · SCENT (`04-scent` → `-END`) — ▶ commence par celui-ci
```
The fine neutral-grey mist rises and curls continuously from the top of the chrome diffuser, drifting slowly upward; a specular highlight shimmers gently on the mirror surface; barely-there push-in. Strictly greyscale, no warmth, natural smoke physics. Seamless 8s loop, low motion. No morphing, no warping, photoreal.
```

### 05 · KIOSK & HOSTESS (`05-kiosk-hostess` → `-END`) — le plus délicat, à faire en dernier
```
The on-screen figure breathes gently and shifts her gaze/head very slightly with a calm presence; a soft neutral screen shimmer passes slowly; neutral reflections drift on the chrome frame. Locked camera, MINIMAL motion. Strictly greyscale, no warmth. Seamless 8s loop. The figure stays clearly on-screen content — no face morphing, no distortion, photoreal.
```

### 06 · CUSTOM (`06-custom` → `-END`)
```
Slow push-in through the dark room; soft neutral reflections drift across the two mirror-chrome stations; ambient neutral light shifts slowly; a figure moves subtly. Strictly greyscale, no warmth. Seamless 8–10s loop, low motion. No morphing, no warping, photoreal, museum-silent.
```

---

## ▶️ Étape par étape (par quel frame tu commences)
1. **Valide sur `04-scent`** (mist = le mouvement le plus « pardonnant » = zéro risque). Weave : `04-scent.png` en **first frame**, `04-scent-END.png` en **last frame**, durée **8s**, colle le prompt SCENT, *motion* **bas**, génère. Vérifie la boucle. Export → `scent.mp4`.
2. **`02-engraving`** (petit mouvement mécanique — teste le « subtil sans morphing »).
3. **`00-hero-monolith`** (le hero signature) → export `hero.mp4`.
4. **`01-photobooth`** → **`03-gaming`** → **`06-custom`**.
5. **`05-kiosk-hostess`** en **dernier** (visage = le plus risqué : mouvement minime).
6. Dépose chaque `.mp4` au chemin indiqué en tête → dis-moi **« vidéos prêtes »**, je câble + compresse.

---

# LES AUTRES ASSETS — prompts vidéo (start frame seule, boucle)
> Pas d'end-frame : mouvement **génératif** subtil. Même règles (greyscale strict, seamless 8–10s, low motion, `no morphing/warping`).
>
> ⭐ **SI TU VEUX LIMITER : fais ces 5 « grands » en priorité** (les fonds/ambiances immersifs, plus fort impact) →
> `liquid-metal-forms` · `liquid-chrome-landscape` · `monolith-1` · `chrome-ribbon` · `section-noise`. **Le reste = optionnel.**

## A · Détails / hover (survol des cartes)
- **`photobooth/photobooth-detail.png`** : `Soft neutral reflections drift across the rounded chrome corner; the faint figure on the screen shifts almost imperceptibly. Seamless loop, greyscale, macro, no morphing.`
- **`engraving/engraving-detail-macro.png`** : `The engraving stylus completes one slow letter stroke then holds; a sharp specular glint travels along the freshly cut serif letters. Seamless loop, greyscale, macro, no morphing, no garbled text.`
- **`engraving/engraving-macro-2.webp`** : `A small precise mechanical move on the chrome engraving head; a highlight glides along the polished body. Seamless loop, greyscale, no morphing.`
- **`gaming/gaming-detail-screen.png`** : `The abstract greyscale hexagonal UI pattern pulses and expands slowly on the screen (neutral luminance only, no colour); reflections drift on the chrome bezel. Seamless loop, greyscale, no readable text, no morphing.`
- **`gaming/gaming-faceted-alt.png`** : `A soft neutral light sweeps slowly across the faceted chrome pillar, each facet catching and releasing the highlight; barely-there rotation. Seamless loop, greyscale, no morphing.`

## B · Variantes kiosk & hôtesse
- **`kiosk-hostess/kiosk-hostess-face.png`** : `The on-screen face breathes and blinks slowly, gaze shifting very slightly; a soft neutral screen shimmer passes. Locked, MINIMAL motion, greyscale, no face distortion, no morphing.`
- **`kiosk-hostess/kiosk-hostess-silhouette.png`** : `The silhouetted figure shifts weight slowly; the spotlight breathes gently; neutral reflections drift on the chrome kiosk. Locked, low motion, greyscale, no morphing.`
- **`kiosk-hostess/kiosk-context-1.png` / `-2` / `-3`** : `Inside the dark boutique, a person stands near the chrome kiosk; soft neutral reflections and a faint screen glow drift slowly; barely-there push-in. Seamless loop, greyscale, low motion, no morphing.`

## C · Custom & hero alternatif
- **`custom/custom-counter.png`** : `Soft neutral reflections drift across the chrome counter station; a figure moves subtly; ambient light shifts slowly. Seamless loop, greyscale, low motion, no morphing.`
- **`hero/hero-boutique.png`** (hero alt) : `A person stands before the chrome kiosk in the dark boutique; reflections and a faint neutral screen glow drift; very slow push-in. Seamless loop, greyscale, no morphing.`

## D · Textures — fonds animés (backgrounds, dividers, overlays)
- **Liquide/molten** (`liquid-chrome-1/2/3`, `liquid-chrome-landscape`, `liquid-metal-forms`, `chrome-slab-rippled`, `chrome-wave`) : `Molten chrome flows and ripples very slowly and continuously, mirror reflections drifting across the surface. Seamless loop, strictly greyscale, locked camera, no morphing, no warping.` → **fond hero / section immersive**.
- **Monolithes** (`monolith-1`, `monolith-2`) : `A soft neutral light sweeps very slowly across the standing chrome monolith in the void, faint reflections shift. Seamless loop, greyscale, locked, no morphing.` → **section nuit**.
- **Ruban** (`chrome-ribbon`) : `The polished chrome ribbon twists and undulates slowly through the black void, reflections travelling along it. Seamless loop, greyscale, no morphing.` → **divider / transition de section**.
- **Sphère** (`chrome-sphere`) : `The mirror-chrome sphere rotates almost imperceptibly, soft neutral reflections drifting across it. Seamless loop, greyscale, locked, no morphing.` → **accent / motif**.
- **Goutte** (`chrome-droplet`) : `A subtle neutral highlight glides across the chrome droplet, a faint tremor on the surface. Seamless loop, macro, greyscale, no morphing.` → **accent / détail**.
- **Glint** (`glint-streak`) : `A single soft specular streak travels slowly along the polished chrome edge against black. Seamless loop, greyscale, minimal.` → **divider animé**.
- **Brushed** (`brushed-cylinder`, `brushed-panel`) : `Raking neutral light drifts very slowly across the brushed chrome grain, revealing the texture. Seamless loop, greyscale, locked, no morphing.` → **fill / fond de carte**.
- **Sections subtiles** (`section-light-gradient`, `section-night`, `hairline-divider`) : `An extremely subtle neutral sheen drifts across the surface, near-static, quiet. Seamless loop, greyscale.` → **fonds de section**.
- **Grain** (`section-noise`) : `Fine black-and-white film grain shimmers subtly and evenly. Seamless loop, greyscale, no colour.` → **overlay texture** sur toute la page.

## Où déposer ces vidéos
- Survols de cartes → `web/public/media/experiences/<slug>-detail.mp4` · Fonds textures → `web/public/media/textures/<nom>.mp4`. (Je câble au dépôt.)

---

## Notes
- Les assets sont en 1:1 / 4:3 / 16:9 — pas grave, le site recadre en `object-cover`. Génère la vidéo au **ratio natif de la frame**.
- Rejette tout rendu qui dérive en teinte (bleuté/chaud) — greyscale strict.
