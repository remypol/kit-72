#!/usr/bin/env python3
"""
Generates the site's photos in one house style with the OpenAI image API.

    OPENAI_API_KEY=... python3 scripts/gen_images.py [name ...] [--raw DIR] [--force]

Without names it makes every image in IMAGES that does not exist yet.
Writes public/images/shared/<name>.webp (1200 px wide). The full-size PNG
goes to --raw (default: .image-raw/, not committed) so an image can be
re-cut without paying for it again. Needs cwebp.

House style: a studio still life on the brand's deep green, with signal
yellow as the only accent. No people, no brands, no text, and no staged
"disaster photos": a generated picture of a flooded street would look like
news and is not.
"""
import base64
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "shared"
MODEL = "gpt-image-2"
SIZE = "1536x1024"

STYLE = (
    "Studio still-life photograph. The objects stand or lie on a seamless matte deep forest-green surface "
    "that runs up into a backdrop of the same colour (hex #0a3d26). Camera slightly above eye level, "
    "three-quarter view, 50 mm lens look. Soft diffused daylight from the upper left, gentle natural shadows. "
    "Colour palette limited to deep green, off-white, matte black, brushed metal and natural materials, "
    "with signal yellow (hex #ffd21f) as the only bright accent, used on one or two objects. "
    "Calm, orderly, practical; everything sharp and realistic, generous empty green space around the group, "
    "composition centred so the picture can be cropped to a wide banner. "
    "Absolutely no text, letters, numbers, logos, brand names or printed labels on anything. No people, no hands."
)

IMAGES = {
    "emergency-kit": "A complete household emergency kit laid out in neat rows: a yellow dry bag, three clear unlabelled water bottles, plain tin cans, a small crank radio, a black torch, spare batteries, a compact first-aid pouch in off-white with a green cross, a folded wool blanket, a tight roll of euro banknotes (the blue twenty and the orange fifty, rolled so no numbers show) held by a clip, matches and a multitool.",
    "emergency-food": "Long-life food for three days: plain unlabelled tin cans in two sizes, glass jars of rice, pasta and lentils, a stack of crispbread, a bar of dark chocolate in plain paper, a small camping gas burner with a steel pan, a tin opener and one yellow enamel mug.",
    "emergency-radio": "A compact emergency radio with a hand crank, a small solar panel on top and an extended antenna, matte black with a yellow tuning dial. Beside it four AA batteries standing upright and a coiled charging cable.",
    "evacuation-bag": "A packed grab bag ready by the door: a sturdy yellow backpack standing upright, zipped, with a rolled sleeping mat strapped on. In front of it a pair of walking boots, a steel water bottle, a head torch and a plain document pouch.",
    "first-aid-kit": "An open first-aid kit: an off-white zip case with a green cross, its contents laid out in a tidy grid in front: rolled bandages, sterile gauze pads, plasters, a pair of scissors, tweezers, a foil rescue blanket folded flat, disposable gloves and a small unlabelled brown glass bottle.",
    "flashlights": "Four torches of different sizes standing upright in a row from small to large, matte black aluminium, plus a head torch with a yellow strap lying in front and a camping lantern at the end of the row, softly lit.",
    "powerbanks": "Three power banks of different capacities stacked and fanned, matte black and dark grey, one with a yellow rubber edge. A smartphone with a dark screen is connected to the top one with a short cable; a folding solar panel lies behind them.",
    "water-storage": "Drinking-water storage: two translucent stackable jerrycans filled with clear water, one with a tap, a row of clear unlabelled bottles, a water filter with a pump and a small strip of water purification tablets. One jerrycan cap is yellow.",
    "power-outage": "A power cut at home, shown as a still life in dimmer light: one lit white candle in a brass holder, a box of matches, a black torch switched on and throwing a beam across the surface, a wind-up radio and a yellow thermos flask. The candle flame and torch beam are the light sources; the background stays deep green and dark.",
    "cyber-attack": "Life without digital services: a smartphone with a completely black screen lying next to a small stack of euro banknotes (blue twenties and orange fifties, seen from the side so no numbers show) and a few euro coins, a paper notebook with handwritten lines too small to read and a pencil, a small battery radio and a bank card turned face down. One yellow paper clip holds the banknotes.",
    "flood": "Preparing for high water: a pair of yellow rubber boots standing in a shallow, perfectly still film of water that mirrors them on the green surface, next to two filled sandbags in off-white jute, a waterproof document pouch and a black torch.",
    "heat-wave": "Staying cool in a heat wave, in bright hard summer light with crisp shadows: a glass carafe of water with ice and lemon slices, two filled glasses beading with condensation, a small matte black table fan, a folded damp white cloth and a classic glass thermometer without numbers. The lemon is the yellow accent.",
    "water-outage": "The tap gives no water: a matte black kitchen tap mounted on a short off-white block with one single drop hanging from the spout, beside it a yellow bucket filled with clear water, a steel cooking pot with a lid and three filled clear bottles in a row.",
    "evacuation": "Leaving home in ten minutes: an open yellow weekend bag being packed, with folded clothes visible, and laid out in front of it a set of house keys, a plain passport-sized booklet without markings, a white phone charger with a European plug (two round pins) and its coiled cable, a steel water bottle and a small medicine box without print.",
    "nl-alert": "A phone alert, shown without any writing: a modern smartphone standing upright on a small matte black stand, its screen glowing in one flat, plain signal-yellow colour with nothing on it. Next to it a compact matte black battery radio with its antenna extended, a small power bank and a short coiled charging cable connecting the power bank to the phone.",
    "siren": "A public warning siren as a tabletop scale model: a round, mushroom-shaped horn unit in light grey metal on top of a slim steel pole, the pole fixed in a small off-white concrete block. Beside the model a compact matte black battery radio with a yellow tuning dial and an extended antenna, and a single brass house key lying flat.",
    "emergency-plan": "Making a household plan on paper: a clipboard holding one sheet of off-white paper with a printed form made only of empty ruled lines and empty boxes, nothing written or printed in them. A yellow pencil lies diagonally across the sheet. Around it a set of house keys on a plain ring, a folded paper street map showing only thin grey lines, a small steel whistle on a cord and a compact black torch.",
    "baby-kit": "Emergency supplies for a baby: a clear baby bottle filled with milk and closed with its cap, a plain unlabelled round tin of formula powder with a measuring scoop resting on the lid, a neat stack of white nappies, two folded off-white muslin cloths, a clear unlabelled bottle of water, a small steel thermos flask and a soft knitted baby hat in signal yellow.",
}


def generate(name: str, prompt: str, raw: Path) -> Path:
    body = json.dumps({"model": MODEL, "prompt": f"{prompt} {STYLE}", "size": SIZE, "quality": "high", "n": 1}).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as res:
            data = json.load(res)
    except urllib.error.HTTPError as err:
        raise SystemExit(f"{name}: HTTP {err.code} {err.read().decode()[:400]}")
    png = raw / f"{name}.png"
    png.write_bytes(base64.b64decode(data["data"][0]["b64_json"]))
    return png


def main() -> None:
    args = sys.argv[1:]
    force = "--force" in args
    raw = ROOT / ".image-raw"
    if "--raw" in args:
        raw = Path(args[args.index("--raw") + 1])
    names = [a for a in args if not a.startswith("--") and a != str(raw)] or list(IMAGES)
    raw.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    for name in names:
        webp = OUT / f"{name}.webp"
        png = raw / f"{name}.png"
        if webp.exists() and not force:
            continue
        if not png.exists() or force:
            png = generate(name, IMAGES[name], raw)
        subprocess.run(["cwebp", "-quiet", "-q", "82", "-resize", "1200", "0", str(png), "-o", str(webp)], check=True)
        print(f"{name}: {webp.stat().st_size // 1024} kB")


if __name__ == "__main__":
    main()
