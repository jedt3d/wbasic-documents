---
title: "73 · Validate or Solve a Sudoku Grid"
description: "Start with a conflict checker, then plan a solver and puzzle generator"
weight: 73
---

{{< project-download "73-sudoku-puzzle" "PLAN.md" >}}
{{< project-download "73-sudoku-puzzle" "draft.wbas.txt" >}}

> **Status: draft chapter; source check passed.** `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and project acceptance remain pending. This draft only checks conflicts; it is not a solver, generator, or `main.wbas`.

## Goal and data

Start with a small, testable question: does this 9×9 board break a Sudoku rule? Use `0` for an empty cell and `1..9` for filled cells. No positive digit may appear twice in a row, column, or 3×3 box. `ValidBoard` returns `True` when it finds **no conflict so far**. It does not say that the board is complete, solvable, or uniquely solvable. Sudoku will not let us erase those distinctions with a smile.

## Check without getting lost in the boxes

`ValidGroup` uses ten `seen` entries, leaving index 0 unmarked. A value outside `0..9` is invalid immediately. Zero can appear several times because several cells can be empty. A positive digit already seen is a conflict. `ValidBoard` checks the number of rows and every row length **before** reading indices 0..8. It then gathers each column and each box with `boxRow*3+dr` and `boxCol*3+dc`.

Trace the first example row: `5,3,0,0,7,0,0,0,0`. Mark `seen[5]`, then `seen[3]`; skip the zeros. If you change cell `(0,2)` to 5, `seen[5]` is already true, so the row check returns `False` without needing to inspect the columns or boxes. Putting 5 at `(1,1)` also conflicts in the upper-left box.

## Draft program to read together

This code block displays exactly the same text as the downloadable draft. It specifies `legal so far` or `invalid board` output. The source check passed; native execution and the acceptance scenarios remain pending.

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Zero represents an empty cell. This checks legality, not solvability.
Procedure ValidGroup(values As Array Of Integer) As Boolean
  Let seen As Array Of Boolean = [False, False, False, False, False, False, False, False, False, False]
  For i As Integer = 0 To values.Length - 1
    Let value As Integer = values[i]
    If value < 0 Or value > 9 Then
      Return False
    EndIf
    If value > 0 Then
      If seen[value] Then
        Return False
      EndIf
      seen[value] = True
    EndIf
  Next
  Return True
EndProcedure

Procedure ValidBoard(board As Array Of (Array Of Integer)) As Boolean
  If board.Length <> 9 Then
    Return False
  EndIf
  For row As Integer = 0 To 8
    If board[row].Length <> 9 Then
      Return False
    EndIf
  Next
  For row As Integer = 0 To 8
    If Not ValidGroup(board[row]) Then
      Return False
    EndIf
    Let column As Array Of Integer = []
    For col As Integer = 0 To 8
      column.Append(board[col][row])
    Next
    If Not ValidGroup(column) Then
      Return False
    EndIf
  Next
  For boxRow As Integer = 0 To 2
    For boxCol As Integer = 0 To 2
      Let box As Array Of Integer = []
      For dr As Integer = 0 To 2
        For dc As Integer = 0 To 2
          box.Append(board[boxRow * 3 + dr][boxCol * 3 + dc])
        Next
      Next
      If Not ValidGroup(box) Then
        Return False
      EndIf
    Next
  Next
  Return True
EndProcedure

Procedure Main()
  Let board As Array Of (Array Of Integer) = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]
  If ValidBoard(board) Then
    PrintLn("legal so far")
  Else
    PrintLn("invalid board")
  EndIf
EndProcedure
```

## Acceptance scenarios still to verify

- **Given** the example board with zeros **When** it is checked **Then** `True` means only that no conflict has been found.
- **Given** cell `(0,2)` changed to 5 **When** it is checked **Then** the result is `False` because the first row contains two 5s.
- **Given** a repeated digit in a column or box **When** it is checked **Then** the result is `False`.
- **Given** a row shorter than nine cells, or a value of −1 or 10 **When** it is checked **Then** the result is `False` without an out-of-bounds read.
- **Given** a legal but incomplete board **When** it is checked **Then** it must not be reported as solved or uniquely solvable.

## From checker to solver

A backtracking solver is a **later step**: choose one zero cell, try candidates 1 through 9, check the row, column, and box before placing a candidate, then recursively handle the next empty cell. If that path fails, restore zero and try the next candidate. Finding no empty cells yields one solution. Decide whether to stop at the first solution or keep counting. To establish uniqueness, count until a second solution is found and then stop. Keep the original puzzle separate from the working board so backtracking cannot destroy the input.

A generator is another step beyond that: start from a complete board, remove a clue, and count solutions after each removal. Keep a removal only while the board still has exactly one solution. Randomizing the order requires a defined seed and tested PRNG range. **SWP-FR-01** is a library request for randomness, not an API used by this draft.

Exercise: add `IsComplete` to distinguish a full board from a partially filled legal board, and test duplicate digits in rows, columns, and boxes separately. Remaining work includes a native run of the checker, a solver tested with zero and multiple solutions, a generator with uniqueness proof, and input handling.

The idea began with [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project73.html); this WBasic explanation and draft were written anew.
