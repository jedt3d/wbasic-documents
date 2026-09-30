---
title: "64 · Seven-Segment Digits from Bits"
weight: 64
---

{{< project-download "64-seven-segment-display-module" >}}

An old calculator digit is made of seven short segments that can each be on or off. We encode their states as bits in one Integer, then draw several digits row by row. This separates *which segments should light* from *how they are drawn*. The example remains one file, not an importable module.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
 _   _   _   _ 
 _| | |  _| |_ 
|_  |_| |_  |_|
```

## Turn bits into lines

{{< project-source "64-seven-segment-display-module" >}}

Bit weights are 1 for top, 2 upper-left, 4 upper-right, 8 middle, 16 lower-left, 32 lower-right, and 64 bottom. `Lit(mask, bit)` uses integer division and modulo 2 to check a bit without another bitwise API. Digit 8 lights all seven, so its mask is 127.

`DigitRow` makes three characters for one digit in a selected row: the top row has the top bar; the middle has upper-left, middle, and upper-right; the bottom has lower-left, bottom, and lower-right. `Main` draws one row across all four digits before printing it. Drawing one entire digit first would print its three rows before the next digit and fail to form a multi-digit display.

## Experiment

Set `digits` to `[8]` and inspect all seven segments. Try `[1, 0]`: blank areas in the top row are part of each digit's width, not missing data. Reject values outside 0–9 before indexing `masks`. As an extension, define a minus sign with its own mask and make clear that it is not a tenth numeric digit.

## Scope and origin

Inspired by [Project 64: Seven-Segment Display Module](https://inventwithpython.com/bigbookpython/project64.html) by Al Sweigart. This newly written WBasic example draws one data set; it is not packaged as a public module or external API.
