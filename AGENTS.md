# Sara Dunlop Website — Agent Context

This document gives AI assistants everything needed to work on this project. Read it before making changes.

---

## Project Overview

**Sara Dunlop** portfolio site for a writer/director: film, TV, commercials, music videos. Static HTML/CSS/JS, deployed on GitHub Pages.

- **Repo:** `https://github.com/saradunlop/dunlop`
- **Live site:** `https://saradunlop.github.io/dunlop/` (or custom domain)
- **Deployment:** GitHub Actions on push to `main`

---

## Site Structure

### Pages

| Page | Path | Purpose |
|------|------|---------|
| **Homepage** | `index.html` | Featured work grid |
| **Narrative** | `narrative/index.html` | Narrative projects |
| **Archive** | `archive/index.html` | Archived commercial work |
| **Info** | `info/index.html` | About/contact |

### Header navigation

- **NARRATIVE** → `/narrative/index.html`
- **ARCHIVE** → `/archive/index.html`
- **INFO** → `/info/index.html`

---

## Project order (critical)

### Homepage (8 projects)

1. Starling: Good With Money
2. NSPCC: A Dangerous Christmas
3. Apple: Welcome To The Club
4. McDonald's: Resilience
5. Nike: You Can't Stop Us
6. Expedia: The Young Explorers
7. Heinz: Tennis
8. Lilly: A Medicine Company

### Narrative (4 projects)

1. Dreamers
2. Dreamlands
3. Mr. Burberry: The Night Before
4. High

### Archive (12 projects)

1. TFL: The Tortoise & The Hare
2. Sky: Billboards
3. RMC: Family Stays
4. Instax: Giving Story
5. P&G: Always There
6. Levis: Beautiful Morning
7. Women's Aid: He's Coming Home
8. Barnardo's: Ballet/Gymnast
9. CTCP: Dark Balloons
10. Facebook: Neha/Sandeep/Sunny/Heena
11. McDonald's: It Must Be
12. Plan International: She'll Learn

---

## Navigation rule (essential)

**Prev/next on each project page must match the order of its parent page.**

- Parent = page where the project is listed (Homepage, Narrative, or Archive).
- The order shown in that list defines prev/next.
- Navigation is circular: last project → first, first project ← last.

Example: If Nike is 3rd on Homepage, then:
- **Prev** → 2nd project (Apple)
- **Next** → 4th project (Expedia)

When changing project order on any listing page:
1. Reorder the project tiles.
2. Update prev/next on every affected project page so it follows the new order.

Projects that appear on more than one page (e.g. Mr. Burberry on Narrative) use the order of the page they were accessed from. We pick one canonical order (Narrative in this case).

---

## File structure

```
/
├── index.html              # Homepage
├── styles.css              # Global styles
├── scripts.js              # Theme, scroll, video hover
├── components/
│   └── header.html         # Shared header (loaded via data-component)
├── scripts/
│   └── include-components.js
├── images/
│   ├── commercial/{client}/thumbnail.{jpg,png}
│   └── narrative/{project}/thumbnail.{jpg,png}
├── narrative/
│   ├── index.html
│   └── {project}.html
├── archive/
│   └── index.html
├── commercial/             # All project pages live here
│   └── {project-slug}.html
└── info/
    └── index.html
```

Project pages live in `commercial/` even when listed on Narrative (e.g. Mr. Burberry: The Night Before → `commercial/night-before.html`).

---

## Path conventions

- **Index:** `./` for root assets, `./commercial/`, `./narrative/`
- **Narrative/Archive:** `../` for root assets, `../commercial/`, `./` for same folder
- **Commercial:** `../` for root, `./` for other commercial pages
- **Header component:** `data-component="/components/header.html"` (absolute)
- **CSS/JS:** Relative to page (`./styles.css`, `../styles.css`)

---

## Thumbnails

- **Path:** `images/commercial/{client-folder}/thumbnail.png` or `.jpg`
- **Aspect ratio:** 16:9 (avoids grey bars; use `object-fit: cover` and `object-position: center`)
- **Naming:** Match client/project (e.g. `nspcc/`, `mcdonalds/`, `rmc/`)
- **Do not** reuse the same image for different projects (e.g. McDonald's and RMC).

---

## Project page template

```html
<article class="project-detail">
    <div class="project-hero video" data-scroll>
        <div style="padding:56.25% 0 0 0;position:relative;">
            <iframe src="https://player.vimeo.com/video/{VIDEO_ID}?title=0&byline=0&portrait=0" 
                    style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
</article>
<nav class="project-navigation" data-scroll>
    <a href="./prev-project.html" class="prev-project">← Prev Title</a>
    <a href="./next-project.html" class="next-project">Next Title →</a>
</nav>
```

For placeholders (content coming soon): use `project-hero coming-soon` instead of `project-hero video`, with `<p>Content coming soon</p>` inside.

---

## GitHub Pages workflow

1. **Deploy:** Every push to `main` triggers `.github/workflows/pages.yml`.
2. **Artifact:** Entire repo root (`.`) is deployed.
3. **Branch:** Only `main` is used; `gh-pages` is not.

### Before major changes

- Create a backup branch, e.g. `git branch backup-YYYY-MM` and `git push origin backup-YYYY-MM`.

---

## Adding a new project

1. Create `commercial/{slug}.html` (or `narrative/{slug}.html` if narrative-only).
2. Add thumbnail to `images/commercial/{client}/thumbnail.png` (or `.jpg`).
3. Add to the right listing page (Homepage, Narrative, or Archive) in the desired position.
4. Set prev/next on the new project page to match parent order.
5. Update prev/next on the previous and next project pages in that list.

---

## Reordering projects

1. Change the order in the listing page.
2. Update prev/next on every affected project page.
3. Ensure first and last wrap correctly.

---

## Tech stack

- **Build:** None — static HTML
- **Components:** `include-components.js` fetches HTML via `data-component`
- **Styles:** `styles.css` with light/dark themes (CSS variables)
- **Features:** Theme toggle (localStorage), scroll animations (`data-scroll`), video hover play on grid

---

## Important details

- **Women's Aid:** Title is "He's Coming Home", not "World Cup".
- **McDonald's (two distinct projects):** "Resilience" (Homepage, `commercial/mcdonalds-resilience.html`, `images/commercial/mcdonalds-resilience/`) and "It Must Be" (Archive, `commercial/it-must-be.html`, `images/commercial/mcdonalds/`). Do not merge or confuse these — separate slugs and image folders on purpose.
- **Mr. Burberry:** Narrative page; project file is `commercial/night-before.html`.
- **Barnardo's:** Spelling (not "Barbardo's").
- **Vimeo thumbnails:** Can be fetched from `https://vimeo.com/api/oembed.json?url=https://vimeo.com/{VIDEO_ID}` if needed.
- **components.html** in root is empty and unused.
