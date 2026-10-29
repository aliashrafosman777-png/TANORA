# TANORA — Heritage in Motion

A responsive Next.js App Router website based on the supplied Artboard 4, TANORA identity PDF, Franklin Gothic fonts, dancer cutout, and footer artwork.

## Run locally

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js. The development server binds to `127.0.0.1`.

## Production

```sh
npm run typecheck
npm run build
```

The static site is exported to `out/`. Source, fonts, and all required website images are included in this repository. Dependencies and generated build output are excluded from Git and recreated during installation/build.

## Deploy on Vercel

1. Import `aliashrafosman777-png/TANORA` from GitHub.
2. Use the `main` branch and the repository root (`./`).
3. Select the **Next.js** framework preset. Keep the default install, build, and output settings; `npm run build` creates the static export.
4. Deploy. No database, API keys, or required environment variables are needed for this edition.

Social metadata uses Vercel's production/deployment hostname automatically. If using a custom domain, optionally set `SITE_URL` to its complete HTTPS origin and redeploy. Local development falls back to `http://localhost:3000`.

Reference: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) and [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

## Included

- Responsive hero with independently layered generated backdrop, gold linework, and supplied 2D dancer PNG derivative.
- Three experience panels with keyboard-accessible detail dialogs.
- Brand story and campaign composition.
- Filterable six-image gallery with previous/next, arrow-key navigation, Escape, and focus restoration.
- Responsive native-dialog mobile navigation.
- Supplied footer artwork, optimized local fonts and images, metadata, a custom 404, and reduced-motion behavior.

No 3D model is loaded. This edition has no event inventory, booking, payment, contact submission, accounts, or invented venue details. These require real business information before implementation.

See `docs/VALIDATION.md` for completed checks and the remaining browser-testing limitation. Vercel deployment is managed separately from this source upload.

## Assets

See `docs/ASSETS.md` for supplied-asset provenance and `docs/HERO-ARTWORK.md` for the generated background prompt. Optimized WebP derivatives are in `public/images/`. `npm run assets` rebuilds them from the copied source files; it never writes to the original project references.

Fonts are defined in `src/app/layout.tsx`. Colors and responsive composition are in `src/app/globals.css`. Content and interaction logic are in `src/components/tanora.tsx`.
