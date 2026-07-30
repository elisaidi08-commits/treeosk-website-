# Treeosk — Stack design / frontend : quel outil pour quoi

Table de routage. Pour chaque sous-tâche, appelle l'outil indiqué au lieu d'improviser.

## Skills design (déjà disponibles)

| Skill | Quand l'appeler | Ce qu'il apporte |
|---|---|---|
| `superpowers:brainstorming` | **Avant** toute nouvelle section/page/feature | Cadre l'intention, le contenu réel, la hiérarchie — évite de coder dans le vide |
| `frontend-design` | Direction visuelle d'un écran neuf | Identité forte, typographie, éviter le rendu "template par défaut" |
| `ui-ux-pro-max` | Build UI détaillé + code | 50+ styles, palettes, patterns produit, états, responsive, multi-stack (React/Next/Tailwind/shadcn…) |
| `bencium-controlled-ux-designer` | Décisions visuelles fines, une à une | Guidage UX prudent (couleurs, typo, layout) — **demande avant de trancher** |
| `accesslint-audit` | Vérif finale d'une page/section | Audit WCAG 2.2 : contraste, focus, alt, ordre lecture — mode report ou fix |
| `figma:figma-use` | **Avant** tout `use_figma` (write) | Prérequis obligatoire pour écrire dans Figma via l'API plugin |
| `figma:figma-generate-design` | Pousser une page/section codée vers Figma | Traduction code → Figma avec le design system |
| `figma:figma-code-connect` | Mapper composants Figma ↔ composants code | Fichiers `.figma.ts` |
| `figma:figma-implement-motion` | Traduire une anim Figma en code | Motion → code prod |

## MCP servers

| MCP (tools) | Quand | Notes |
|---|---|---|
| **21st.dev Magic** — `mcp__magic__21st_magic_component_builder` | Générer un composant UI React/Tailwind à partir d'un prompt | Sortie **générique** → repasser la passe tokens Treeosk après |
| `mcp__magic__21st_magic_component_inspiration` | Chercher de l'inspi composants sur 21st.dev | Références de patterns |
| `mcp__magic__21st_magic_component_refiner` | Améliorer/raffiner un composant existant | Itération UI |
| `mcp__magic__logo_search` | Récupérer des logos de marques (SVG/JSX/TSX) | Utile pour la section "clients / cas" (L'Oréal, Givenchy…) |
| **Figma** — `mcp__plugin_figma_figma__get_design_context` | Lire specs/mesures depuis le Figma Treeosk | Source de vérité des écrans desktop |
| `mcp__plugin_figma_figma__get_screenshot` | Capturer un node du Figma | Comparer maquette vs code |
| `mcp__figma__view_node` / `add_figma_file` | Ouvrir/inspecter un node par URL | — |
| **Playwright** — `mcp__plugin_playwright_playwright__browser_navigate` + `browser_take_screenshot` | Vérifier le rendu réel du site en 1440 + 390 | Étape de vérif obligatoire |
| **Adobe PS / AI / Affinity** | Retouche/export d'assets image, logos, visuels | Déjà configurés globalement |

## Prérequis 21st.dev Magic

1. Générer une clé sur **https://21st.dev/magic/console**.
2. Dans `.mcp.json` (racine projet), remplacer `REMPLACE_PAR_TA_CLE_21ST_DEV` par la clé.
3. Redémarrer Claude Code (ou `/mcp` → reconnecter) → les tools `mcp__magic__*` apparaissent.
4. Vérifier avec `claude mcp list` ou `/mcp`.

## Rappel d'ordre (skill priority)

1. **Process d'abord** : brainstorming → (debugging si bug).
2. **Implémentation ensuite** : frontend-design / ui-ux-pro-max / Magic / Figma.
3. **Vérif toujours** : passe tokens → Playwright screenshot → accesslint-audit.
