---
title: "39 · Turn an Ant and Flip Grid Cells"
description: "Project plan: Turn an Ant and Flip Grid Cells"
weight: 39
---

{{< project-download "39-langton-s-ant" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Turn an Ant and Flip Grid Cells. The project needs to keep track of **the ant's position and direction, and cell colors**.

## Proposed method

Read the current cell color, turn the ant, flip the color, then move one cell.

## Project-specific acceptance check

On a white cell, the ant turns right and leaves the cell black. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Array logic is feasible; continuous play needs verification of the TUI timer.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project39.html). The WBasic explanation and source will be written anew.
