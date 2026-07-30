---
name: treeosk-frontend
description: Use for ANY Treeosk website frontend/UI/design task — building, reworking, or styling pages, sections, components, layouts, hero, navigation, cards, forms, or CTAs for the Treeosk site. Enforces the LOCKED "Chrome × Cinéma" (warm) design system — chrome tiède champagne + chaleur cinéma tungstène (sépia/tobacco), base claire, immersive dark visuals (encre #110E06), blue-screen accent RARE (≤5%, screens only), Base One + Inter typography, base-4 spacing, sharp radius, ratio 65/25/5/5 — and routes each sub-task to the right design skill + MCP (21st.dev Magic, Figma, frontend-design, ui-ux-pro-max, bencium-controlled-ux-designer, accesslint-audit). Trigger on: "site treeosk", "refonte", "hero", "section", "composant", "expérience", "photobooth", "landing", "maquette en code".
---

# Treeosk — Frontend & Design

Skill d'orchestration pour la refonte du **site Treeosk**. Elle verrouille la direction
artistique et, pour chaque sous-tâche, t'oblige à passer par le bon skill / MCP au lieu
d'improviser des styles.

## Brief employeur (l'étoile polaire)

- **Objectif** : positionner Treeosk comme **créateur d'expériences événementiel & retail premium**, **pas** comme un simple fournisseur de matériel.
- **Le grand changement = prioriser les EXPÉRIENCES phares** : photobooth, gravure personnalisée, gaming, diffuseurs de parfum, bornes interactives & hôtesse virtuelle, animations sur mesure.
- **Mise en avant** : grands visuels immersifs, mises en situation en magasin, approche orientée expérience client.
- **Univers graphique** : moderne, premium, **épuré**, codes du **luxe & de la cosmétique**.
- **Message immédiat** : on aide les marques à **attirer · engager · convertir** via des expériences mémorables.
- **Forme** : **peu de texte, beaucoup d'impact visuel**, animations fluides, navigation simple et intuitive.

## Direction artistique — Chrome × Cinéma (CHAUDE, verrouillée 2026-07-02)

Ratio d'usage **Chrome 65 / chaleur cinéma 25 / bleu écran 5 / encre 5**. Palette tiède, jamais froide.

- **Chrome tiède champagne** + **chaleur cinéma tungstène** (sépia `#563C22`, tobacco `#37200D`). Base **claire** tiède (`#FCFCFA`).
- Les **grands visuels immersifs** sont des **fenêtres sombres** (encre `#110E06`) sur le canvas clair.
- **Chrome** = signature premium, en gradient tiède, réservé aux accents (CTA phare, filets, logo) — **jamais un aplat plein de section**.
- **5 règles d'or** : 1) chrome **jamais froid** (toujours tiède) · 2) le sépia vient d'une **lumière tungstène**, jamais un aplat · 3) le **bleu écran `#8EA3C6` est un régulateur** — uniquement scènes à écran (hero/gaming/kiosk), **≤ 5%**, jamais ailleurs · 4) **un seul accent chaud** visible par écran plié · 5) **pas de bloc plein coloré**.
- **Interdit** : pas de **vert/kaki**, pas de violet/rose, pas de bleu hors « écran » (règle 3). Le seul signal couleur d'état autorisé = `state/error #B23B3B` (formulaires).
- Le Figma actuel est **desktop-only** → le **mobile est à produire** (390 + 1440 en priorité).
- **Source de vérité tokens = `web/src/app/globals.css`** (bloc `@theme`). Docs foundations : **`../REFONT SITE TREEOSK/TREEOSK-FOUNDATIONS.md`** + [references/design-tokens.md](references/design-tokens.md). ⚠️ Les anciennes maquettes DA en cream+vert **et** l'ancienne « Graphite Chrome » froide sont **périmées** → re-skinner en Chrome × Cinéma chaud.

## RÈGLE 0 — Avant de coder

1. **Nouvelle feature / section / page ?** → lance d'abord `superpowers:brainstorming` (intention, contenu réel, hiérarchie des expériences) avant toute ligne de code.
2. **Toujours** relire les tokens : [references/design-tokens.md](references/design-tokens.md). N'invente pas de couleur / taille / radius : prends un token existant.
3. Choisis l'outil adapté à la sous-tâche : [references/tooling.md](references/tooling.md).

## Le design system en 10 secondes

Détail complet → [references/design-tokens.md](references/design-tokens.md). L'essentiel :

- **Couleurs** — canvas `#FCFCFA` (crème tiède) · surfaces `#FFFFFF` · section alternée `#D9DCDC` · texte fort `#110E06` (body chaud `#3D3A35`, subtle `#635751`) · visuels immersifs `#110E06` texte `#FCFCFA` · hairlines `#BAB5B1` · accents cinéma sépia `#563C22` / tobacco `#37200D` · bleu écran `#8EA3C6` (rare, écrans only) · **chrome tiède** `linear-gradient(145deg,#efe9e1,#cabfb2,#9c9187,#e6ded3)`.
- **Typo** (inchangée) — titres **Base One** (Heavy 900 hero, Bold 700 H1–H2) · **body/UI = Inter** (400/500/600). ⚠️ Base One = **display uniquement**.
- **Spacing** — base 4 : `4 8 12 16 24 32 48 64 80 112`. Section padding-Y **112 / 56**. Container **1248**, grille 12 col / gap 24.
- **Radius** — sharp = luxe : `xs 4 · sm 8 · md 12 (cartes) · lg 20 · pill 999 (CTA)`.
- **Ombres** — subtiles (`rgba(11,11,12,…)`), on s'appuie sur les **hairlines chrome**.
- **Boutons** — Primary encre `#110E06`/canvas · **Chrome** (gradient tiède, 1 par vue max, moments premium) · Secondary blanc + bord 1px `#BAB5B1` · On-dark bord chrome · Ghost/Link souligné. Sépia = accent texte, jamais un fond de bouton.

## Workflow type (une section / un composant)

```
1. Brainstorm (si nouveau)      → superpowers:brainstorming  (quelle expérience ? quel visuel immersif ?)
2. Direction visuelle           → frontend-design  (luxe/cosmétique, éviter le "templated default")
3. Contexte design réel         → Figma MCP + figma:figma-* (get_design_context / get_screenshot)
4. Génération du composant       → 21st.dev Magic MCP (mcp__magic__21st_magic_component_builder)
5. Détail UI/UX + code final     → ui-ux-pro-max (patterns, états, responsive)  |  bencium pour décisions fines
6. Passe tokens Chrome × Cinéma  → remplacer tout hex brut par les tokens (chaud, chrome tiède en accent)
7. Vérif rendu                   → Playwright MCP (screenshot 1440 + 390)
8. Vérif accessibilité           → accesslint-audit  (contraste texte, focus, alt, WCAG 2.2)
```

Chaque `mcp__magic__*` génère du React/Tailwind générique → **repasse toujours l'étape 6** pour réinjecter Chrome × Cinéma (palette chaude, chrome tiède, Base One/Inter, radius, spacing) : le Magic ne connaît pas la DA.

## Checklist de sortie (avant de dire "c'est fait")

- [ ] **Palette chaude respectée** (ratio ~65/25/5/5) : chrome tiède + sépia/tobacco. Aucun vert/kaki, violet/rose ; **bleu écran ≤ 5% et sur écran uniquement** (seul autre signal : rouge erreur form).
- [ ] Chrome **jamais froid** · sépia = lumière tungstène jamais un aplat · un seul accent chaud par écran plié.
- [ ] Chrome utilisé en accent/gradient, pas en aplat plein de section (≤ 1 CTA chrome par vue).
- [ ] Une **expérience** est clairement mise en avant, en **grand visuel immersif** (peu de texte).
- [ ] Titres en Base One, tout le texte courant en Inter.
- [ ] Spacing/paddings sur l'échelle base-4, section 112/56 · radius selon l'échelle (cartes 12, CTA pill).
- [ ] Rendu vérifié en screenshot **desktop 1440 + mobile 390**.
- [ ] Contraste texte/fond OK (WCAG AA), y compris texte clair sur fenêtres sombres — vérifié via accesslint-audit.

## Notes tooling

- Le MCP **21st.dev Magic** est déclaré dans `.mcp.json` à la racine du projet. Remplacer `REMPLACE_PAR_TA_CLE_21ST_DEV` par une vraie clé (https://21st.dev/magic/console) puis relancer Claude Code pour que les tools `mcp__magic__*` apparaissent.
- Les MCP **figma / adobe-photoshop / adobe-illustrator / affinity** sont déjà configurés globalement.
- Les skills design (`frontend-design`, `ui-ux-pro-max`, `bencium-controlled-ux-designer`, `accesslint-audit`, `figma:*`) sont déjà disponibles — cette skill dit **quand** les appeler.
