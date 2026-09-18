# Website Image Replacement Checklist

The supplied 01–40 originals are now mapped to the workbook classifications and imported as WebP assets. The selected source ID for each active slot is shown below. Usage rights, public attribution and any separate campaign-grade crops still require business approval.

## Replacement workflow

For each slot:

- [ ] Confirm the image source and usage rights
- [x] Confirm subject against the supplied classification table
- [x] Store the recovered original outside the generated asset folder
- [ ] Prepare desktop crop
- [ ] Prepare mobile crop where composition requires it
- [x] Generate WebP derivatives
- [x] Update `currentImage` in `src/data/media-manifest.ts`
- [ ] Check focal point at desktop, tablet and mobile widths
- [x] Confirm useful, non-promotional alt text
- [x] Confirm no unsupported claim is implied by the image

## P0 — Homepage hero

### `hero_materials`

- References: 03 / 05 / 06
- Subject: stainless steel coil or tube; macro or environmental view
- Composition: product in centre-right 55–70%; negative space on left
- Desktop: 16:9, minimum 2400 × 1350 px
- Mobile: 4:5, separate crop recommended
- Focal point: right centre
- Selected: 03 · Status: [x] original received [x] optimised [x] responsive crop verified

### `hero_infrastructure`

- References: 10 / 11 / 12
- Subject: rail product or rail warehouse
- Composition: strong rail perspective; quiet headline zone; avoid clutter
- Desktop: 16:9, minimum 2400 × 1350 px
- Mobile: 4:5, separate crop recommended
- Focal point: centre right
- Selected: 10 · Status: [x] original received [x] optimised [x] responsive crop verified

### `hero_fabrication`

- References: 26 / 35
- Subject: large fabricated component, elbow or welded assembly
- Composition: visible scale and workmanship; keep a clean text zone
- Desktop: 16:9, minimum 2400 × 1350 px
- Mobile: 4:5, separate crop recommended
- Focal point: right centre
- Selected: 26 · Status: [x] original received [x] optimised [x] responsive crop verified

### `hero_supply`

- References: 04 / 07 / 21
- Subject: production, warehousing or loading operation
- Composition: use repeated process rhythm or controlled movement
- Desktop: 16:9, minimum 2400 × 1350 px
- Mobile: 4:5, separate crop recommended
- Focal point: centre
- Selected: 21 · Status: [x] original received [x] optimised [x] responsive crop verified

## P1 — Featured products

| Slot | References | Desired subject | Ratio | Minimum | Status |
| --- | --- | --- | --- | --- | --- |
| `featured_stainless_tube` | 06 | Stainless round tube geometry | 4:3 | 1800 × 1350 | WebP ready |
| `featured_coil_strip` | 05 | Stainless coil and strip | 4:3 | 1800 × 1350 | WebP ready |
| `featured_rail` | 11 | Long-rail storage | 4:3 | 1800 × 1350 | WebP ready |
| `featured_profiles` | 36 | Bent reinforcement products | 4:3 | 1800 × 1350 | WebP ready |
| `featured_fabrication` | 35 | Large welded pipe assembly | 4:3 | 1800 × 1350 | WebP ready |

Product-image checks:

- [x] The item is correctly identified
- [x] Material is verified or copy remains material-neutral
- [x] End use is verified or not claimed
- [x] The image is not a tiny preview enlarged to fill the frame
- [x] Reflections, finish and geometry remain readable after compression

## P1 — Capability story

| Slot | Reference | Desired subject | Desktop | Mobile | Status |
| --- | --- | --- | --- | --- | --- |
| `capability_tube_production` | 04 | Tube production or forming process | 16:10 | 4:3 | WebP ready |
| `capability_processing` | 07 | Coil, strip or sheet processing | 16:10 | 4:3 | WebP ready |
| `capability_storage` | 39 | Orderly tube storage | 16:10 | 4:3 | WebP ready |
| `capability_delivery` | 21 | Loading, secured cargo or delivery preparation | 16:10 | 4:3 | WebP ready |

Capability-image checks:

- [x] Image source does not imply YIAN ownership unless confirmed
- [x] Capacity, inventory or throughput is not inferred from the photograph
- [x] Safety-sensitive activity is represented accurately
- [x] Process shown matches the surrounding copy

## P2 — Industries

| Slot | References | Desired subject | Desktop | Mobile | Status |
| --- | --- | --- | --- | --- | --- |
| `industry_infrastructure` | 11 | Long-rail storage context | 3:2 | 4:5 | WebP ready |
| `industry_rail` | 12 | Railway product context | 3:2 | 4:5 | WebP ready |
| `industry_manufacturing` | 04 | Tube production line | 3:2 | 4:5 | WebP ready |
| `industry_construction` | 31 | Reinforcement steel supply | 3:2 | 4:5 | WebP ready |

Industry-image checks:

- [ ] Project scene attribution is documented
- [ ] Manufacturer evidence, project scene and external reference are clearly distinguished
- [ ] No generic stock-business imagery
- [ ] Mobile crop preserves the actual application subject

## Final visual QA

- [x] 1440 px desktop
- [ ] 1280 px laptop
- [ ] 1024 px tablet landscape
- [ ] 768 px tablet portrait
- [x] 390 px iPhone-class viewport
- [ ] 360 px Android-class viewport
- [ ] Dark and bright display conditions
- [ ] 2× pixel density
- [ ] Slow-network image loading
- [ ] Images disabled / alt text path
- [ ] Reduced-motion setting
