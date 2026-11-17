# Vortex Bank

A responsive banking web app front end: landing page, sign-up/log-in, account overview, transfers, card controls and spending insights.

> **Demo only.** Data is stored in the browser (`localStorage`) and password hashing is client-side. This is not real security. Do not enter real credentials or financial details.

## Features
- Landing page with animated vortex hero
- Sign-up and log-in with validation and SHA-256 password hashing (Web Crypto)
- Overview with balances and searchable, filterable transactions
- Send money between own accounts or to a payee, with balance checks
- Card page with freeze/unfreeze and show/hide number
- Spending insights by category
- Light/dark theme, mobile-friendly, respects reduced motion

## Run locally
No build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy with GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## Project structure
```
index.html      page shell
css/styles.css  theme tokens and styles
js/app.js       routing, auth, and page logic
```

## Roadmap
- [ ] Django + Django REST Framework API with secure authentication (JWT or sessions)
- [ ] PostgreSQL replacing browser storage
- [ ] React + TypeScript front end
- [ ] Docker and GitHub Actions CI
- [ ] Analytics dashboards (Pandas, Power BI)
- [ ] Security hardening and monitoring (OWASP ZAP, Burp Suite, Wazuh)

## Licence
MIT
