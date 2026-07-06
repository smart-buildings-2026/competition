# Smart Buildings Competition 2026 — website

A static site (plain HTML/CSS/JS, no build step) for the NeurIPS 2026 Smart
Buildings Competition. Ready to host on GitHub Pages.

## Pages
- `index.html` — About / landing (hero, mission, key-dates timeline)
- `competition.html` — Overview · Building components · Observation & action spaces · Reward function
- `rules.html` — Rules
- `submission.html` — Submission format (with a live code block)
- `scoring.html` — Scoring methodology (standings themselves live on Kaggle)
- `organizers.html` — Committee + acknowledgments

## Preview locally
Open `index.html` in a browser, or (recommended, matches how GitHub Pages
serves it) run a tiny local server from the folder:

```bash
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a repo (e.g. `smart-buildings-2026`) and copy everything in this
   `site/` folder into the repo root.
2. Commit and push.
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, pick `main` and `/ (root)`, save.
4. The site goes live at `https://<user-or-org>.github.io/<repo>/` within a
   minute or two.

To use a bare `https://<user>.github.io/` URL instead, name the repo
`<user>.github.io`.

## Things you'll want to edit

**Kaggle link (one place).** Open `assets/js/site.js` and change `KAGGLE_URL`
at the top. This updates the "Join on Kaggle" button in the header and footer
everywhere. (The two large "Join on Kaggle" buttons on the home and submission
pages are plain links in those HTML files.)

**Navigation (one place).** The header and footer are injected by
`assets/js/site.js` from the `PAGES` array — edit labels/links there once and
every page updates.

**Leaderboard.** Standings are hosted on Kaggle — the site does not display them.
`scoring.html` explains the metric and links out to the Kaggle leaderboard. If
you ever want to show standings on the site, an `<iframe>` of the Kaggle
leaderboard is the simplest route.

**Reference code.** The Python example on `submission.html` is a real code block
(highlighted by highlight.js from a CDN). Edit it directly in the HTML inside the
`<pre><code class="language-python">…</code></pre>` block.

## Images
All figures are in `assets/images/`. `building_0000_layout.png` was rendered
from the source PDF. Swap any file in place (keep the filename) to update a
figure.

## Notes
- Fonts (Fraunces / Inter / IBM Plex Mono) and the equation renderer (MathJax)
  load from public CDNs, so they appear once the site is online. Equations are
  written as LaTeX in the HTML.
- No cookies, no tracking, no server code. Accessible: keyboard focus, reduced-
  motion support, responsive down to mobile.
