---
title: "35 · A Hex Grid from Repeated Pieces"
weight: 35
---

{{< project-download "35-hex-grid" >}}

Text art need not be drawn character by character. Design a small unit, then repeat it horizontally and vertically. This chapter uses two lines per row of hexagons. The deliberately compact shape shows the tiling principle; it does not reproduce the source project's scale or spacing.

## Try running it

Open the downloaded file's folder, then check and run:

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
/ \_/ \_/ \_/ \_
\_/\_/\_/\_/
/ \_/ \_/ \_/ \_
\_/\_/\_/\_/
/ \_/ \_/ \_/ \_
\_/\_/\_/\_/
```

## From a piece to a picture

{{< project-source "35-hex-grid" >}}

`Repeat` accepts one text piece and a count, appending the piece to `line` that many times. It separates *horizontal repetition* from the `Main` loop's *vertical row count*. You can therefore change `width` and `height` independently without rewriting a piece.

The `\` characters belong to the pattern. Inspect the actual source characters and spaces before changing it; alignment depends on both. The result has `2 * height` lines. Counting them is a useful check alongside visual inspection.

## Experiment

Set `width = 1` and `height = 1` to get two lines. With `width = 0`, explain the blank lines: `Repeat` has no iterations, but `PrintLn` still runs. To forbid zero, validate the parameters before printing.

For a harder exercise, design a three-line tile whose edges still connect when repeated. Give each piece a consistent width so the seams align.

## Scope and origin

Inspired by [Project 35: Hex Grid](https://inventwithpython.com/bigbookpython/project35.html) by Al Sweigart. The WBasic code and smaller pattern were written anew to teach nested loops and string concatenation. The program does not print indefinitely.
