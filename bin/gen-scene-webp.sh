#!/usr/bin/env bash
#
# Generate responsive WebP variants for scene images.
# For every assets/images/scenes/*.png it writes:
#   <name>.webp      full-resolution WebP (quality 82)
#   <name>-sm.webp   small WebP for narrow viewports (<=960px wide, quality 65)
#
# Used by `rake images:variants` locally and by the GitHub Actions deploy.
# Portable across macOS and Linux: needs `cwebp` (brew/apt: webp) and python3.
#
set -euo pipefail

SCENES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/assets/images/scenes"
FULL_QUALITY=82
SMALL_QUALITY=65
SMALL_WIDTH=960

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install it with: brew install webp  (or: sudo apt-get install -y webp)" >&2
  exit 1
fi

# Read a PNG's pixel width straight from the IHDR chunk (offset 16, big-endian).
png_width() {
  python3 -c "import struct,sys; f=open(sys.argv[1],'rb'); f.seek(16); print(struct.unpack('>I', f.read(4))[0])" "$1"
}

count=0
shopt -s nullglob
for png in "$SCENES_DIR"/*.png; do
  base="${png%.png}"

  cwebp -quiet -q "$FULL_QUALITY" "$png" -o "$base.webp"

  # Only downscale when the source is wider than SMALL_WIDTH; never upscale.
  if [ "$(png_width "$png")" -gt "$SMALL_WIDTH" ]; then
    cwebp -quiet -q "$SMALL_QUALITY" -resize "$SMALL_WIDTH" 0 "$png" -o "$base-sm.webp"
  else
    cwebp -quiet -q "$SMALL_QUALITY" "$png" -o "$base-sm.webp"
  fi

  count=$((count + 1))
done

echo "Generated WebP variants for $count PNGs in $SCENES_DIR"
