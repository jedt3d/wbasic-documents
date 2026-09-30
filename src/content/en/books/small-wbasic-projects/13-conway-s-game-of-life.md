---
title: "13 · Evolve Conway's Game of Life"
description: "Read the entire old grid before creating the next generation"
weight: 13
---

{{< project-download "13-conway-s-game-of-life" "PLAN.md" >}}
{{< project-download "13-conway-s-game-of-life" "draft.wbas.txt" >}}

> **Status: draft chapter; source check passed.** `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and project acceptance remain pending. This is not `main.wbas`.

## Goal and data

Game of Life has rules short enough to look like a project you could finish before the tea is ready. The trap is the word “simultaneously.” This chapter starts with a 5×5 Boolean grid, prints generation 0, then calculates and prints generation 1 once. `False` means dead and `True` means alive. Cells beyond the edges stay dead; the grid does not wrap around. The example starts with a horizontal line of three living cells in the middle. There is no live display, timer, or keyboard input.

## Rules and a hand trace

Count the eight neighboring positions, excluding the cell itself. A living cell survives with two or three living neighbors; a dead cell is born with exactly three. Thus the next state can be written `neighbors = 3 Or (alive And neighbors = 2)`.

Generation 0 has living cells at `(2,1)`, `(2,2)`, and `(2,3)`. The left and right ends each have one neighbor and die. The middle has two and survives. Cells `(1,2)` and `(3,2)` each see three and become alive. Generation 1 is a vertical line. If you modify the original grid while traversing it, later cells can see earlier changes. `NextGeneration` therefore reads only the old `grid` and builds a separate `next` grid row by row.

`AliveAt` checks the boundary before indexing, including corners. The draft assumes all rows have equal length; validating a malformed grid remains work to do before accepting external input.

## Draft program to read together

This code block displays exactly the same text as the downloadable draft. The source check passed; the computed output still needs a native run.

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' A false border outside the array is permanently dead.
Procedure AliveAt(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  If row < 0 Or row >= grid.Length Then
    Return 0
  EndIf
  If col < 0 Or col >= grid[row].Length Then
    Return 0
  EndIf
  If grid[row][col] Then
    Return 1
  EndIf
  Return 0
EndProcedure

Procedure NeighborCount(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  Let count As Integer = 0
  For dr As Integer = -1 To 1
    For dc As Integer = -1 To 1
      If dr <> 0 Or dc <> 0 Then
        count += AliveAt(grid, row + dr, col + dc)
      EndIf
    Next
  Next
  Return count
EndProcedure

Procedure NextGeneration(grid As Array Of (Array Of Boolean)) As Array Of (Array Of Boolean)
  Let next As Array Of (Array Of Boolean) = []
  For row As Integer = 0 To grid.Length - 1
    Let nextRow As Array Of Boolean = []
    For col As Integer = 0 To grid[row].Length - 1
      Let neighbors As Integer = NeighborCount(grid, row, col)
      Let lives As Boolean = neighbors = 3 Or (grid[row][col] And neighbors = 2)
      nextRow.Append(lives)
    Next
    next.Append(nextRow)
  Next
  Return next
EndProcedure

Procedure PrintGrid(grid As Array Of (Array Of Boolean))
  For row As Integer = 0 To grid.Length - 1
    Let line As String = ""
    For col As Integer = 0 To grid[row].Length - 1
      If grid[row][col] Then
        line += "#"
      Else
        line += "."
      EndIf
    Next
    PrintLn(line)
  Next
EndProcedure

Procedure Main()
  Let current As Array Of (Array Of Boolean) = [
    [False, False, False, False, False],
    [False, False, False, False, False],
    [False, True, True, True, False],
    [False, False, False, False, False],
    [False, False, False, False, False]
  ]
  PrintLn("generation 0")
  PrintGrid(current)
  Let next As Array Of (Array Of Boolean) = NextGeneration(current)
  PrintLn("generation 1")
  PrintGrid(next)
EndProcedure
```

## Acceptance scenarios still to verify

- **Given** the example's horizontal line **When** one generation is calculated **Then** only `(1,2)`, `(2,2)`, and `(3,2)` are alive.
- **Given** an all-dead grid **When** one generation is calculated **Then** every cell stays dead.
- **Given** a 2×2 block in the middle **When** one generation is calculated **Then** the block remains unchanged.
- **Given** one live corner cell **When** one generation is calculated **Then** it dies and nothing is born.

## Try it and identify the remaining work

Calculate generation 2 by hand first: the vertical line should become horizontal again. Add a procedure that checks every row's length, then separate printing from calculation so you can test the grid itself. A live mode would need a defined stopping rule, speed, and event loop using the verified boundaries of TUI/Jobs. This draft has not tested that integration. Native runs of one and several generations, boundaries, and malformed grids remain before promoting its status.

The idea began with [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project13.html); this WBasic explanation and draft were written anew.
