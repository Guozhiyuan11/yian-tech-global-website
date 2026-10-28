"""Create responsive website copies of selected, reviewed sandstone photographs."""
from pathlib import Path
from io import BytesIO
import json
import sys
from PIL import Image, ImageOps, ImageCms

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parents[1]
audit = root / ".source-review/sandstone-20261028"
inventory = json.loads((audit / "inventory.json").read_text(encoding="utf-8"))
records = {row["id"]: row for row in inventory["records"]}
selection = json.loads((root / "docs/sandstone-photo-selection.json").read_text(encoding="utf-8"))
output = root / "public/media/sandstone"
output.mkdir(parents=True, exist_ok=True)
source_map = []

def prepare(selected, slug, hero=False):
    row = records[selected["id"]]
    source = audit / "originals" / row["source"]
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        profile = original.info.get("icc_profile")
        if profile:
            image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(BytesIO(profile)), ImageCms.createProfile("sRGB"), outputMode="RGB")
        widths = sorted(set(min(image.width, width) for width in ([640, 1280, 1920] if hero else [480, 960, 1600])))
        variants = []
        for width in widths:
            height = round(image.height * width / image.width)
            filename = f"{slug}-{row['id']}-{width}.webp"
            image.resize((width, height), Image.Resampling.LANCZOS).save(output / filename, "WEBP", quality=85, method=6)
            variants.append({"src": f"/media/sandstone/{filename}", "width": width, "height": height, "bytes": (output / filename).stat().st_size})
    largest = variants[-1]
    source_map.append({"id": row["id"], "original": row["source"], "sha256": row["sha256"],
                       "sourceWidth": row["width"], "sourceHeight": row["height"], "outputs": variants})
    return {"src": largest["src"], "srcSet": ", ".join(f"{v['src']} {v['width']}w" for v in variants),
            "width": largest["width"], "height": largest["height"], "alt": selected["alt"]}

result = {"hero": prepare(selection["hero"], "custom-profiles", True), "colours": [], "work": []}
for colour in selection["colours"]:
    result["colours"].append({"id": colour["id"], "name": colour["name"],
                               "images": [prepare(photo, colour["id"]) for photo in colour["photos"]]})
for work in selection["work"]:
    result["work"].append({"id": work["id"], "title": work["title"], "copy": work["copy"], "image": prepare(work["photo"], work["id"])})
hashes = [row["sha256"] for row in source_map]
if len(set(hashes)) != len(hashes):
    raise ValueError("Selected website photographs contain exact duplicates")
(root / "src/data/sandstone-media.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(root / "docs/sandstone-media-sources.json").write_text(json.dumps({"archive": inventory["archive_name"], "date": "2026-10-28", "photos": source_map}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
total = sum(v["bytes"] for row in source_map for v in row["outputs"])
print(json.dumps({"selected_photos": len(source_map), "colour_references": len(result["colours"]),
                  "responsive_files": sum(len(row["outputs"]) for row in source_map), "total_bytes": total,
                  "largest_file_bytes": max(v["bytes"] for row in source_map for v in row["outputs"])}, ensure_ascii=False))
