# Nozomi Consulting

A responsive, one-page static consultancy website, with a photo-referenced Nozomi mascot, light animation, a tiny terminal, and a snack-powered CEO.

## Preview

Run `python3 -m http.server 8080` in this directory and open http://localhost:8080. No build step or package installation is needed.

## GitHub Pages

The included workflow deploys the static site on pushes to `main`. Set **Settings → Pages → Source** to **GitHub Actions**. The public address will be https://chrisft25.github.io/nozomi-website/ .

## Editing

Content and contact links are in `index.html`, appearance in `styles.css`, and motion and interactions in `script.js`. Illustrations are in `assets/`. Contact currently uses Christopher’s email from his connected GitHub profile.

Motion respects `prefers-reduced-motion`; the navigation works on mobile and with a keyboard. With JavaScript disabled, all page content and contact links remain available.

The company names describe Christopher’s engineering background and do not claim endorsements. No invented performance metrics are used.
