---
title: "16 · Diamonds Made of Spaces and Stars"
description: "Divide a shape into upper and lower halves and calculate each row's width"
weight: 16
---

{{< project-download "16-diamonds" >}}

## Project goal

A text diamond needs no drawing command. We only need to determine each row's leading spaces and `*` characters. This project draws a **filled diamond of size 3**: its middle row is five stars wide, with symmetrical rows above and below. The size is fixed in the source so each run can be compared exactly.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. The development machine needs `wb` and a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

The first command checks source; the second compiles, links, and runs. If building `wb` from the product repository, first run `cargo build --workspace --locked` at its root. The recorded examples use compiler `2614b37`. The newer R8A/R8B line supports `wb build` for development with a native SDK; this is not production/no-SDK distribution acceptance.

The leading spaces below belong to the picture:

```text
Diamond, size 3
  *
 ***
*****
 ***
  *
```

{{< project-source "16-diamonds" >}}

## Find the pattern before writing loops

Let `row` run from 1 to `size` in the top half. Leading spaces equal `size - row`; stars equal `2 * row - 1`. With `size = 3`, row one has two spaces and one star, while row three has no spaces and five stars. A small table of counts makes these formulas easier to see than visual guessing.

`DrawRow` builds one row with two `For` loops, then calls `PrintLn` once. `Main` decides which rows to draw: 1 through 3 for the top, then `size - 1` down to 1 for the bottom. Starting the lower half at 3 would duplicate the middle row. This is deliberately a **filled star diamond**, not a slash outline. Size must be positive; zero produces no shape, while very large sizes need range checks before accepting user input.

## Try next

1. Set `size = 1`. The result should be one star on one row.
2. Set `size = 4` and tabulate `(row, spaces, stars)` for the upper half. Check that the full shape has `2 * size - 1` rows.
3. Make `DrawRow` draw an outline with interior spaces. Handle the first row separately, since it has no interior.

Inspired by [Big Book of Small Python Projects, Project 16: Diamonds](https://inventwithpython.com/bigbookpython/project16.html) by Al Sweigart. The star pattern, explanation, and WBasic source were written anew.
