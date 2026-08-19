# TREEOSK DESIGN SITE

Espac de travail de la **refonte du site Treeosk** — positionner Treeosk comme **créateur d'expériences retail & événementiel premium** (luxe & cosmétique), pas fournisseur de matériel. Voir [reference/brief-employeur.md](reference/brief-employeur.md).

## Direction artistique — Chrome × Cinéma (CHAUDE, verrouillée)
Chrome tiède champagne + chaleur cinéma tungstène (sépia/tobacco), base claire, grands visuels immersifs en « fenêtres sombres ». Ratio **65/25/5/5** · chrome jamais froid · bleu écran ≤5% (écrans only). Typo **Base One + Inter** (inchangée).
- **Source de vérité tokens** : `web/src/app/globals.css` (bloc `@theme`)
- Foundations complètes : `../REFONT SITE TREEOSK/TREEOSK-FOUNDATIONS.md` (v1.0)
- Tokens embarqués (skill) : [.claude/skills/treeosk-frontend/references/design-tokens.md](.claude/skills/treeosk-frontend/references/design-tokens.md)

## Structure
| Élément | Rôle |
|---|---|
| `.claude/skills/treeosk-frontend/` | Skill projet : DA Chrome × Cinéma (chaude) + routage outils design/front |
| `.claude/skills/bmad-*` | 46 skills BMAD (agents PM/Architect/UX/Dev, PRD, workflows) |
| `.mcp.json` | MCP 21st.dev Magic (conception front) — **clé à renseigner** |
| `brand/` | Direction artistique (nuancier, tokens) |
| `reference/` | Brief employeur, notes |
| `_bmad/` | Cœur BMAD (config, modules, agents) |
| `_bmad-output/` | Artefacts BMAD (planning / implementation) |
| `docs/` | Connaissance projet (BMAD) |

## Outils
- **Skills design** (auto) : `treeosk-frontend`, `frontend-design`, `ui-ux-pro-max`, `bencium-controlled-ux-designer`, `accesslint-audit`, `figma:*`
- **BMAD** : invoquer `bmad-help` pour démarrer (PRD → architecture → stories → dev)
- **MCP** : magic (21st.dev), figma, playwright, adobe-*

## À faire
- [ ] Renseigner la clé API 21st.dev dans `.mcp.json` (https://21st.dev/magic/console)
- [ ] **Rouvrir ce dossier dans l'éditeur** (l'ancien dossier à espace final a été supprimé)
- [ ] Installer `uv` si besoin (certains workflows BMAD tournent via `uv run`)
- [ ] Architecture d'info du site (expériences-first) + maquettes Chrome × Cinéma (1440 + 390)
