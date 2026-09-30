---
title: "76 · Tic-Tac-Toe Rules and Win Detection"
weight: 76
---

{{< project-download "76-tic-tac-toe" >}}

This chapter builds a **replay of the game's core rules** using predetermined moves, not a live two-player keyboard game. Empty cells, alternating turns, and winning lines can be tested without a game library, using arrays and procedures.

## Run the example sequence

Set up `wb` and the native toolchain from Getting Started, then run these commands in the downloaded file's folder:

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
X wins
XXX
OO.
...
```

Internal positions start at zero, reading left to right across rows. The sequence `[0, 3, 1, 4, 2]` lets X complete the top row before O's third move.

## Board and winning lines

{{< project-source "76-tic-tac-toe" >}}

`board` has nine cells, with dots for empty ones. `lines` records the eight winning triples: three rows, three columns, and two diagonals. Storing these repeated rules as data gives `Won` one loop instead of eight near-identical `If` statements.

`Won` reads the board without changing it and verifies that all three cells hold the requested player's `mark`. Merely checking that three cells are equal would count three empty dots as a win. `Main` checks a position's range and emptiness before writing the board. Invalid moves print a reason and end the replay. A valid move is checked for a win *before* changing players, so the winner is the player who just moved.

## Break it on purpose

`[0, 0]` should yield `occupied position`; `[-1]` or `[9]` should yield `invalid position` rather than an array bounds error. Try `[0, 1, 4, 2, 8]` for a diagonal win and `[0, 1, 3, 2, 6]` for a column win. With no win, the board appears without a winner message.

## Extend it to interaction

Live position entry with `ReadLine()`, number validation and retry, a draw when all nine cells fill, and replay prompts remain extensions. They can use Core I/O and control flow; the example has no AI. Keep input handling separate from move rules so the replay remains a regression fixture. A later TUI interface needs separate event and terminal-lifecycle checks; passing this replay does not validate a TUI.

## Origin

Inspired by [Project 76: Tic-Tac-Toe](https://inventwithpython.com/bigbookpython/project76.html) by Al Sweigart. This newly written rules exercise is smaller in scope than the original interactive game.
