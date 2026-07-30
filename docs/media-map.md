# Carte de connexion des médias — Treeosk

> À quoi sert chaque photo, où elle vit sur le site, et quel fichier vidéo générer.
> Photos sources renommées dans `assets/generated/<catégorie>/`. Fichiers live dans `web/public/media/`.

## Comment lire
- **Source** = ta photo (dans `assets/generated/…`) — c'est CELLE que tu animes.
- **Emplacement site** = où elle s'affiche.
- **Fichier vidéo à produire** = dépose le `.mp4` généré ICI, exactement à ce chemin/nom → ça s'allume tout seul (poster déjà en place).
- **Statut vidéo** = ✅ à générer en priorité · ⏳ optionnel (peut rester en photo).

---

## 🎬 Vidéos à générer — PRIORITÉ (7)

| # | Emplacement site | Source (photo à animer) | Fichier vidéo à produire |
|---|---|---|---|
| 1 | **Hero** (grande fenêtre) | `scent/scent-hero-diffuser.png` | `web/public/media/hero/hero.mp4` |
| 2 | Carte **Photobooth** | `photobooth/photobooth-wide-context.png` | `web/public/media/experiences/photobooth.mp4` |
| 3 | Carte **Engraving** | `engraving/engraving-hero-station.png` | `web/public/media/experiences/engraving.mp4` |
| 4 | Carte **Gaming** | `gaming/gaming-hero-kiosk.png` | `web/public/media/experiences/gaming.mp4` |
| 5 | Carte **Scent** | `scent/scent-card-diffuser.png` | `web/public/media/experiences/scent.mp4` |
| 6 | Carte **Kiosk & hostess** | `kiosk-hostess/kiosk-hero-1.png` | `web/public/media/experiences/kiosk-hostess.mp4` |
| 7 | Carte **Bespoke / custom** | `custom/custom-hero-activation.png` | `web/public/media/experiences/custom.mp4` |

## 🖼️ Images de survol (hover) — restent en photo (vidéo ⏳ optionnelle plus tard)

| Carte | Source (survol) | Fichier live |
|---|---|---|
| Photobooth | `photobooth/photobooth-detail-panel.png` | `experiences/photobooth-detail.png` |
| Engraving | *(réutilise le hero)* | `experiences/engraving-detail.png` |
| Gaming | `gaming/gaming-detail-screen.png` | `experiences/gaming-detail.png` |
| Scent | `scent/scent-detail-mist.png` | `experiences/scent-detail.png` |
| Kiosk & hostess | `kiosk-hostess/kiosk-detail-1.png` | `experiences/kiosk-hostess-detail.png` |
| Bespoke | `custom/custom-wide-installation.png` | `experiences/custom-detail.png` |

---

## Règle de nommage (pour t'y retrouver)
- `…-hero-*` = plan produit principal (accroche / carte).
- `…-detail-*` / `…-macro-*` = gros plan matière (survol).
- `…-wide-*` = plan large contexte.
- `kiosk-hostess-portrait.png`, `people-*`, `chrome-texture-liquid.webp` = **non connectés** (réserve / mood / texture).
- `a-trier/untriaged-*.webp` = 2 fichiers à identifier ensemble.

## Poids à respecter (vidéo)
- **1080p minimum**, H.264 `.mp4`, **boucle propre (seamless)**, 8–10 s, < ~6 Mo si possible (je peux compresser).
- Pour chaque `.mp4`, garde aussi le **poster** (la photo source) — je m'en sers en fallback `reduced-motion`.

## Ce que je câble quand les `.mp4` arrivent
1. **Hero** : j'ajoute `videoSrc="/media/hero/hero.mp4"` → autoplay/muted/loop, poster automatique.
2. **Cartes** : je fais passer `ExperienceCard` en vidéo (même logique) pour les 6 posters.
3. Compression + vérif `reduced-motion`.
