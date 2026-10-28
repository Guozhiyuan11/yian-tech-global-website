"""Inventory the supplied archive and create review thumbnails without altering originals."""
import argparse
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

sys.stdout.reconfigure(encoding="utf-8")
parser = argparse.ArgumentParser()
parser.add_argument("--archive", required=True)
parser.add_argument("--audit-dir", required=True)
args = parser.parse_args()
archive = Path(args.archive)
audit = Path(args.audit_dir).resolve()
originals = audit / "originals"
thumbs = audit / "thumbnails"
sheets = audit / "contact-sheets"
for directory in (originals, thumbs, sheets):
    directory.mkdir(parents=True, exist_ok=True)

def tar_output(*options):
    result = subprocess.run(["tar", *options, str(archive)], capture_output=True, check=True)
    return result.stdout.decode("gb18030")

entries = tar_output("-tf").splitlines()
for entry in entries:
    path = PurePosixPath(entry.replace("\\", "/"))
    if path.is_absolute() or ".." in path.parts or ":" in entry:
        raise ValueError(f"Unsafe archive member: {entry}")
details = tar_output("-tvf")
if any(line[0] not in "-d" for line in details.splitlines() if line.strip()):
    raise ValueError("Archive contains a special file; extraction stopped")
image_entries = [p for p in entries if PurePosixPath(p).suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
other_files = [p for p in entries if PurePosixPath(p).suffix and p not in image_entries]
if other_files:
    raise ValueError(f"Unexpected non-image members: {other_files}")
total_bytes = sum(int(line.split()[4]) for line in details.splitlines() if line.startswith("-"))
print(json.dumps({"image_count": len(image_entries), "unpacked_bytes": total_bytes,
                  "groups": Counter(p.split("/")[0] for p in image_entries)}, ensure_ascii=False), flush=True)
if not all((originals / p).is_file() for p in image_entries):
    print("Extracting supplied images into the ignored source-review directory...", flush=True)
    result = subprocess.run(["tar", "-xf", str(archive), "-C", str(originals)], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode("gb18030", errors="replace"))

def review_one(item):
    index, relative = item
    identifier = f"s{index:04d}"
    source = originals / relative
    row = {"id": identifier, "source": relative, "group": relative.split("/")[0], "bytes": source.stat().st_size}
    try:
        with source.open("rb") as stream:
            row["sha256"] = hashlib.file_digest(stream, "sha256").hexdigest()
        with Image.open(source) as original:
            row.update(width=original.width, height=original.height, format=original.format)
            original.draft("RGB", (400, 320))
            preview = ImageOps.exif_transpose(original).convert("RGB")
            preview.thumbnail((340, 260))
            preview.save(thumbs / f"{identifier}.jpg", quality=82)
    except Exception as error:
        row["error"] = str(error)
    return row

records = []
with ThreadPoolExecutor(max_workers=4) as executor:
    for index, row in enumerate(executor.map(review_one, enumerate(image_entries, 1)), 1):
        records.append(row)
        if index % 200 == 0:
            print(f"Reviewed image files: {index}/{len(image_entries)}", flush=True)

font = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 15)
title_font = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 25)
grouped = defaultdict(list)
for row in records:
    grouped[row["group"]].append(row)
sheet_manifest = []
for group_index, (group, rows) in enumerate(grouped.items(), 1):
    for offset in range(0, len(rows), 60):
        batch = rows[offset:offset + 60]
        sheet_name = f"g{group_index:02d}-{offset // 60 + 1:02d}.jpg"
        canvas = Image.new("RGB", (1800, 1140), "#eeeae4")
        draw = ImageDraw.Draw(canvas)
        draw.text((15, 8), f"g{group_index:02d}  {group}  |  {offset + 1}-{offset + len(batch)} / {len(rows)}", font=title_font, fill="#222")
        for position, row in enumerate(batch):
            x, y = (position % 10) * 180, 55 + (position // 10) * 180
            thumb_path = thumbs / f"{row['id']}.jpg"
            if thumb_path.exists():
                with Image.open(thumb_path) as preview:
                    preview.thumbnail((172, 140))
                    canvas.paste(preview, (x + (180 - preview.width) // 2, y + (140 - preview.height) // 2))
            draw.text((x + 5, y + 143), row["id"], font=font, fill="#111")
            draw.text((x + 5, y + 162), f"{row.get('width', 0)} x {row.get('height', 0)}", font=font, fill="#555")
        canvas.save(sheets / sheet_name, quality=88)
        sheet_manifest.append({"file": sheet_name, "group": group, "ids": [r["id"] for r in batch]})
hashes = Counter(r.get("sha256") for r in records if "sha256" in r)
result = {"archive_name": archive.name, "archive_bytes": archive.stat().st_size, "unpacked_bytes": total_bytes,
          "image_count": len(records), "unique_images": len(hashes), "exact_duplicates": sum(v - 1 for v in hashes.values()),
          "groups": dict(Counter(r["group"] for r in records)), "errors": [r for r in records if "error" in r],
          "records": records, "contact_sheets": sheet_manifest}
(audit / "inventory.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({k: v for k, v in result.items() if k not in {"records", "contact_sheets"}}, ensure_ascii=False), flush=True)
print(f"Contact sheets ready: {len(sheet_manifest)} at {sheets}", flush=True)
