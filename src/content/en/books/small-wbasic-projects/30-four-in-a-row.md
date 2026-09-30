---
title: "30 · Four in a Row: Drop Pieces and Count Lines"
weight: 30
---

{{< project-download "30-four-in-a-row" >}}

A piece falls to the lowest empty cell of its column. After each move, we check whether the last player has four consecutive pieces. This is a **replay of predetermined columns**, with no live player input, and it stops at the first win. The replay isolates the game rules from an input interface that could be added later.

## Try running it

Download the file, open a terminal in its folder, and use `wb` with the native toolchain configured in Getting Started:

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
X wins
.......
.......
X......
XO.....
XO.....
XO.....
```

The sequence `[0, 1, 0, 1, 0, 1, 0]` uses zero-based column numbers. X drops four times in the leftmost column, while O drops three times in the next one. The board's top row remains empty.

## Read the code in stages

{{< project-source "30-four-in-a-row" >}}

The board is a one-dimensional array of 42 cells. `row * 7 + col` addresses a cell, with `row = 0` at the top. To place a piece, the program searches upward from row 5 until it finds `.`. Passing the top means the column is full. It checks the column number and fullness before writing the array.

`Four` examines the most recent cell in four directions: horizontal, vertical, and both diagonals. In each direction it counts matching pieces on both the positive and negative sides, so a new piece in the **middle** of a line can complete four. A one-sided check would miss that case. On finding four, the program reports the winner before changing turns.

## Change the rules to test them

Try `[0, 0, 0, 0, 0, 0, 0]`: after six moves the column is full, and the seventh should report `full column` without accessing a negative index. Make the first column `7` to get `invalid column`. Construct a horizontal or diagonal win to check counting on both sides.

How would you detect a draw after 42 cells without announcing one on a winning move? If you add `ReadLine()`, retain the existing win check and test malformed input separately.

## Scope and origin

Inspired by [Project 30: Four in a Row](https://inventwithpython.com/bigbookpython/project30.html) by Al Sweigart. This WBasic replay was written anew to teach dropping and line counting. It has no interactive game or draw announcement yet.
