# Scénario de navigation — Treeosk landing (Full Chrome v2)

> Le **storyboard scroll** de toute la page : quel asset/vidéo joue à quel moment, quelle animation, quelle transition, quoi est cliquable.
> À exécuter **au code** avec **GSAP + ScrollTrigger + Lenis** (+ SplitText, DrawSVG). DA : `docs/direction-artistique-v2-fullchrome.md`.
> Assets : `assets/generated/` (images) → vidéos Weave dans `web/public/media/`. Chorégraphie de motion : `docs/weave-shot-sheet-v2-fullchrome.md`.

## Modèle de navigation (global)
- **Smooth scroll Lenis** partout · header → **scroll-to** (GSAP) vers chaque section.
- **Chaque asset est cliquable** = une porte d'entrée : un produit → sa section/expérience. Principe unique du site.
- **Overlay grain** (`section-noise.mp4`) constant, très léger, sur toute la page → signature argentique.
- **UN seul moment nuit** dans toute la page (section signature). Sa rareté fait le poids.
- **Réduire animations** respecté (`prefers-reduced-motion` → posters fixes, pas de pin).

---

## Le scroll, séquence par séquence

| # | Section | Fond (vidéo/asset) | Contenu | Motion GSAP | Cliquable | Transition → suivante |
|---|---|---|---|---|---|---|
| 0 | **Intro (option)** | `liquid-metal-forms.mp4` | Logo Treeosk | Reveal logo (fade/scale), le chrome coule | — | Le liquide se calme → hero |
| 1 | **HERO interactif** | `liquid-metal-forms.mp4` (subtil, derrière) | Titre géant + **6 produits qui poppent** | Titre SplitText → **pop staggered** des 6 tuiles (scale+fade, une après l'autre) | ✅ **chaque produit → scroll vers son expérience** | **Chrome-ribbon wipe** (`chrome-ribbon.mp4`) balaie l'écran |
| 2 | **EXPÉRIENCES** | `section` clair `#E5E6E6` | 6 cartes produits (grande grille) | Reveal stagger au scroll ; **hover = cross-fade vidéo hero→detail + zoom** | ✅ carte → détail/section | Filet `glint-streak.mp4` animé |
| 3 | **HOW IT WORKS** | `brushed-panel.mp4` (texture douce) | 01 · 02 · 03 | Ligne **DrawSVG** qui se trace ; numéraux qui montent | — | Fondu vers alternée |
| 4 | **CAS / MÉTRIQUES** | `section` `#E5E6E6` | 3 cas + chiffres | **Compteurs** animés (0→valeur) à l'entrée | ✅ « view case » | Assombrissement progressif → nuit |
| 5 | **SIGNATURE (NUIT)** ★ | `monolith-1.mp4` **plein écran** `#141418` | Grande phrase de marque | **Section pinnée** ; le balayage de lumière du monolithe **synchronisé au scroll** (scroll-video) ; texte révélé ligne par ligne | — | Sortie de pin → remonte en clair |
| 6 | **CTA final** | `brushed-cylinder.mp4` (discret) | « Book a demo » | Reveal simple | ✅ CTA | — |
| 7 | **FOOTER** | `#141418` + `chrome-sphere.mp4` (accent coin) | Nav secondaire, mentions | Fade | ✅ liens | — |

★ = le **seul** moment nuit de la page.

---

## Le HERO interactif (le cœur de ta demande)
**Idée :** les produits **poppent l'un après l'autre** au chargement, puis **chacun est cliquable** (→ son expérience). Le « pop » et le clic = **code GSAP**, la boucle vidéo **dans** chaque tuile = Weave.

**Chorégraphie (au load) :**
1. Fond `liquid-metal-forms.mp4` en place (opacité basse, immersif).
2. Overline + **titre géant** (Base One/Neue Haas) → reveal SplitText par lignes.
3. **Les 6 tuiles produits poppent en cascade** (stagger ~0.12s) : `scale 0.9→1 + fade + léger blur→net`. Chaque tuile = une **boucle vidéo** du produit (`photobooth.mp4`, `engraving.mp4`, …).
4. Sous-titre + CTA arrivent en dernier.

**Interaction :**
- **Hover tuile** : la vidéo passe en avant (scale + luminosité), les autres reculent (dim). Le nom du produit apparaît.
- **Clic tuile** : **scroll-to** vers la section Expériences ancrée sur ce produit (ou ouverture d'un détail). Même logique pour **tout** asset cliquable du site.
- Option : **auto-cycle** — une tuile se met en avant à tour de rôle toutes ~3s tant que l'user n'interagit pas.

**Disposition (à choisir au code) :** grille 6 (2×3 ou 3×2) OU une tuile « focus » large + 5 vignettes qui poppent. On tranchera en maquette.

---

## Système de transitions (outils)
- **Lenis** : smooth scroll → base de toute la synchro ScrollTrigger.
- **ScrollTrigger** : reveals, pin (section nuit), scrub (scroll-video du monolithe).
- **SplitText** : titres (hero, section titres) par lignes/mots.
- **Cross-fade vidéo** : hover cartes (hero↔detail) + fonds entre sections (une vidéo fond fond dans la suivante).
- **Chrome-ribbon / glint** : **dividers animés** entre sections (wipe métallique) — remplacent les traits statiques.
- **DrawSVG** : ligne du « how it works ».
- **Compteurs** : cas clients.
- **Grain** (`section-noise.mp4`) : overlay `mix-blend` léger, constant.

## Récap — quel asset joue où
| Asset / vidéo | Rôle dans le scénario |
|---|---|
| `liquid-metal-forms` | Fond **hero** (immersif subtil) |
| `photobooth/engraving/gaming/scent/kiosk-hostess/custom` (.mp4) | **Tuiles hero** + **cartes Expériences** (hero) |
| `*-detail` (.mp4) | **Hover** des cartes |
| `chrome-ribbon` | **Wipe** hero→expériences |
| `glint-streak` | **Divider** entre sections |
| `brushed-panel` / `brushed-cylinder` | Fonds doux (how it works, CTA) |
| `monolith-1` | **Section nuit** pinnée (scroll-video) |
| `liquid-chrome-landscape` | Fond de section alterné (option) |
| `chrome-sphere` | Accent footer |
| `section-noise` | **Overlay grain** global |
| `kiosk-hostess-face` | Second plan / hover kiosk |

---

## Ce qu'on fera au code (rappel, pas maintenant)
Re-pilote greyscale (tokens + typo) → composant `HeroInteractive` (pop + clic) → `ImmersiveMedia` en `<video>` pour cartes → ScrollTrigger par section → section nuit pinnée → dividers ribbon/glint → overlay grain. Tout branché sur les `.mp4` déposés (chemins : `docs/weave-shot-sheet-v2-fullchrome.md`).
