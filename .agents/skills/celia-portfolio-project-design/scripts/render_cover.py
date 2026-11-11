"""Render a celiasy.com navigation cover using the original print frame."""

import argparse
from pathlib import Path

from PIL import Image, ImageColor, ImageOps


def render_cover(artwork, background, output):
    frame_path = Path(__file__).resolve().parents[1] / "assets/navigation-frame.png"
    with Image.open(frame_path) as frame:
        alpha = frame.getchannel("A")
        left, top, right, bottom = ImageOps.invert(alpha).getbbox()
        canvas = Image.new("RGB", (1920, 1920), background)
        frame_x, frame_y = 340, 398
        with Image.open(artwork) as source:
            insert = ImageOps.fit(
                ImageOps.exif_transpose(source).convert("RGB"),
                (right - left, bottom - top),
                method=Image.Resampling.LANCZOS,
            )
        canvas.paste(insert, (frame_x + left, frame_y + top))
        canvas.paste(frame, (frame_x, frame_y), alpha)

    if output.suffix.lower() == ".webp":
        canvas.save(output, lossless=True, method=6)
    elif output.suffix.lower() in (".jpg", ".jpeg"):
        canvas.save(output, quality=95, subsampling=0, optimize=True)
    else:
        raise ValueError("Choose a .webp or .jpg navigation cover.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("artwork", type=Path, help="Unframed project artwork")
    parser.add_argument("output", type=Path, help="Destination .webp or .jpg")
    parser.add_argument("--background", required=True, type=ImageColor.getrgb,
                        help="Outer background color, e.g. '#eeeaf6'")
    args = parser.parse_args()
    render_cover(args.artwork, args.background, args.output)
