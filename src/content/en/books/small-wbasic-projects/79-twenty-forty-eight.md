---
title: "79 · Slide and Merge 2048 Tiles"
description: "Project plan: Slide and Merge 2048 Tiles"
weight: 79
---

{{< project-download "79-twenty-forty-eight" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Slide and Merge 2048 Tiles. The project needs to keep track of **a 4×4 board and move direction**.

## Proposed method

Merge equal tiles only once per turn and add a new tile only when the board changes.

## Project-specific acceptance check

Before adding a new tile, sliding 2,2,2,0 left produces 4,2,0,0. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG used to spawn tiles and TUI key input.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project79.html). The WBasic explanation and source will be written anew.
