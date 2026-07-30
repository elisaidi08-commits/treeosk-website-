# Pack de prompts VIDÉO — Treeosk (image-to-video)

> **Principe :** on **anime les photos déjà validées** (pas de nouvelle image). Prompts **calés sur le contenu réel** de chaque asset (inspectés le 2026-07-03).
> Outils : Runway Gen-3/Gen-4, Kling, Sora, Veo, Luma. Tu fournis la **photo source** + le prompt de mouvement.
> Correspondance photo → emplacement → fichier `.mp4` : voir `docs/media-map.md`.

## Règles d'or (sur CHAQUE clip)
- **Mouvement subtil et lent** — une respiration, pas une scène. C'est du décor immersif.
- **Boucle *seamless* 8–10 s**, pas de coupe, caméra quasi statique (au max push-in ~2%).
- **Garder compo, couleurs, lumière** de la photo — ne rien réinventer.
- **Palette verrouillée** : chrome tiède + sépia tungstène + bleu écran RARE (seulement hero/gaming/kiosk).
- **Anti-IA motion (crucial)** : `no morphing, no warping, no melting, no wobbling geometry, no new objects appearing, stable photoreal footage`.

### Réglages conseillés
- **Runway Gen-4** : image-to-video, *Motion* 2–4/10, 5 s puis *extend*/loop, garder la seed.
- **Kling** : *Motion brush* léger sur la zone qui bouge (fumée, écran, main), *Creativity* bas, loop on.
- **Sora / Veo** : « seamless loop, minimal motion, locked camera ».

---

## 🎬 Les 7 vidéos prioritaires

### 1 · HERO — diffuseur (`hero.mp4`)
**Source :** `scent/scent-hero-diffuser.png` *(cylindre chrome miroir, star specular sur le rebord, gros panache de fumée blanc-gris montant à droite, marbre doré)*
```
Subtle cinematic loop. The white-grey fragrance smoke rises and curls continuously above and behind the polished mirror-chrome cylinder, drifting slowly to the upper right and dissipating; the bright specular star highlight on the top rim shimmers and breathes gently; warm golden reflections from the marble slowly travel across the mirrored chrome body. Camera perfectly locked. Seamless 8-10s loop. Keep the exact composition, warm gold-marble palette and lighting. No morphing, no warping, natural smoke physics, photoreal.
```

### 2 · PHOTOBOOTH (`photobooth.mp4`)
**Source :** `photobooth/photobooth-wide-context.png` *(cabine en métal chromé/foil froissé, étagères de produits à gauche)*  ⚠️ maillon faible — voir Notes
```
Very subtle loop. Warm golden light reflections drift and ripple slowly across the crumpled metallic chrome surface of the booth; a faint warm glow pulses gently from the interior; the product bottles on the boutique shelves catch tiny shifting highlights. Camera almost static, ultra-slow 2% push-in. Seamless 8s loop. Preserve composition and warm palette; the booth structure stays solid. No morphing, no warping, photoreal.
```

### 3 · ENGRAVING (`engraving.mp4`)
**Source :** `engraving/engraving-hero-station.png` *(station chrome, flacon de parfum, écran avec des lèvres)*
```
Subtle loop. A single specular glint travels slowly along the polished chrome arm of the engraving station; the liquid inside the glass perfume bottle catches a soft moving highlight; the small screen showing lips glows and shifts almost imperceptibly. Locked camera. Seamless 8s loop. Keep composition and warm sepia palette. No morphing, no warping, no new mechanical parts, photoreal.
```

### 4 · GAMING (`gaming.mp4`)
**Source :** `gaming/gaming-hero-kiosk.png` *(monolithe chrome, écran à facettes cristallines bleu-gris, rim doré, socle marbre)*
```
Subtle loop. The faceted crystalline blue-grey pattern on the screen shifts and refracts slowly and continuously (the ONLY cool tone); the warm golden rim light along the top-left edge of the chrome frame breathes gently; soft reflections drift across the marble base. Locked camera, ultra-slow push-in. Seamless 8s loop. Preserve composition and palette. No readable text, no neon, no morphing, no warping, photoreal.
```

### 5 · SCENT — carte (`scent.mp4`)
**Source :** `scent/scent-card-diffuser.png` *(cylindre chrome, flare star sur le rebord, panache de fumée pâle, marbre doré)*
```
Subtle loop. The pale fragrance smoke rises and unfurls continuously beside the polished chrome cylinder, drifting slowly upward and to the right; the bright star flare on the top rim shimmers softly; warm marble reflections shift slowly on the mirrored body. Locked camera. Seamless 8s loop. Keep composition and warm palette. No morphing, no warping, natural smoke physics, photoreal.
```

### 6 · KIOSK & HOSTESS (`kiosk-hostess.mp4`)
**Source :** `kiosk-hostess/kiosk-hero-1.png` *(monolithe chrome, écran affichant une femme posée en haut argenté)*
```
Subtle loop. The on-screen woman breathes gently and shifts her gaze and head very slightly with a calm, welcoming presence; a soft cool screen shimmer passes slowly over the display; warm golden reflections glide along the polished chrome frame and edge. Locked camera. Seamless 8s loop. The figure must remain clearly on-screen content — natural, stable, no distortion. No face morphing, no warping, photoreal.
```

### 7 · BESPOKE / CUSTOM (`custom.mp4`)  ⭐ recommandé : swap sur `custom-wide-installation`
**Source recommandée :** `custom/custom-wide-installation.png` *(couple en tenue de soirée marchant dans une installation de bulles chrome miroir, dorée)*
```
Subtle loop. The elegant couple walks slowly forward through the mirrored chrome-bubble installation; warm golden reflections stretch and flow across the liquid-metal spheres as they move past; ambient light drifts softly. Slow push-in (or locked) camera. Seamless 8-10s loop. Keep composition and warm palette; reflections stay coherent. No morphing, no warping, no new figures, photoreal.
```
**Source alternative :** `custom/custom-hero-activation.png` *(deux silhouettes face à face sous une draperie chrome, invités flous derrière)*
```
Subtle loop. The two figures shift their weight and turn their heads very slightly in quiet conversation; the draped metallic chrome fabric overhead ripples slowly with warm and cool reflections; blurred guests in the background move gently. Locked camera. Seamless 8-10s loop. Preserve composition and warm cinematic palette. No morphing, no warping, no new figures, photoreal.
```

---

## 🖼️ Optionnel — vidéos de survol (hover) plus tard
- **gaming-detail-screen** *(main qui touche une surface chrome)* : `The fingertips press and slowly lift off the reflective chrome surface leaving a faint warm ripple; reflections shift subtly. Locked macro. Seamless loop. Natural skin, no warping, photoreal.`
- **kiosk-detail-1** *(visage à moitié derrière un cadre chrome, liseré orange)* : `The face blinks slowly and shifts very slightly; the warm orange seam glow flickers gently; chrome reflections drift. Locked. Loop. Face stable, no distortion, photoreal.`
- **scent-detail-mist** *(macro de l'aperture, brume)* : `Fine mist emerges and curls continuously from the aperture, backlit. Locked macro. Loop. Natural smoke, no warping, photoreal.`

---

## Notes & recommandations (après inspection des assets)
- **Custom → swap** : `custom-wide-installation` (bulles chrome) est plus lisible et plus « waouh » que `custom-hero-activation`. Je peux recâbler la carte dessus quand tu veux.
- **Photobooth = faible** : `photobooth-wide-context` lit comme une boîte en foil doré, et `photobooth-detail-panel` est en fait un **visage** (pas un panneau UI). → à **re-générer** (prompt v4 3A « architectural pavilion, gallery installation quality ») pour un vrai photobooth lisible.
- **Mist = valeur sûre** : hero + scent sont les mouvements les plus naturels → à tester en premier.
- **Kiosk = le plus risqué** (visage animé) → viser un mouvement *minime* (respiration + regard), sinon ça part en uncanny.

## Ordre de test conseillé
1. **`hero` / `scent`** (fumée) — valide la boucle. 2. **`gaming`** (écran facetté) — cool tone. 3. **`kiosk-hostess`** (visage) — stabilité. Si ça passe → les 4 autres.

## Après génération
Dépose chaque `.mp4` au chemin de `docs/media-map.md`, puis dis **« vidéos prêtes »** → je câble (hero + cartes), compresse, et vérifie le fallback reduced-motion.
