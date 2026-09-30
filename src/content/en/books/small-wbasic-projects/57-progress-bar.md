---
title: "57 · Show Task Progress as a Bar"
description: "Project plan: Show Task Progress as a Bar"
weight: 57
---

{{< project-download "57-progress-bar" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Show Task Progress as a Bar. The project needs to keep track of **total work, completed work, and bar width**.

## Proposed method

Compute the number of filled cells and redraw when progress changes.

## Project-specific acceptance check

At 5 of 10 tasks with width 10, five cells are filled. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

A static percentage bar is feasible; live updates require verification of the TUI timer.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project57.html). The WBasic explanation and source will be written anew.
