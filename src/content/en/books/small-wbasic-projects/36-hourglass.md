---
title: "36 · An Hourglass in Time Steps"
weight: 36
---

{{< project-download "36-hourglass" >}}

We simulate three grains of sand in a small grid, printing the picture after each time step. Each grain can fall one cell per step if the cell below is empty. Vertical borders distinguish the simulated area from the background. This is a **straight-down gravity model**, not a reversible hourglass or continuous animation.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
start
| o |
| o |
| o |
|   |
|   |
tick 1
|   |
| o |
| o |
| o |
|   |
tick 2
|   |
|   |
| o |
| o |
| o |
```

## Why update from bottom to top?

{{< project-source "36-hourglass" >}}

The `sand` array stores zero for an empty cell and one for a grain. `row * 5 + col` converts two-dimensional coordinates into one index. `Show` reads state and builds fresh output lines without changing the array, so it can show both the initial and updated states.

The update loop starts at row 3 and moves toward row 0. A newly fallen grain is then below the loop's current position. If we scanned top to bottom, one grain could fall several cells during a single step, undermining the definition of a step. A grain above another stays put until a later step.

## Change the state

Remove the grain at index 12 and watch how the gap moves through the group. Add a grain on the bottom row; it must not move or trigger an out-of-bounds read. As an extension, let a blocked grain try down-left or down-right, checking walls before array access and defining which side takes priority for reproducible results.

## Scope and origin

Inspired by [Project 36: Hourglass](https://inventwithpython.com/bigbookpython/project36.html) by Al Sweigart. This WBasic version defines two deterministic steps, with no randomness, delay, or terminal animation.
