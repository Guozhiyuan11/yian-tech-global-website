from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

from PIL import Image, ImageOps


FIELD_MAP = {
    "图片编号": "id",
    "一级类目": "primaryCategory",
    "二级类目": "secondaryCategory",
    "三级类目/产品名称": "productName",
    "素材属性": "assetType",
    "材质/主要工艺": "materialProcess",
    "识别置信度": "confidence",
    "备注": "notes",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build the web image inventory from recovered originals and the approved CSV metadata."
    )
    parser.add_argument("--recovery-report", required=True, type=Path)
    parser.add_argument("--csv", required=True, type=Path)
    parser.add_argument("--site-root", required=True, type=Path)
    parser.add_argument("--max-edge", type=int, default=1920)
    parser.add_argument("--quality", type=int, default=84)
    return parser.parse_args()


def read_source_rows(csv_path: Path) -> dict[int, dict[str, str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    if len(rows) != 40:
        raise ValueError(f"Expected 40 metadata rows, found {len(rows)}")

    mapped: dict[int, dict[str, str]] = {}
    for row in rows:
        source_id = int(row["图片编号"])
        mapped[source_id] = {target: row[source].strip() for source, target in FIELD_MAP.items()}
    return mapped


def main() -> None:
    args = parse_args()
    site_root = args.site_root.resolve()
    recovery_report = json.loads(args.recovery_report.read_text(encoding="utf-8"))
    source_rows = read_source_rows(args.csv)
    output_dir = site_root / "public" / "media" / "inventory"
    output_dir.mkdir(parents=True, exist_ok=True)

    recovery_by_id = {int(record["source_id"]): record for record in recovery_report["records"]}
    if set(recovery_by_id) != set(source_rows):
        raise ValueError("Recovered image IDs and CSV metadata IDs do not match")

    manifest: list[dict[str, object]] = []
    for source_id in sorted(source_rows):
        record = recovery_by_id[source_id]
        source_path = site_root / Path(record["saved_path"])
        output_name = f"steel-{source_id:02d}.webp"
        output_path = output_dir / output_name

        with Image.open(source_path) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            original_width, original_height = image.size
            scale = min(1.0, args.max_edge / max(image.size))
            if scale < 1.0:
                image = image.resize(
                    (round(image.width * scale), round(image.height * scale)),
                    Image.Resampling.LANCZOS,
                )
            image.save(output_path, "WEBP", quality=args.quality, method=6)
            web_width, web_height = image.size

        metadata = source_rows[source_id]
        confidence = "high" if metadata["confidence"] == "高" else "medium"
        manifest.append(
            {
                "id": source_id,
                "image": f"/media/inventory/{output_name}",
                "primaryCategory": metadata["primaryCategory"],
                "secondaryCategory": metadata["secondaryCategory"],
                "productName": metadata["productName"],
                "assetType": metadata["assetType"],
                "materialProcess": metadata["materialProcess"],
                "confidence": confidence,
                "notes": metadata["notes"],
                "originalWidth": original_width,
                "originalHeight": original_height,
                "webWidth": web_width,
                "webHeight": web_height,
            }
        )

    manifest_path = site_root / "src" / "data" / "source-images.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Imported {len(manifest)} images into {output_dir}")
    print(f"Wrote metadata manifest to {manifest_path}")


if __name__ == "__main__":
    main()
