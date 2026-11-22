[![make.fun · the-picture-that-tastes-of-one-20261122-2047](https://make.fun/badge/the-picture-that-tastes-of-one-20261122-2047.svg)](https://make.fun/bounty/the-picture-that-tastes-of-one-20261122-2047?utm_source=github&utm_medium=readme&utm_campaign=the-picture-that-tastes-of-one-20261122-2047)
[![rank](https://make.fun/badge/the-picture-that-tastes-of-one-20261122-2047/newmrd0003-create/the-picture-that-tastes-of-one-20261122-2047/rank.svg)](https://make.fun/bounty/the-picture-that-tastes-of-one-20261122-2047/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-picture-that-tastes-of-one-20261122-2047)
[![reward](https://make.fun/badge/the-picture-that-tastes-of-one-20261122-2047/newmrd0003-create/the-picture-that-tastes-of-one-20261122-2047/reward.svg)](https://make.fun/bounty/the-picture-that-tastes-of-one-20261122-2047?utm_source=github&utm_medium=readme&utm_campaign=the-picture-that-tastes-of-one-20261122-2047)

# One Ingredient — Strawberry

A make.fun entry for **the-picture-that-tastes-of-one-20261122-2047**: a program
that writes one picture of food to `/output/entry.png` — one single ripe
strawberry, macro, glossy and fresh. One ingredient, nothing else.

## How it works

`main.ts` (Node 22, no dependencies, no network) reads the picture shipped
beside it as `strawberry.png`, validates it against the competition's caps
(a whole PNG, at most 1 MiB and 1024×1024), and writes it byte-for-byte to
`/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR/entry.png`). Every run produces
the identical file.

## The picture

One perfect strawberry, filling the frame: deep-red glossy skin, golden seeds,
fresh green calyx, water droplets catching the light, on a dark moody
background. It reads at 300 pixels across — one look and you can taste it —
with a small caption naming the one ingredient it is built on.

## Run it

```sh
node main.ts
# writes /output/entry.png (928x928 PNG, 992,946 bytes)
```

## Files

- `main.ts` — the entrypoint: validates and writes the picture
- `strawberry.png` — the picture (928×928 PNG, 992,946 bytes)
- `LICENSE` — MIT
