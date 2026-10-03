"""Builds the optimised placeholder photographs in assets/img.

Every photo is a temporary free-licence placeholder from Pexels (see README.md).
PLACEHOLDER — REPLACE WITH KARATAS GLOBAL ORIGINAL PHOTOGRAPHY
PLACEHOLDER — REPLACE WITH GRANITE & LIME ORIGINAL PROJECT PHOTOGRAPHY (renovation)

Run: pip install "pillow>=11.3" && python scripts/build_images.py
"""
import io
import os
import urllib.request

from PIL import Image, ImageEnhance

OUT = "assets/img"
SOURCES = {"hero": 35097902, "inspection": 6720537, "inventory": 27099094, "industrial": 188679, "renovation": 7587883}


def fetch(photo_id):
    url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=2880"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (karatasglobal.com image build)"})
    with urllib.request.urlopen(req, timeout=60) as res:
        return Image.open(io.BytesIO(res.read())).convert("RGB")


def grade(im, sat, con=1.03, cool=0.0):
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(con)
    if cool:
        r, g, b = im.split()
        r = r.point(lambda v: int(v * (1 - cool)))
        b = b.point(lambda v: min(255, int(v * (1 + cool * 0.6))))
        im = Image.merge("RGB", (r, g, b))
    return im


def box(im, x0, y0, x1, y1):
    w, h = im.size
    return im.crop((round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h)))


def export(im, name, widths, jpg=None):
    for w in widths:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(f"{OUT}/{name}-{w}.avif", quality=52, speed=4)
        r.save(f"{OUT}/{name}-{w}.webp", quality=74, method=6)
        if jpg == w:
            r.save(f"{OUT}/{name}-{w}.jpg", quality=78, optimize=True, progressive=True)


def main():
    os.makedirs(OUT, exist_ok=True)
    hero = grade(fetch(SOURCES["hero"]), 0.66, 1.02, 0.035)
    export(box(hero, 0, 0.15, 1, 0.97), "hero-yard", [960, 1600, 2400], jpg=1600)
    export(box(hero, 0.30, 0.14, 1, 0.93), "hero-yard-mobile", [640, 1080])

    inspection = grade(fetch(SOURCES["inspection"]), 0.72)
    export(box(inspection, 0, 0, 0.889, 1), "inspection", [640, 1100, 1600], jpg=1100)

    inventory = grade(fetch(SOURCES["inventory"]), 0.6, 1.02)
    export(box(inventory, 0, 0.20, 1, 0.843), "inventory", [960, 1600, 2400], jpg=1600)
    export(box(inventory, 0.25, 0.12, 1, 0.87), "inventory-mobile", [640, 1100])

    industrial = grade(fetch(SOURCES["industrial"]), 0.7, 1.0)
    export(industrial.crop((1130, 0, 1130 + 1536, 1920)), "industrial", [480, 800, 1100], jpg=800)
    export(industrial, "industrial-wide", [640, 1100])

    renovation = grade(fetch(SOURCES["renovation"]), 0.88, 1.0)
    export(renovation.crop((0, 1, 2880, 1921)), "renovation", [480, 800, 1200], jpg=800)

    print(sorted(os.listdir(OUT)))


if __name__ == "__main__":
    main()
