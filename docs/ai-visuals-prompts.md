# Pack de prompts IA — visuels Treeosk (Graphite Chrome)

> **But :** générer les visuels immersifs (hero + 6 expériences) avec l'outil IA de ton choix
> (Higgsfield, Runway, Kling, Sora, Veo, Midjourney, Firefly…), puis les déposer dans le projet
> pour que je les câble. Approche « dossier input » du guide `super_skill_claude_ide.md`.

## Où déposer les fichiers
- **Vidéos** (mp4, 1080p+, ~8–12 s, boucle propre) → `web/public/media/experiences/<slug>.mp4` et `web/public/media/hero/hero.mp4`
- **Images / poster** (webp ou jpg, ≥1600px) → même dossier, même nom (`<slug>.webp`, `hero.webp`)
- Bruts non optimisés → `web/input/raw/` (je m'occupe de l'optimisation web).
- **Slugs** : `photobooth · engraving · gaming · scent · kiosk-hostess · custom`

## ⚠️ RÈGLE N°1 — rendu authentique, PAS « look IA » (obligatoire)
Le rendu doit ressembler à de la **vraie photographie / du vrai film**, jamais à une image générée par IA.
**À coller dans le positif de CHAQUE prompt :**
> authentic professional photography, real documentary footage, shot on ARRI Alexa / 35mm film, natural realistic skin texture with pores and subtle imperfections, true-to-life lighting and shadows, real human anatomy, photojournalistic realism, subtle film grain, believable and candid — NOT AI-generated looking.

**Bloc négatif à coller dans CHAQUE prompt (Negative prompt / --no) :**
> AI look, AI-generated aesthetic, plastic waxy skin, airbrushed, over-smoothed, uncanny valley, deformed or distorted face, malformed hands, extra fingers, mangled anatomy, CGI, 3D render, video-game render, illustration, cartoon, painting, artificial gloss, oversaturated, over-sharpened, HDR halos, watermark, text, logo, warped background, melting objects.

## Direction artistique commune (à coller dans CHAQUE prompt, APRÈS la règle n°1)
> Monochrome, near-black background (#0B0B0C), desaturated cinematic, premium luxury cosmetic retail environment, brushed chrome / metallic accents, soft key light + subtle rim light, shallow depth of field, elegant and minimal, editorial fashion film look, no text, no logos, no bright colors, no garish neon. Aspect 4:5 portrait for cards, 16:9 for hero.

> **Rappel :** privilégie des plans où le rendu réaliste est facile à tenir (macro d'objets, mains, silhouettes, détails matière, plans larges). Évite les gros plans de visages frontaux — c'est là que le « look IA » se voit le plus.

**Vidéo (règles) :** mouvement lent et subtil (slow dolly / slow motion), boucle *seamless*, 8–12 s, pas de coupe, sujet centré, fond sombre pour fondre dans la « fenêtre sombre ». **Anti-IA en motion (crucial)** : `real cinematic footage, natural believable motion, stable — no morphing, no warping, no flickering, no melting, no wobbling geometry, no AI motion artefacts`. **Reduced-motion** : je fournis un poster fixe pour ceux qui coupent les animations.

---

## HERO — signature in-store
- **Image :** `A luxury beauty flagship store at night, a single elegant customer interacting with a sleek dark digital kiosk, brushed chrome details, near-black desaturated cinematic, soft reflections on polished floor, shallow depth of field, editorial fashion film, monochrome, no text, 16:9. Authentic real photography, natural texture, NOT AI-generated looking.`
- **Vidéo :** `Slow cinematic dolly-in toward the customer at the kiosk, subtle screen glow, faint drifting light reflections, 10s seamless loop, monochrome, near-black, no cuts.`

## 1 — Photobooth (`photobooth`)
- **Image :** `Premium in-store photobooth in a luxury cosmetics boutique, a stylish person mid-pose, soft flash frozen, brushed metal booth, near-black desaturated cinematic, monochrome, shallow DOF, editorial, no text, 4:5. Authentic real photography, natural skin texture, NOT AI-generated looking.`
- **Vidéo :** `The flash fires once in slow motion, light blooms then settles, person subtly shifts pose, 8s seamless loop, monochrome near-black.`

## 2 — Gravure personnalisée (`engraving`)
- **Image :** `Extreme macro of a precision machine engraving a name onto a matte perfume bottle, fine metal shavings, brushed chrome tool, near-black background, single warm-neutral key light, monochrome desaturated, luxury, no text, 4:5. Authentic macro photography, real metal/material texture, NOT AI-generated looking.`
- **Vidéo :** `Macro slow pan following the engraving head as it etches a line, tiny particles catching light, 10s seamless loop, monochrome, near-black.`

## 3 — Gaming (`gaming`)
- **Image :** `Sleek interactive gaming kiosk in a luxury retail space, a hand touching a dark glossy screen with abstract monochrome UI glow, brushed chrome frame, near-black cinematic, shallow DOF, no text, 4:5. Authentic real photography, natural hand/skin texture, NOT AI-generated looking.`
- **Vidéo :** `Hand swipes across the screen, soft monochrome UI ripples respond, slow parallax, 8s seamless loop, near-black.`

## 4 — Diffuseur de parfum (`scent`)
- **Image :** `A refined scent-diffuser device on a marble fragrance counter releasing a fine mist, backlit against near-black, mist catching soft light, brushed metal, monochrome desaturated, luxury cosmetic, no text, 4:5. Authentic real photography, realistic mist and material texture, NOT AI-generated looking.`
- **Vidéo :** `Fine mist slowly rises and curls, backlit, drifting gently, 12s seamless loop, monochrome, near-black.`

## 5 — Bornes & hôtesse virtuelle (`kiosk-hostess`)
- **Image :** `An elegant interactive kiosk showing a poised virtual hostess on a tall dark screen, luxury boutique, brushed chrome stand, near-black cinematic, soft screen glow on floor, monochrome, no text, 4:5. Authentic real photography of the physical kiosk (the on-screen hostess may read as a screen), NOT AI-generated looking.`
- **Vidéo :** `The virtual hostess turns slightly and gestures a welcome, subtle screen shimmer, 10s seamless loop, monochrome near-black.`

## 6 — Animations sur mesure (`custom`)
- **Image :** `A bespoke immersive brand activation inside a flagship, abstract sculptural light installation with chrome surfaces, a couple of guests silhouetted, near-black cinematic, monochrome, luxury event, no text, 4:5. Authentic real event photography, natural texture, NOT AI-generated looking.`
- **Vidéo :** `Slow reveal of the light installation, gentle shifting reflections on chrome, silhouettes moving softly, 12s seamless loop, monochrome near-black.`

---

## Après génération
Dépose les fichiers aux emplacements ci-dessus et dis-moi « assets prêts » : je câble
- la **vidéo du hero** dans la fenêtre immersive (`<video autoplay muted loop playsinline poster>` + fallback poster si reduced-motion),
- les **6 vidéos/images** dans les cartes de la section Expériences (hover-reveal),
et j'optimise (compression, dimensions, `poster`).
