# Justin Laing — Portfolio

A static portfolio site (plain HTML, CSS, and JavaScript — no build step, no framework).

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site (single page). |
| `styles.css` | All styling, including dark mode and print styles. |
| `script.js` | Mobile nav, experience filter, contact form enhancement. |
| `resume.pdf` | Downloadable résumé (linked from the Experience section). |
| `images/` | Project screenshots. |

## Before you deploy — checklist

1. **Contact form** — in `index.html`, find `action="https://formspree.io/f/YOUR_ID"` and replace `YOUR_ID` with your real Formspree form ID (sign up free at formspree.io).
2. **App screenshots** — replace the placeholders `images/budget-app.png` and `images/baby-app.png` with real screenshots (roughly 640×400).
3. **Live demo / write-up links** — in the "Apps I've built with AI" section, point the `href="#"` links at real URLs.

## Deploy with Cloudflare Pages

Cloudflare Pages serves this static site directly — **no build command and no output configuration are required.**

### Step 1 — Put the code on GitHub
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect Cloudflare Pages
1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and select your `portfolio` repo.
3. In the build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`  (the repo root — that's where `index.html` lives)
4. Click **Save and Deploy**.

Cloudflare gives you a free `*.pages.dev` URL within a minute or two. Every future `git push` to `main` redeploys automatically.

### Step 3 (optional) — Custom domain
In your Pages project → **Custom domains** → add e.g. `justinlaing.com`. Cloudflare provisions HTTPS automatically. If the domain is registered with Cloudflare, DNS is one click; otherwise point a CNAME as instructed.

## Updating the site later

Edit the files, then:
```bash
git add .
git commit -m "Describe what changed"
git push
```
Cloudflare redeploys on push. No other steps.

## Notes

- Dark mode follows the visitor's system setting automatically.
- The résumé is also printable directly from the browser (Print → Save as PDF) thanks to the print stylesheet, which strips the nav, forms, and buttons.
