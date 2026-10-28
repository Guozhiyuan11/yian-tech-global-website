# YIAN Main Web

Standalone Astro prototype for the steel and sandstone business homepage of YIAN Tech Global.

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

## Production deployment

The existing public website is [yian-tech-global-website.pages.dev](https://yian-tech-global-website.pages.dev/), hosted by the Cloudflare Pages project `yian-tech-global-website`. This is the existing destination for website updates; do not create a replacement hosting project or use a localhost URL as the published result.

This directory is its own Git repository, [Guozhiyuan11/yian-tech-global-website](https://github.com/Guozhiyuan11/yian-tech-global-website). Cloudflare builds pushes to the production `main` branch with `npm run build`, using `dist` as the output directory. Verify the resulting Cloudflare Pages check and the public page after publishing. The outer workspace repository is the separate railway website.

Sandstone pages: [English](https://yian-tech-global-website.pages.dev/sandstone/) and [Español](https://yian-tech-global-website.pages.dev/es/sandstone/).

## Asset workflow

The sandstone section appears on both homepages and has dedicated `/sandstone/` and `/es/sandstone/` pages. On 2026-10-28, the supplied sandstone archive was audited: 1,854 readable images in 13 folders, with 1,708 unique image files. The site uses 24 reviewed photographs, covering 10 colour/texture references, custom profiles, carving, shaped pieces and an architectural reference. Responsive WebP copies live in `public/media/sandstone/`; the original archive contents and contact sheets remain in the ignored `.source-review/sandstone-20261028/` directory.

The selected photographs and their original-file mapping are documented in `docs/sandstone-photo-selection.json` and `docs/sandstone-media-sources.json`. Run `scripts/prepare_sandstone_media.py` with the bundled Pillow runtime to regenerate the website copies from the retained originals. `src/data/sandstone.ts` supplies the bilingual media and enquiry helpers. The colour viewer supports keyboard navigation and opens the relevant colour enquiry with both existing sales recipients. The 40 existing inventory images continue to represent steel only.

The supplied 01–40 image set is imported as optimised WebP files under `public/media/inventory/`. Its product classification, process, confidence and notes are preserved in `src/data/source-images.json`; the image slots used on the homepage are selected in `src/data/media-manifest.ts`.

`scripts/import_product_media.py` rebuilds the web inventory from the recovered originals and the approved CSV metadata. After changing a selection, verify desktop and mobile crops against `docs/image-replacement-checklist.md`.

## Current boundary

- Sales email addresses are configured in `src/data/site.ts`: `z.yuan.guo@yiantechglobal.com` and `s.uribe.camus@yiantechglobal.com`. The footer and contact section offer a separate link for each address. Quote, product enquiry and custom fabrication buttons open the visitor's email app with both recipients, while keeping the existing localised subject (including the product name for product enquiries).

- The inquiry form is a front-end prototype. It does not claim to submit data.
- Unverified capacities, certifications, factory ownership and performance figures are deliberately excluded.
- Supplied photographs are treated as portfolio and product evidence only; ownership, live stock and project participation remain subject to confirmation.
- The accent colour is a proposal and can be replaced with an approved brand colour through CSS design tokens.
