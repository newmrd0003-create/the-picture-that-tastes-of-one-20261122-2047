// One Ingredient — Strawberry.
// A program that writes one picture of food to /output/entry.png: a single
// ripe strawberry, macro, glossy, fresh — one ingredient, nothing else.
// Refined render: a glistening droplet slides down the skin and a soft
// highlight sits on the shoulder, so the berry reads fresh at a glance.
// The picture is the program's payload: a PNG rendered during the build and
// shipped beside this entrypoint as strawberry.png. The program validates it
// against the competition's caps and writes it out byte-for-byte, so every
// run produces the same file: deterministic, no network, no randomness.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

const here = dirname(fileURLToPath(import.meta.url));
const png = readFileSync(join(here, 'strawberry.png'));

// Validate: a whole PNG (magic + IHDR), at most 1 MiB and 1024x1024.
if (png.length > MAX_BYTES) {
  throw new Error(`entry.png is ${png.length} bytes, over the 1 MiB cap`);
}
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(PNG_MAGIC)) throw new Error('source is not a PNG');
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}
// The render must be truecolour (colour type 2 or 6): a paletted or greyscale
// source would wash out the berry's reds and the droplet highlight.
const colorType = png[25];
if (colorType !== 2 && colorType !== 6) {
  throw new Error(`entry.png colour type ${colorType}, expected truecolour 2 or 6`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const out = join(OUTPUT_DIR, 'entry.png');
writeFileSync(out, png);
const check = readFileSync(out);
if (!check.equals(png)) throw new Error('output differs from source');
// Re-check the written file's own magic, so a partial or truncated write
// can never pass as a valid entry.
if (!check.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('written entry.png failed its PNG magic check');
}
console.log(`wrote ${out}: ${width}x${height}, ${png.length} bytes`);
