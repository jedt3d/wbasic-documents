---
title: "03 · Bitmap Message"
description: "Read a map of blank and filled cells, then fill the shape with letters from a message"
weight: 3
---

{{< project-download "03-bitmap-message" >}}

## Goal and scope

Imagine a small picture made only of empty and filled cells. We store it as five rows of text: `#` marks a cell that should display a letter, while a space marks the background. The program repeatedly uses the letters of `HI` in the filled cells. The result is a picture made from a real message, not a picture printed in advance. The fixed, small bitmap makes each choice easy to inspect. There is no keyboard input, so every run produces the same result.

## Prepare, run, and observe

Download `main.wbas`, open a terminal in its folder, and use `wb` on a development machine with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles and links before executing. If you built the WBasic tools from the product repository, first run `cargo build --workspace --locked` at its root. The recorded examples use compiler `2614b37`. The newer R8A/R8B line supports `wb build` for development with a native SDK; this is not production/no-SDK distribution acceptance. Some rows have leading and trailing spaces; preserve them when checking the shape:

```text
Bitmap message: HI
  H  
 IHI 
HIHIH
 IHI 
  H  
```

{{< project-source "03-bitmap-message" >}}

## Why the letters repeat

`mask` is an array of strings, one per row. The outer loop selects a row; the inner loop visits its columns from zero to the end. A blank map cell adds a space to `line`. Otherwise, `column Mod message.Length` selects a character from `message`. With a two-letter message, columns 0, 2, and 4 use `H`, while columns 1 and 3 use `I`. Using the column number keeps the letter pattern aligned across rows.

We create a fresh `line` for each row and call `PrintLn` once after the inner loop. Moving the initialization outside the outer loop would append each new row to the last. `#` is only a filled-cell marker; replacing it with `X` would leave the shape unchanged because the condition distinguishes spaces from everything else. An empty message would make `column Mod message.Length` divide by zero. A version accepting user input must check the length before drawing.

## Try next

1. Change the message to `ABC` and work out a five-column row by hand before running it.
2. Make a rectangular map with a hole in the middle, keeping every row the same length.
3. Let letters continue from one row to the next. How would you count filled cells separately from columns?

The text-picture idea was inspired by [Big Book of Small Python Projects, Project 3: Bitmap Message](https://inventwithpython.com/bigbookpython/project3.html) by Al Sweigart. This bitmap and WBasic source were written anew.
