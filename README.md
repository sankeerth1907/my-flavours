# MyFlavours — Premium Home-Style Food (Single-Page Site)

Static single-page website. No build step, no secrets. Just upload to Cloudflare Pages.

## Run locally
- Option 1: double-click `index.html`
- Option 2 (recommended): `npx serve "C:\Users\Admin\OneDrive\Desktop\my flavours"` → open http://localhost:3000

## Deploy — Cloudflare Pages
1. Push this folder to a Git repo (or drag-drop in Cloudflare Dashboard → Pages).
2. Settings:
   - **Framework preset:** None (static)
   - **Build command:** _(empty — no build)_
   - **Build output directory:** `/` (this folder root)
   - **Environment variables:** none required. Future backend URL lives in `app.js` → `window.__MYFLAVOURS_CONFIG__.backendEndpoint`.
3. Custom domain: Pages → Custom domains → add `www.myflavours.in` → add the CNAME Cloudflare shows at your DNS.
4. Caching: images are remote Unsplash CDN (already optimised with `w=` + `auto=format` + `loading="lazy"`).

## Future extension points (intentionally stubbed, not built)
- `menuCategories` in `app.js` → move to CMS/JSON; `price: null` reserved per item.
- `testimonials: []` → CMS slot in `#stories` section.
- Instagram grid → swap static `<figure>`s for API feed.
- Corporate form → set `backendEndpoint` to POST JSON + still opens WhatsApp.
- Analytics → `track(event)` stub in `app.js`; wire to GA/Meta.
- `localStorage "mf_loc"` holds selected location for checkout later.

## QA covered
Single page · anchor nav · hero mobile/desktop · reveals + parallax (disabled on `prefers-reduced-motion`) · menu tabs+search · dish modal · order modal → wa.me/916364533529 prefilled message · corporate + party forms → validation + WhatsApp · locations selectable · no fake prices/reviews/hours · alt text · keyboard/ARIA · lazy images.
