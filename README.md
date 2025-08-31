# Guru Nanak Traders

A clean, mobile-friendly static website for **Guru Nanak Traders**. Built with plain HTML/CSS/JS and ready for **GitHub Pages**.

## Quick Start (VS Code)

1. Open the folder in VS Code.
2. Install the "Live Server" extension (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server** (or use any local HTTP server).
4. Edit `data/products.json` to manage products. Images live in `assets/images/products/`.

> If product cards don’t load when opening via `file:///`, serve with Live Server so `fetch()` works.

## Git & GitHub Pages (auto-deploy)

1. Create a repo on GitHub (e.g., `guru-nanak-traders-site`).
2. In the folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. In GitHub **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Commit the workflow below (already included at `.github/workflows/deploy.yml`). On every push to `main`, it will publish to Pages at `https://USERNAME.github.io/REPO/`.

### Update later
- Edit files, commit, and push. The workflow redeploys automatically.
- Add new products to `data/products.json` (categories: `pesticide`, `fertilizer`, `seed`, `organic`).

## Structure
```
.
├─ index.html
├─ products.html
├─ about.html
├─ contact.html
├─ assets/
│  ├─ css/styles.css
│  ├─ js/main.js
│  └─ images/ (logo.svg, hero.svg, favicon.svg, products/*)
├─ data/products.json
├─ robots.txt
├─ sitemap.xml
└─ .github/workflows/deploy.yml
```

---

Made for a farmer-first business: **genuine supplies only**.
