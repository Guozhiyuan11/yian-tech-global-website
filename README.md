# YIAN Main Web

Standalone Astro prototype for the steel-related business homepage of YIAN Tech Global.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Asset workflow

The supplied 01–40 image set is imported as optimised WebP files under `public/media/inventory/`. Its product classification, process, confidence and notes are preserved in `src/data/source-images.json`; the image slots used on the homepage are selected in `src/data/media-manifest.ts`.

`scripts/import_product_media.py` rebuilds the web inventory from the recovered originals and the approved CSV metadata. After changing a selection, verify desktop and mobile crops against `docs/image-replacement-checklist.md`.

## Current boundary

- The inquiry form is a front-end prototype. It does not claim to submit data.
- Unverified capacities, certifications, factory ownership and performance figures are deliberately excluded.
- Supplied photographs are treated as portfolio and product evidence only; ownership, live stock and project participation remain subject to confirmation.
- The accent colour is a proposal and can be replaced with an approved brand colour through CSS design tokens.
