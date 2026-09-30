---
title: "68 · Slide Numbered Tiles into the Empty Space"
description: "Project plan: Slide Numbered Tiles into the Empty Space"
weight: 68
---

{{< project-download "68-sliding-tile-puzzle" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Slide Numbered Tiles into the Empty Space. The project needs to keep track of **the board, empty space, and move direction**.

## Proposed method

Shuffle a solved board through legal moves so the resulting puzzle remains solvable.

## Project-specific acceptance check

A tile adjacent to the empty space can move; a distant tile cannot. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify generation of solvable boards and the shuffling PRNG. Text-command input is feasible.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project68.html). The WBasic explanation and source will be written anew.
