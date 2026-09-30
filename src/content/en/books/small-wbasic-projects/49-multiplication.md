---
title: "49 · Multiplication Table with Nested Loops"
weight: 49
---

{{< project-download "49-multiplication" >}}

This chapter builds a 4 × 4 multiplication table with two `For` loops. It uses the language and Core I/O without an extra library. Small numbers make the output easy to check by eye before expanding it.

## Before starting

Set up `wb` and a native developer toolchain as described in Getting Started. Download `main.wbas`, open its folder in a terminal, and run:

```powershell
wb check main.wbas --json
wb run main.wbas
```

`check` checks the source; `run` compiles, links, and executes it. Passing a source check alone does not show that the machine can run the native program.

## Expected result

```text
1 2 3 4
2 4 6 8
3 6 9 12
4 8 12 16
```

This version separates numbers with spaces but does not align column widths as a larger table might. It demonstrates the order of data, not a layout system.

## Read the code piece by piece

{{< project-source "49-multiplication" >}}

The `row` loop selects a multiplication row, and `column` visits its multipliers. One outer iteration completes all four inner iterations before printing a line. WBasic `For` includes the endpoint, so `1 To 4` has four values.

`line` starts empty for every row. Its placement inside the outer loop matters as much as the multiplication: moving it outside without resetting it would append the first row to the second. The `column > 1` condition inserts a space *between* numbers, leaving no leading or trailing space. `.ToString()` converts each product explicitly before string concatenation.

## Check your understanding

Check the top-left result, 1, and bottom-right result, 16. Values in each row increase by that row's number. Changing the size to 3 should yield three lines, ending with `3 6 9`; test both the line count and the numbers, not merely that the program runs.

As an extension, write a procedure that pads each number to three characters before adding it to `line`, using strings and loops. String length works for these ASCII digits but should not be treated as visible width for general Thai terminal text.

## Origin and adaptation

Inspired by [Project 49: Multiplication Table](https://inventwithpython.com/bigbookpython/project49.html) by Al Sweigart. The code and explanation were written anew, with a smaller table and no header to emphasize variable scope and nested loops.
