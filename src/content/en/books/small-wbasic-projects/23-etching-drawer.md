---
title: "23 · Draw on a Grid with Direction Keys"
description: "Project plan: Draw on a Grid with Direction Keys"
weight: 23
---

{{< project-download "23-etching-drawer" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Draw on a Grid with Direction Keys. The project needs to keep track of **the marked grid and pen position**.

## Proposed method

Read direction keys, move the pen within bounds, and mark visited cells.

## Project-specific acceptance check

On a 3×3 grid, moving right then down leaves marks in three cells. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify TUI key events and preservation of the drawing grid through resizing.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project23.html). The WBasic explanation and source will be written anew.
