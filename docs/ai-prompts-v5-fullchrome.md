# Pack de prompts v5 — Treeosk FULL CHROME (Midjourney v7 / Figma Weave)

> **Remplace intégralement les packs v2/v3/v4** (qui étaient warm/sépia/bleu — invalidés).
> DA de référence : `docs/direction-artistique-v2-fullchrome.md`. **Greyscale strict, zéro teinte, zéro chaleur.**
> Slugs & emplacements inchangés → `docs/media-map.md`. Cartes **4:5**, hero **16:9**.
> **Usage Weave :** colle le prompt SANS les `--params` (Weave ignore la syntaxe Midjourney) ; garde le ratio.

---

## Bloc DA commun — à coller dans CHAQUE prompt (après le sujet)
```
strictly greyscale, no colour, no warmth, neutral tone throughout, pure neutral brushed and mirror-polished chrome (silver, museum quality), neutral 4500K studio lighting, deep neutral near-black background #141418, canvas-grey highlights #FAFAFB, minimal silent composition with generous negative space, Bang & Olufsen and Rimowa product aesthetic, no text, no logos, photoreal authentic photography — not AI-looking, natural material texture.
```

## Bloc négatif — à coller dans le `--no` de CHAQUE prompt
```
--no warm tones, sepia, gold, amber, orange, tungsten glow, warm shadow, blue, teal, cyan, any colour cast, colourful UI, CineStill halation, AI-generated look, plastic waxy skin, airbrushed, uncanny valley, deformed face, malformed hands, extra fingers, CGI, 3D render, video-game aesthetic, illustration, cartoon, oversaturated, HDR halos, oversharpened, text, watermark, logo, warped geometry, melting objects
```

## Paramètres Midjourney (verrouillés)
`--style raw --v 7 --stylize 50 --chaos 5` · **`--ar 4:5`** (cartes) / **`--ar 16:9`** (hero).
Éclairage : softbox 90×120cm upper-right **4500K neutre**, fill silver ratio 4:1, rim strip neutre, fond dégradé `#FAFAFB → #141418`. **Interdit :** 2900K tungsten, warm rim, sépia, halation.

---

## HERO — 16:9 · signature muséale
```
Cinematic wide establishing shot, museum-silent and still, of a single tall monolithic mirror-polished chrome kiosk standing alone in a minimalist luxury cosmetics boutique at night, one elegant figure seen three-quarter from behind faintly reflected in the chrome surface, vast empty negative space on the left third of the frame for text, rule-of-thirds composition, the kiosk anchoring the right.
strictly greyscale, no colour, no warmth, neutral tone throughout, pure neutral brushed and mirror-polished chrome (silver, museum quality), neutral 4500K single soft key light from upper right, deep neutral near-black ambient #141418 filling the shadows, high dramatic contrast ratio 12:1, canvas-grey highlights #FAFAFB, minimal silent composition with generous negative space, no text, no logos.
Shot on Phase One XF IQ4 150MP with a 35mm at f/2, ISO 200, digital medium format neutral rendering, or Kodak Tri-X 400 black-and-white grain, no warm film emulation.
Style: Stanley Kubrick 2001: A Space Odyssey chrome-and-void combined with Denis Villeneuve Arrival smooth-matter restraint and Bang & Olufsen brand photography, museum catalog, gallery quality, photoreal authentic photography not AI-looking.
--ar 16:9 --style raw --v 7 --stylize 50 --chaos 6 --no warm tones, sepia, gold, amber, orange, tungsten glow, warm shadow, blue, teal, any colour cast, CineStill halation, AI-generated look, plastic waxy skin, uncanny valley, deformed face, malformed hands, CGI, 3D render, illustration, oversaturated, HDR halos, text, watermark, logo, warped geometry
```

---

## 1 · PHOTOBOOTH

### 1A · Hero shot 3/4 (`photobooth`)
```
Product hero photograph for a museum design catalog of a bespoke luxury in-store photobooth cabin standing alone in a dark neutral studio void, shot at a low three-quarter angle emphasizing its architectural sculptural quality, a minimalist monolithic pavilion with a pure neutral mirror-polished chrome outer shell, a matte neutral near-black interior visible through the open entrance hinting at a dark bench and a screen, proportioned like a contemporary furniture object, no visible logos.
strictly greyscale, no colour, no warmth, pure neutral brushed and mirror-polished chrome, neutral 4500K softbox from upper right, silver reflector fill ratio 4:1, neutral strip rim light carving the silhouette against #141418, background gradient from #FAFAFB down to #141418, minimal silent composition, no text.
Shot on Phase One XF IQ4 150MP with Schneider 80mm at f/8, ISO 100, digital medium format neutral, fine natural chrome texture, Kodak Tri-X 400 b&w grain option.
Style: Bang & Olufsen product photography + Rimowa brushed-metal campaign + Nicholas Alan Cope still life, museum object display, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 5 --no warm tones, sepia, gold, amber, tungsten, warm shadow, blue, colour cast, cheap fairground photobooth, mall photo kiosk, curtained booth, AI-generated look, CGI, 3D render, plastic gloss, oversaturated, HDR halos, warped geometry, text, watermark, logo
```

### 1B · Macro matière (`photobooth-detail`)
```
Extreme close-up product detail of the corner where a glossy screen meets the pure neutral brushed-chrome shell of a luxury photobooth, the screen showing a subtle abstract greyscale portrait-frame UI (neutral luminance only, no colour), the brushed chrome revealing its fine directional grain under raking neutral light.
strictly greyscale, no colour, no warmth, pure neutral brushed chrome, neutral 4500K raking softbox from upper left revealing the brush grain, neutral screen luminance glow, deep neutral near-black background #141418, extreme shallow depth of field on the chrome-to-screen junction.
Shot on Phase One XF IQ4 150MP with Schneider 120mm Macro at f/5.6, ISO 200, ultra-fine natural chrome grain, no artificial microdetail.
Style: Levon Biss macro detail + Bang & Olufsen product close-up, editorial museum catalog, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 4 --no warm tones, sepia, gold, blue screen, colour cast, neon, AI-generated look, CGI, 3D render, artificial gloss, oversaturated, HDR halos, readable UI text, 8K microdetail, warped chrome, text, watermark, logo
```

---

## 2 · ENGRAVING

### 2A · Hero shot (`engraving`)
```
Product hero photograph for a museum design catalog of a bespoke precision engraving station standing on a neutral polished stone counter in a dark neutral studio void, a pure neutral brushed-chrome body housing an articulated diamond stylus arm and a matte near-black cradle holding a matte glass bottle, the form resembling a high-end horology or haute-joaillerie instrument, no visible cables.
strictly greyscale, no colour, no warmth, pure neutral brushed and mirror chrome, neutral 4500K softbox upper right, silver fill 4:1, neutral strip rim against #141418, small neutral kicker on the diamond stylus tip, background gradient #FAFAFB to #141418.
Shot on Phase One XF IQ4 150MP with Schneider 80mm at f/8, ISO 100, digital medium format neutral, ultra-fine precise mechanical detail, Kodak Tri-X 400 b&w grain option.
Style: Bang & Olufsen + Patek Philippe / A. Lange horology campaign restraint + Nicholas Alan Cope, museum object, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 5 --no warm tones, sepia, gold, tungsten, warm shadow, blue, colour cast, industrial factory equipment, dremel, plastic housing, AI-generated look, CGI, 3D render, oversaturated, HDR halos, warped geometry, cables, text, watermark, logo
```

### 2B · Macro trace gravée (`engraving-detail`)
```
Extreme macro of a matte-satin glass bottle showing a personalized name freshly engraved in precise elegant serif letters, the etched marks catching a single neutral raking light so each letter reads as a sharp shadow-and-highlight relief, a tiny curl of glass material lifting off next to the last letter, the diamond stylus tip just leaving the surface at the top of frame.
strictly greyscale, no colour, no warmth, neutral raking key light at a low angle revealing every micro-relief, neutral silver bounce fill, deep unlit neutral near-black background #141418, contrast ratio 15:1.
Shot on Phase One XF IQ4 150MP with Schneider 120mm Macro at f/8, ISO 200, natural optical fall-off, Fuji Neopan 400 b&w aesthetic.
Style: Levon Biss macro + haute-joaillerie product macro, museum catalog, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 4 --no warm tones, sepia, gold, colour cast, AI-generated look, CGI, 3D render, plastic bottle, oversaturated, HDR halos, illegible garbled text, floating letters, warped bottle, text, watermark, logo
```

---

## 3 · GAMING

### 3A · Hero shot (`gaming`)
```
Product hero photograph of a sleek floor-standing interactive gaming kiosk standing alone in a dark neutral studio void, a minimalist human-height pavilion with a large glossy vertical screen set in a pure neutral mirror-chrome frame, the screen displaying an abstract minimalist greyscale UI made of neutral luminance geometric patterns (no colour), a hint of the neutral floor at the base.
strictly greyscale, no colour, no warmth, pure neutral mirror and brushed chrome, neutral 4500K softbox upper left, silver fill 4:1, neutral screen luminance as a self-illuminating element, neutral strip rim against #141418, background gradient #FAFAFB to #141418.
Shot on Phase One XF IQ4 150MP with Schneider 80mm at f/8, ISO 100, digital medium format neutral, ultra-fine chrome detail.
Style: Bang & Olufsen + high-end interactive tech campaign + Nicholas Alan Cope, museum object, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 5 --no warm tones, sepia, gold, blue glow, neon, radioactive glow, colour cast, arcade machine, cheap tablet on stand, video-game UI, AI-generated look, CGI, 3D render, oversaturated, HDR halos, readable UI text, warped geometry, text, watermark, logo
```

### 3B · Macro interaction (`gaming-detail`)
```
Extreme close-up of the upper corner of a gaming kiosk screen where a fingertip has just left the glass leaving a faint neutral moisture trace, the finger out of frame, the screen showing a subtle slowly-pulsing greyscale geometric UI shape (neutral luminance, no colour), the pure neutral brushed-chrome bezel catching raking neutral light along the top edge.
strictly greyscale, no colour, no warmth, neutral 4500K raking softbox revealing brush grain, neutral screen luminance glow spilling softly onto the chrome edge, deep neutral near-black background #141418, extreme shallow depth of field.
Shot on Phase One XF IQ4 150MP with Schneider 120mm Macro at f/5.6, ISO 200, natural rendering.
Style: Levon Biss macro + Bang & Olufsen product detail, museum catalog, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 4 --no warm tones, sepia, gold, blue, neon, colour cast, arcade UI, video-game HUD, AI-generated look, CGI, 3D render, oversaturated, HDR halos, readable UI text, warped screen, text, watermark, logo
```

---

## 4 · DIFFUSEUR DE PARFUM

### 4A · Hero shot (`scent`)
```
Product hero photograph for a museum design catalog of a luxury scent-diffuser device standing alone on a neutral polished stone surface in a dark neutral studio void, a minimalist vertical cylindrical vessel about 30cm tall in pure neutral brushed and mirror chrome, a fine translucent neutral-grey mist actively rising from the top aperture in delicate wisps, form referencing haute-perfumery meets contemporary architecture, no logos.
strictly greyscale, no colour, no warmth, pure neutral chrome, neutral 4500K softbox upper right, silver fill ratio 6:1, neutral strip rim backlighting the rising mist so it reads as luminous neutral filaments, deep neutral near-black background #141418.
Shot on Phase One XF IQ4 150MP with Schneider 80mm at f/8, ISO 100, digital medium format neutral, realistic natural mist physics.
Style: Bang & Olufsen + Byredo / Aesop restraint (but strictly greyscale) + Nicholas Alan Cope, museum object, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 5 --no warm tones, sepia, gold, amber, warm mist, colour cast, CGI smoke, video-game smoke, generic perfume bottle, cheap aromatherapy diffuser, plastic housing, AI-generated look, CGI, 3D render, oversaturated, HDR halos, warped geometry, text, watermark, logo
```

### 4B · Macro mist (`scent-detail`)
```
Extreme macro of the aperture rim of a luxury scent-diffuser at the exact moment the mist emerges from the pure neutral brushed-chrome aperture, the mist as translucent neutral-grey filaments backlit against near-black, individual droplets caught mid-flight, precise machining detail on the chrome edge.
strictly greyscale, no colour, no warmth, single neutral rim light behind the aperture creating a neutral halo separating the mist from pure black, neutral silver bounce fill, deep unlit neutral near-black background #141418, contrast 15:1.
Shot on Phase One XF IQ4 150MP with Schneider 120mm Macro at f/5.6, ISO 200, shutter 1/125 freezing the mist, natural physics.
Style: Levon Biss macro + high-end fragrance campaign (greyscale), museum catalog, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 4 --no warm tones, sepia, gold, warm mist, colour cast, CGI smoke, video-game smoke, plastic aperture, AI-generated look, CGI, 3D render, oversaturated, HDR halos, warped geometry, text, watermark, logo
```

---

## 5 · KIOSK & HÔTESSE VIRTUELLE (`kiosk-hostess`)
```
Product hero photograph for a museum design catalog of a floor-standing interactive kiosk with a tall vertical display, alone in a dark neutral studio void, a minimalist monolithic pavilion about 180cm tall with a pure neutral mirror-chrome architectural frame housing a large glossy vertical screen, the screen displaying a poised elegant virtual hostess visible from mid-torso up in a minimalist high-collar top, rendered in strict greyscale and reading naturally as genuine on-screen content on a real display, no cables.
strictly greyscale, no colour, no warmth, pure neutral mirror and brushed chrome, neutral 4500K softbox upper right, silver fill 4:1, neutral screen luminance self-illumination, neutral strip rim against #141418, background gradient #FAFAFB to #141418.
Shot on Phase One XF IQ4 150MP with Schneider 80mm at f/8, ISO 100, digital medium format neutral, ultra-fine chrome detail, on-screen figure natural and stable.
Style: Bang & Olufsen + high-end interactive retail campaign; the on-screen hostess must read as screen content, not a person standing in the scene, photoreal not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 5 --no warm tones, sepia, gold, blue glow, neon, colour cast, plastic waxy skin on the hostess, uncanny valley face, hologram sci-fi, arcade machine, ATM, cheap tablet on stand, AI-generated look, CGI, 3D render, oversaturated, HDR halos, warped geometry, readable UI text, text, watermark, logo
```

---

## 6 · SUR-MESURE / CUSTOM (`custom`)
```
Cinematic wide shot, museum-silent, of a bespoke immersive brand activation inside a flagship: a large sculptural mirror-chrome installation of smooth liquid-metal forms filling the space, one or two elegant figures in matte near-black attire silhouetted and moving slowly through it, their reflections stretching across the neutral chrome surfaces, generous negative space.
strictly greyscale, no colour, no warmth, pure neutral mirror chrome, neutral 4500K / 5600K daylight source, deep neutral near-black ambient #141418, dramatic contrast 12:1, no warm shadow, canvas-grey highlights #FAFAFB.
Shot on Phase One XF IQ4 100MP with a 50mm at f/4, ISO 400, digital medium format neutral, or Kodak Tri-X 400 b&w grain.
Style: Stanley Kubrick 2001 + Denis Villeneuve Arrival + Bang & Olufsen brand film, museum quality, photoreal authentic photography not AI-looking.
--ar 4:5 --style raw --v 7 --stylize 50 --chaos 6 --no warm tones, sepia, gold, amber, tungsten, warm shadow, blue, colour cast, AI-generated look, plastic waxy skin, uncanny valley, deformed face, malformed hands, CGI, 3D render, oversaturated, HDR halos, warped geometry, text, watermark, logo
```

---

## Ordre de test conseillé
1. **HERO** (valide le territoire Kubrick/B&O neutre). 2. **engraving 2A** (objet pur, test le plus honnête du greyscale). 3. **scent 4A** (mist neutre). Si ces 3 tiennent → le reste.

## Signaux d'alerte → correctifs
- **Ça vire warm / grisé-chaud** → ajouter en tête `strictly neutral greyscale, zero warmth, cold-neutral silver`.
- **Chrome plat / terne** → renforcer `mirror-polished chrome with sharp specular highlights, high micro-contrast on brushed grain`.
- **Écran coloré/bleu** → renforcer `greyscale UI, neutral luminance only, no colour`.
- **Visage hôtesse flippant** → cadrer plus serré sur le cadre chrome / couper le visage.
- **Trop propre** → `--stylize 25`.

## Après génération
Range les images (mêmes slugs), dépose les vidéos Weave aux chemins de `docs/media-map.md`, dis-moi → je câble. ⚠️ Les **anciens visuels warm** (`assets/generated/`) ne collent plus à la v2 — à archiver / remplacer.
