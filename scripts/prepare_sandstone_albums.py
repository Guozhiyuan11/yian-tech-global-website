"""Build the reviewed sandstone albums as responsive static website assets."""
from concurrent.futures import ThreadPoolExecutor
import argparse
from io import BytesIO
import json
from pathlib import Path
import re
import sys
from PIL import Image, ImageCms, ImageOps

sys.stdout.reconfigure(encoding="utf-8")
parser = argparse.ArgumentParser()
parser.add_argument('--prewarm-colours', action='store_true')
parser.add_argument('--prewarm-work', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
audit = root / ".source-review/sandstone-20261028"
inventory = json.loads((audit / "inventory.json").read_text(encoding="utf-8"))
records = {row["id"]: row for row in inventory["records"]}
base = json.loads((root / "src/data/sandstone-media.json").read_text(encoding="utf-8"))
selection = json.loads((root / "docs/sandstone-photo-selection.json").read_text(encoding="utf-8"))
colour_payload = {} if args.prewarm_work else json.loads((root / "docs/sandstone-colour-expansion.json").read_text(encoding="utf-8"))
work_payload = {} if args.prewarm_colours else json.loads((root / "docs/sandstone-work-expansion.json").read_text(encoding="utf-8"))
colour_groups = colour_payload.get("groups", [])
work_groups = work_payload.get("groups", [])
groups = colour_groups + work_groups
source_maps = []
existing = {}
base_images = [base["hero"]] + [p for c in base["colours"] for p in c["images"]] + [w["image"] for w in base["work"]]
for image in base_images:
    identifier = re.search(r"s\d{4}", image["src"]).group()
    existing[records[identifier]["sha256"]] = image

colour_names = {c["id"]: c["name"] for c in selection["colours"]}
work_names = {w["id"]: w["title"] for w in selection["work"]}
work_descriptions = {
    "carved-reliefs": {"en": "Carved panels, reliefs and decorative details. Explore the photo collection and share the design, colour and dimensions you have in mind.", "es": "Paneles tallados, relieves y detalles decorativos. Explore la colección y comparta el diseño, el color y las dimensiones que busca."},
    "shaped-pieces": {"en": "Shaped pieces, profiles and decorative sandstone forms. Browse the different designs, then send your drawing or reference for a custom order.", "es": "Piezas con formas especiales, perfiles y elementos decorativos de arenisca. Explore los diseños y envíe un plano o una referencia para su pedido a medida."},
    "architecture-reference": {"en": "Facades, columns, walls and architectural settings, presented as application references. Discuss your own project's appearance and requirements with us.", "es": "Fachadas, columnas, muros y entornos arquitectónicos como referencias de aplicación. Consulte el aspecto y los requisitos de su propio proyecto."},
}

# Preserve reviewed ordering and remove exact duplicates within each album.
for group in groups:
    seen = set()
    clean = []
    for photo in group["photos"]:
        row = records[photo["id"]]
        if row["sha256"] not in seen:
            seen.add(row["sha256"])
            clean.append(photo)
    group["photos"] = clean
    if not clean:
        raise ValueError(f"Empty album: {group['id']}")

needed = {}
for group in groups:
    for photo in group["photos"]:
        row = records[photo["id"]]
        if row["sha256"] not in existing:
            needed.setdefault(row["sha256"], row)
output = root / "public/media/sandstone/library"
output.mkdir(parents=True, exist_ok=True)

def prepare(row):
    paths = []
    with Image.open(audit / "originals" / row["source"]) as original:
        upright = ImageOps.exif_transpose(original)
        profile = original.info.get("icc_profile")
        image = ImageCms.profileToProfile(upright, ImageCms.ImageCmsProfile(BytesIO(profile)), ImageCms.createProfile("sRGB"), outputMode="RGB") if profile else upright.convert("RGB")
        for width in sorted(set(min(image.width, w) for w in (360, 800, 1440))):
            height = round(image.height * width / image.width)
            name = f"{row['id']}-{width}.webp"
            target = output / name
            if not target.exists():
                image.resize((width, height), Image.Resampling.LANCZOS).save(target, "WEBP", quality=83, method=4)
            paths.append({"src": f"/media/sandstone/library/{name}", "width": width, "height": height, "bytes": target.stat().st_size})
    largest = paths[-1]
    return row["sha256"], {"src": largest["src"], "srcSet": ", ".join(f"{p['src']} {p['width']}w" for p in paths), "width": largest["width"], "height": largest["height"]}, paths

asset_paths = []
print(f"Preparing {len(needed)} additional unique photographs...", flush=True)
with ThreadPoolExecutor(max_workers=4) as executor:
    for index, (sha, image, paths) in enumerate(executor.map(prepare, needed.values()), 1):
        existing[sha] = image
        asset_paths.extend(paths)
        if index % 25 == 0:
            print(f"Optimised {index}/{len(needed)} photographs", flush=True)

if args.prewarm_colours or args.prewarm_work:
    print(f"Assets ready: {len(needed)} additional photographs, {len(asset_paths)} responsive files", flush=True)
    raise SystemExit(0)

albums = []
category_photos = {}
definitions = {}
for payload in (colour_payload, work_payload):
    for definition in payload.get('categories', []) + payload.get('tagDefinitions', []):
        definitions[definition['id']] = {
            'name': definition.get('name') or definition.get('label'),
            'description': definition.get('description'),
        }
for group in groups:
    name = colour_names.get(group["id"]) or work_names[group["id"]]
    kind = "colour" if group["id"] in colour_names else "work"
    description = work_descriptions.get(group["id"], {
        "en": f"Photographs of {name['en'].lower()} sandstone, with colour, texture and form references for your custom order.",
        "es": f"Fotografías de arenisca en tonos {name['es'].lower()}, con referencias de color, textura y forma para su pedido a medida.",
    })
    images = []
    for index, photo in enumerate(group["photos"], 1):
        row = records[photo["id"]]
        image = {**existing[row["sha256"]], "alt": photo["alt"]}
        images.append(image)
        source_maps.append({"album": group["id"], "number": index, "id": row["id"], "kind": photo.get("kind"), "source": row["source"], "sha256": row["sha256"], "asset": image["src"]})
        for tag in photo.get('tags', []):
            if tag not in definitions:
                raise ValueError(f'Unknown product classification: {tag}')
            category_photos.setdefault(tag, {}).setdefault(row['sha256'], (image, row))
    albums.append({"id": group["id"], "name": name, "description": description, "kind": kind, "images": images})

category_order = ['sample-panels', 'surface-details', 'blocks-slabs', 'profiles-mouldings', 'columns-balustrades', 'capitals-bases',
                  'basins-planters', 'floral-reliefs', 'geometric-reliefs', 'narrative-reliefs', 'animal-carving', 'figures-statues',
                  'paving-steps', 'wall-cladding', 'facades', 'interior-walls', 'garden-settings', 'packing-production', 'spheres']
category_covers = {'sample-panels': 's0413', 'floral-reliefs': 's1197', 'narrative-reliefs': 's0950', 'figures-statues': 's1072', 'packing-production': 's0757'}
for identifier in sorted(category_photos, key=lambda tag: category_order.index(tag) if tag in category_order else len(category_order)):
    entries = list(category_photos[identifier].values())
    if len(entries) < 4:
        continue
    if identifier in category_covers:
        cover_id = category_covers[identifier]
        if not any(row['id'] == cover_id for _, row in entries):
            raise ValueError(f'Missing reviewed cover: {identifier}/{cover_id}')
        entries.sort(key=lambda entry: entry[1]['id'] != cover_id)
    definition = definitions[identifier]
    name = definition['name']
    description = definition['description'] or {
        'en': f"Photo references of {name['en'].lower()}. Explore the visible shapes, surfaces and details, then send your own custom requirements.",
        'es': f"Referencias fotográficas de {name['es'].lower()}. Explore formas, superficies y detalles y envíe sus requisitos a medida.",
    }
    albums.append({'id': identifier, 'name': name, 'description': description, 'kind': 'category', 'images': [image for image, _ in entries]})
    for index, (image, row) in enumerate(entries, 1):
        source_maps.append({'album': identifier, 'number': index, 'id': row['id'], 'kind': 'classification-reference', 'source': row['source'], 'sha256': row['sha256'], 'asset': image['src']})

referenced = {part.strip().split(' ')[0] for album in albums for image in album['images'] for part in image['srcSet'].split(',')}
removed = 0
for target in output.glob('*.webp'):
    if target.resolve().parent != output.resolve():
        raise ValueError('Unexpected asset path')
    if f'/media/sandstone/library/{target.name}' not in referenced:
        target.unlink()
        removed += 1

summary = {"albums": len(albums), "photograph_references": len(source_maps), "unique_photographs": len({r['sha256'] for r in source_maps}),
           "additional_files": len(asset_paths), "additional_bytes": sum(p["bytes"] for p in asset_paths),
           "colour_albums": sum(a['kind'] == 'colour' for a in albums), 'design_albums': sum(a['kind'] == 'work' for a in albums),
           'product_setting_albums': sum(a['kind'] == 'category' for a in albums), 'removed_unused_files': removed,
           "counts": {a["id"]: len(a["images"]) for a in albums}, "static_album_pages_per_language": sum((len(a["images"]) + 23) // 24 for a in albums)}
(root / "src/data/sandstone-albums.json").write_text(json.dumps(albums, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(root / "docs/sandstone-album-sources.json").write_text(json.dumps({"summary": summary, "photographs": source_maps}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(summary, ensure_ascii=False), flush=True)
