# YIAN Steel Website Direction

## 1. Design objective

The site should position YIAN Tech Global as a calm, precise B2B partner for steel products, engineered components and international project coordination. It should not resemble a catalogue marketplace, a generic factory template or a consumer e-commerce site.

The first screen and the first few sections must answer five buyer questions:

1. What categories can YIAN discuss?
2. Which application contexts does the team understand?
3. Can processing and fabrication be coordinated?
4. Is there a clear route from requirement to delivery?
5. How does a buyer start a serious technical enquiry?

## 2. Reference observations

The design direction studies the principles visible in premium European industrial brands, especially the qualities the user identified in Alleima:

- large-scale industrial imagery;
- restrained modernist typography;
- short, declarative storytelling rather than dense catalogues;
- precise grids with deliberate whitespace;
- large type and image movement working as one system;
- a small number of featured product routes on the homepage;
- a transition from brand story to products, capabilities and application context.

This implementation uses those principles as a benchmark for quality. It does not claim that the reference site uses the same libraries or implementation technique.

## 3. What is original to YIAN

- A high-visibility acid-lime accent (`#d8ff45`) is proposed instead of copying Alleima orange.
- The central story is not a manufacturer claim. It is YIAN's route from technical requirement to product, processing, verification and delivery coordination.
- Product architecture combines stainless steel, railway/construction steel, engineered fabrication and processing/supply.
- Every image position is a semantic slot with traceable source references and a replacement checklist.
- The contact section describes exactly what should be included in a useful first enquiry.

## 4. What will not be copied

- Alleima logo, name, copy, photography, source code or exact layouts;
- proprietary typefaces, illustrations or brand devices;
- an exact recreation of its slide timing or navigation;
- statements that imply YIAN owns mills, factories, inventory or certifications unless verified;
- project images presented without clear attribution and source scope.

## 5. Information architecture

### Homepage sequence

1. Four-story cinematic hero
2. Buyer-facing positioning statement
3. Selected materials and products
4. Requirement-to-delivery capability story
5. Industry/application explorer
6. Four business routes and proof principles
7. Direct enquiry call to action

### Customer-facing groups

| Group | Scope | Homepage role |
| --- | --- | --- |
| Stainless Steel | Tube, pipe, coil and strip | Core product family |
| Rail & Construction Steel | Railway rail, profiles and reinforcement | Infrastructure route |
| Engineered Fabrication | Formed, welded and custom components | High-value capability |
| Processing & Supply | Technical confirmation, processing, inspection and delivery coordination | Trust and service route |

The homepage intentionally avoids exposing a long internal product taxonomy. Detailed grades, standards, dimensions, tolerances and documents should appear in focused product or enquiry flows after the facts are verified.

## 6. Supplied-image audit

The supplied Word inventory contains 40 original image payloads. Its stored ZIP checksums are invalid, but all 40 image payloads decode successfully. They were matched one-to-one against the numbered thumbnails and product rows in the supplied workbook, then re-encoded into valid WebP assets.

Current status:

- All 40 source records are preserved in `src/data/source-images.json`.
- Optimised website assets are stored under `public/media/inventory/`.
- Hero, featured-product, capability and industry slots now use selected supplied photographs.
- Source confidence and uncertainty notes remain preserved; medium-confidence interpretations are not promoted into specific end-use claims.

Several hero sources are below the preferred 2400 px production target. They are suitable for this review build, but a future campaign shoot or larger approved master may improve very large displays.

## 7. Homepage wireframe

```text
┌──────────────────────────────────────────────────────────────┐
│ FIXED HEADER                                   ENQUIRY CTA   │
├──────────────────────────────────────────────────────────────┤
│ 01 / MATERIALS                                              │
│ STEEL, ENGINEERED                                           │
│ FOR WHAT'S NEXT.                    FULL-BLEED MEDIA SLOT    │
│ copy + CTA                         PREV — 01 —— 04 — NEXT   │
├──────────────────────────────────────────────────────────────┤
│ YIAN / STEEL      Large buyer-facing positioning statement  │
├──────────────────────────────────────────────────────────────┤
│ 01 / MATERIALS & PRODUCTS                                   │
│ Horizontally browsable editorial product panels             │
├──────────────────────────────────────────────────────────────┤
│ 02 / FROM REQUIREMENT TO DELIVERY                           │
│ Sticky media / active word       01—04 scrolling stages     │
├──────────────────────────────────────────────────────────────┤
│ 03 / APPLICATIONS                                           │
│ Active industry image            Interactive industry list  │
├──────────────────────────────────────────────────────────────┤
│ 04 / BUSINESS ARCHITECTURE                                  │
│ Four routes + three proof principles                        │
├──────────────────────────────────────────────────────────────┤
│ 05 / PROJECT ENQUIRY      EMAIL / WHATSAPP                  │
└──────────────────────────────────────────────────────────────┘
```

## 8. Visual system

### Colour

- Ink: `#111311`
- Paper: `#efeee8`
- Deep paper: `#e2e1da`
- White: `#fafaf6`
- Proposed accent: `#d8ff45`

The accent is intentionally restrained to navigation, indices, progress, active states and the major enquiry block. If an approved corporate colour is supplied, it can be replaced through CSS tokens.

### Typography

The prototype uses a local system sans stack to avoid loading an external font before brand approval. Identity comes from scale, weight, line height, tracking, grid and motion. Recommended production evaluation:

- Display: Inter Tight or another licensed modernist variable sans;
- Body: Inter or an equivalent highly readable sans;
- Technical labels: IBM Plex Mono or an equivalent mono face.

### Grid and spacing

- Fluid outer gutter: `clamp(1.25rem, 3.2vw, 4rem)`
- Maximum content width: `112rem`
- Section space: `clamp(6rem, 11vw, 12rem)`
- Thin dividers organise information; rounded cards and decorative shadows are avoided.

## 9. Motion specification

### Hero

- Pointer drag, touch swipe, keyboard arrows and explicit Previous/Next controls.
- Incoming media moves from roughly `scale(1.065) translateX(2%)` to rest.
- Headline lines enter through an overflow mask with a 90 ms line delay.
- Eyebrow and supporting content move independently.
- Progress line communicates the active story without large carousel dots.
- No autoplay in the prototype, preventing lost reading time and reducing accessibility risk.

### Product rail

- Native horizontal scrolling with snap positions.
- Explicit Previous/Next controls remain available.
- No forced page-level horizontal scroll.

### Capability story

- Media stays sticky on desktop while four project stages scroll.
- IntersectionObserver changes the active visual and large supporting verb.
- Mobile keeps a sticky 4:3 visual and vertical stages.

### Reduced motion

With `prefers-reduced-motion: reduce`:

- transition durations are effectively removed;
- headline mask movement and media scaling are removed;
- smooth scrolling is disabled;
- all content remains readable without motion.

## 10. Responsive behaviour

### Desktop

- Full-screen hero with large editorial type.
- Two-column product, capability and industry compositions.
- Sticky capability visual.

### Tablet

- Reduced type scale and tighter layout.
- Mobile navigation activates below 70rem.
- Product panels remain editorial but use a narrower image/text ratio.

### Mobile

- Hero uses approximately 85svh and touch swipe.
- Headline scale and line breaks are rebalanced, not simply shrunk.
- Product panels stack image above content.
- Capability visual uses 4:3 and stays sticky while stages scroll.
- Industry imagery uses a taller crop.
- All navigation and carousel controls meet comfortable touch sizing.

## 11. Component architecture

| Component | Responsibility |
| --- | --- |
| `Header.astro` | Fixed navigation, accessible mobile menu and focus return |
| `HeroStorySlider.astro` | Four-story hero, gestures, keyboard and progress |
| `MediaPlaceholder.astro` | Central image rendering and designed awaiting-original state |
| `FeaturedProducts.astro` | Horizontal product rail and controls |
| `MaterialDeliveryStory.astro` | Sticky capability narrative and active media |
| `IndustryExplorer.astro` | Hover/focus/click application switching |
| `WorkingModel.astro` | Four business routes and buyer-trust principles |
| `QuoteCTA.astro` | Explicit email and WhatsApp enquiry paths |
| `Footer.astro` | Contact and project brief reminders |

Data is separated into:

- `src/data/media-manifest.ts`
- `src/data/steel-products.ts`
- `src/data/site.ts`

## 12. Accuracy and launch boundaries

- Image references do not prove factory ownership, stock, capacity or project participation.
- Medium-confidence product interpretation remains generic until confirmed.
- Manufacturer statistics or project achievements must carry the correct subject, date and source.
- The current contact section is deliberately direct-email/WhatsApp. It does not display a fake form or claim a backend submission.
- Before launch, add verified product facts, actual documentation examples, legal pages, approved company identity and confirm image usage rights and attribution.

## 13. Acceptance checks

- Website remains reviewable without photography.
- Replacing `currentImage` is sufficient to fill a slot without component redesign.
- Slider works with buttons, keyboard and horizontal gestures.
- The page does not create a horizontal body scrollbar.
- Mobile navigation traps focus, closes with Escape and returns focus to the trigger.
- Reduced-motion mode leaves content readable.
- No unsupported production, certification, capacity or performance claim appears.
- Enquiry channel is described honestly.
