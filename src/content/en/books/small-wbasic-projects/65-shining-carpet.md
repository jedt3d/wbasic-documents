---
title: "65 · A Six-Line Repeating Carpet"
weight: 65
---

{{< project-download "65-shining-carpet" >}}

First draw one pattern tile, then ask the computer to repeat it. The key design question is whether its edges still form a coherent pattern when joined. We use a new six-line geometric tile for WBasic, repeating each line three times horizontally and the six-line group twice vertically. It does not recreate the film carpet in detail.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
/\  /\/\  /\/\  /\
\ \/ /\ \/ /\ \/ /
 \__/ \__/ \__/
/ __ \/ __ \/ __ \
/ /  \/ /  \/ /  \
\/\/\/
/\  /\/\  /\/\  /\
\ \/ /\ \/ /\ \/ /
 \__/ \__/ \__/
/ __ \/ __ \/ __ \
/ /  \/ /  \/ /  \
\/\/\/
```

## Separate drawing from repetition

{{< project-source "65-shining-carpet" >}}

The `tile` array holds six strings, one for each line of the unit pattern. The outer loop counts vertical rows of tiles; the middle loop visits the six lines; `Repeat` concatenates one line horizontally before it is printed. Order matters. Repeating all six lines before moving to the next column would stack blocks rather than place them side by side.

Output has `6 * rows` lines, each assembled from `columns` pieces. No graphics library is needed, but spacing and edges need deliberate design. Pieces with inconsistent widths will bend or break the seam. This starting example still has unequal line widths, especially its sixth line. It demonstrates text repetition, not a seamless rectangular carpet; making the rows equally wide is the next exercise.

## Redesign it

Set `columns = 1` to examine one tile, then `rows = 1` to check that six lines remain. Change only the third tile line and observe its horizontal seam. As an exercise, create an equal-width tile that connects in both directions.

## Scope and origin

Inspired by reducing a large pattern to a repeating unit in [Project 65: Shining Carpet](https://inventwithpython.com/bigbookpython/project65.html) by Al Sweigart. This pattern was written anew, is intentionally shorter, and uses neither the original artwork nor source.
