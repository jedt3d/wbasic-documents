---
title: "73 · Validate or Solve a Sudoku Grid"
description: "Project plan: Validate or Solve a Sudoku Grid"
weight: 73
---

{{< project-download "73-sudoku-puzzle" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Validate or Solve a Sudoku Grid. The project needs to keep track of **a 9×9 grid and candidates for empty cells**.

## Proposed method

Check rows, columns, and boxes, then solve by backtracking.

## Project-specific acceptance check

A row containing two 5s is invalid. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

A validator is feasible; a puzzle generator must verify unique solutions and its PRNG.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project73.html). The WBasic explanation and source will be written anew.
