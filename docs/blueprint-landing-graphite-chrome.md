# Blueprint — Landing Treeosk (Graphite Chrome)

> **Statut :** à valider avant code · **Version :** 0.1 (2026-07-01)
> **Décisions cadrées :** Stack **Next.js + Tailwind + shadcn/ui** (codé à la main, pas Lovable) · Structure **mix loook.ai (conversion) + landonorris.com (rythme immersif/scroll)** · DA **Graphite Chrome** (verrouillée) · **Trilingue EN / FR / NL** (i18n dès le départ, langue par défaut EN) · **Logos** : source récente `FIGMA DESIGN TREEOSK/logo/` (fichiers du 2026-06-02 : `logo.zip`, `.ai`, `TREEOSK_DESK_ V6.pdf`) → extraire un logo web propre (SVG + PNG monochrome). Autres assets (vidéos/photos in-store) fournis plus tard par l'employeur.
> **Sources de vérité :** `reference/brief-employeur.md`, `../REFONT SITE TREEOSK/TREEOSK-FOUNDATIONS.md` (v0.6), `FIGMA DESIGN TREEOSK/PRD.md`, explorations DA `08/09/10`.

---

## 0. Principes directeurs (garde-fous)

1. **Expériences-first** — Treeosk = *créateur d'expériences*, pas fournisseur de matériel. Une expérience phare est toujours mise en avant en **grand visuel immersif** (« fenêtre sombre » `#0B0B0C` sur canvas clair `#F5F6F7`).
2. **Monochrome strict** — noir / blanc / graphite / **chrome**. Le vert olive des explorations DA existantes est **retiré** → tout re-skinné. Chrome = accent gradient, **1 CTA chrome par vue max**.
3. **Peu de texte, beaucoup d'impact** — copy courte, une idée par section.
4. **Motion intentionnel, pas gadget** — le PRD **interdit le parallax lourd**. GSAP au service de la lisibilité : reveals au scroll, pin de section clé, compteurs de métriques, smooth-scroll Lenis. `prefers-reduced-motion` respecté.
5. **Sales-led B2B** — CTA = **« Book a demo »**, jamais de « buy now ». Objectif : 1 démo qualifiée / jour.

---

## 1. Architecture de la page (section par section)

Copy = reprise fidèle des explorations DA (déjà écrites), re-skinnée Graphite Chrome.

### 1.1 — Header (sticky)
- **Rôle :** navigation minimale + CTA permanent.
- **Contenu :** logo Treeosk (détail chrome) · liens `Expériences ▾` · `Cas clients` · `Comment ça marche` · `À propos` · CTA **« Book a demo »** (Primary noir, pas chrome ici).
- **Visuel :** barre blanche translucide, hairline chrome `#D9DCE0` en bas au scroll.
- **Motion :** apparition/rétraction douce au scroll (hide-on-scroll-down). Réf : loook.ai header.

### 1.2 — Hero immersif
- **Rôle :** promesse immédiate + expérience phare en grand.
- **Overline :** `FOR LUXURY & BEAUTY BRANDS · MEASURED MOMENTS`
- **Titre (Base One Heavy) :** *Memorable experiences. Measurable impact.*
- **Sous-titre (Inter) :** « Photobooth, engraving, gaming, scent, kiosks, and virtual hostesses — we design the in-store moments your customers remember, with the data to measure every one of them. »
- **CTA :** **« Book a demo »** (Chrome — le moment premium de la page) + `See how it works` (Ghost/Link souligné).
- **Visuel :** grande **fenêtre sombre** à droite (desktop) — vidéo/mise en situation en magasin en boucle, filet chrome autour. Réf : landonorris hero full-bleed + loook hero vidéo.
- **Motion :** reveal séquencé (overline → titre par lignes via SplitText → sous-titre → CTA), vidéo qui fade-in. Lenis smooth-scroll global démarre ici.

### 1.3 — Bandeau confiance (logos)
- **Rôle :** preuve sociale immédiate sous le hero.
- **Contenu :** « Trusted by luxury & beauty brands » + rangée de logos clients (monochrome, `steel/400`).
- **Motion :** marquee lent OU fade-in au scroll. Réf : loook cases logos.

### 1.4 — Les Expériences (cœur de page)
- **Rôle :** LA section qui incarne le repositionnement. Les 6 expériences phares.
- **Contenu (6) :** Photobooth · Gravure personnalisée · Gaming · Diffuseurs de parfum · Bornes & Hôtesse virtuelle · Animations sur mesure.
- **Format :** grille de cartes (radius 12) à **fenêtre sombre** + titre + micro-descriptif + `Learn more →`. Réf : loook 4-cards produits (on passe à 6).
- **Traitement immersif :** une expérience « héro » (ex. Photobooth) en carte large/plein cadre, les autres en grille. Réf : landonorris helmet gallery (hover base/hover).
- **Motion :** cartes qui se révèlent en stagger au scroll ; hover = zoom léger du visuel + apparition du `Learn more`. GSAP ScrollTrigger.

### 1.5 — Comment ça marche
- **Rôle :** rassurer sur le process, montrer la brique « data ».
- **Overline :** `HOW IT WORKS` · **Titre :** *From brief to measurable moment.*
- **Sous-titre :** « Three steps, one team, zero guesswork — every moment instrumented from day one. »
- **3 étapes :** `01 Tell us your goals` · `02 We design the moment` · `03 Measure the impact`.
- **Visuel :** 3 colonnes, gros numéraux Base One, hairlines chrome entre colonnes.
- **Motion :** ligne de progression qui se dessine (DrawSVG) en scrollant les étapes ; numéros qui s'incrémentent. Réf : loook « how it works » 3-step.

### 1.6 — Cas clients (métriques)
- **Rôle :** prouver l'impact chiffré (le « measurable »).
- **Overline :** `SELECTED WORK` · **Titre :** *Moments that moved the metric.*
- **Contenu (3 cartes) :** Beauty Maison — Flagship Paris — **+47%** brand interactions (Photobooth) · Fashion House — Pop-up Milan — **212/hr** activations (AR kiosk) · Fragrance — Retail London — **+22%** dwell time (Scent diffuser).
- **Visuel :** cartes blanches, vignette sombre en haut, métrique en très gros (Base One), `View case →`.
- **Note :** *chiffres illustratifs → à remplacer par données réelles (à demander à l'employeur).*
- **Motion :** compteurs animés (0 → valeur) au moment où la carte entre dans le viewport. Réf : loook métriques d'engagement.

### 1.7 — Section immersive « signature » (moment landonorris)
- **Rôle :** respiration cinématique, ancrer le premium.
- **Contenu :** pleine largeur **fenêtre sombre** — grande phrase de marque (« Turn every store visit into a measurable conversation. ») sur visuel in-store, texte `#ECEEF0`.
- **Motion :** section **pinnée** avec reveal de texte au scroll (le seul « gros » moment scroll de la page). Réf : landonorris full-bleed immersif.

### 1.8 — CTA final
- **Rôle :** conversion.
- **Contenu :** titre court (« Let's design your next moment. ») + CTA **« Book a demo »** + email business.
- **Visuel :** fond sombre ou clair contrasté, filet chrome.
- **Motion :** reveal simple.

### 1.9 — Footer
- **Rôle :** navigation secondaire + crédibilité.
- **Contenu :** logo, colonnes (Expériences / Entreprise / Ressources), « Built in Brussels, deployed across Europe », mentions, réseaux.
- **Visuel :** footer sombre minimal. Réf : landonorris footer.

---

## 2. Système de motion (GSAP)

| Élément | Technique GSAP | Où |
|---|---|---|
| Smooth-scroll global | Lenis + ScrollTrigger.update | tout le site |
| Reveal titres | SplitText (lignes) + stagger | hero, section titres |
| Apparition sections | ScrollTrigger fade/translate-y, stagger | cartes exp., cases |
| Compteurs métriques | ScrollTrigger + tween number | cases |
| Ligne process | DrawSVG | how it works |
| Section pinnée | ScrollTrigger pin | section signature 1.7 |
| Hover cartes | gsap.to scale/opacity | expériences |

- **Reduced motion :** tout passe en apparition instantanée si `prefers-reduced-motion: reduce`.
- **Perf :** cible 60fps, `will-change` maîtrisé, pas de parallax multi-couches lourd (interdit PRD).

---

## 3. Stack & sourcing composants

- **Framework :** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Composants base :** shadcn/ui + **cult-ui** (boutons animés, cards) → toujours **re-skinner Graphite Chrome** après import (le pack ne connaît pas la DA).
- **Génération assist :** Magic MCP (21st.dev) pour dégrossir un composant → passe tokens obligatoire ensuite.
- **Tokens :** mappés depuis `TREEOSK-FOUNDATIONS.md` vers `tailwind.config` (couleurs, spacing base-4, radius, typo Base One/Inter).
- **Fonts :** Base One (Regular/Bold/Heavy, display uniquement) + Inter — self-hosted (`DA-explorations/fonts/base-one/`).

---

## 4. Pré-requis / points à débloquer

- [ ] **Assets visuels** : vidéos/photos in-store en magasin (hero + expériences + section signature). Aujourd'hui = placeholders « fenêtre sombre ». → à fournir.
- [ ] **Cas clients réels** : logos + chiffres réels (actuels = illustratifs).
- [ ] **GSAP MCP** (`@vinhnguyen/gsap-mcp`) & **Magic MCP** (clé 21st.dev) non actifs → on peut coder à la main sans eux.
- [ ] **Langue** : copy actuelle en anglais (explorations DA). Confirmer FR / EN / bilingue.
- [ ] **Périmètre** : cette landing = page d'accueil. Le PRD prévoit un site multi-pages (platform, pricing, cas). Confirmer qu'on ne fait que la home pour l'instant.

---

## 5. Prochaine étape proposée

1. Valider ce blueprint (structure + ordre des sections).
2. Init du projet Next.js + Tailwind + tokens Graphite Chrome + fonts.
3. Coder section par section en commençant par le **hero** (avec GSAP + fenêtre sombre placeholder), vérif screenshot 1440 + 390, puis dérouler.
