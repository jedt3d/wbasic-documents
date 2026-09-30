---
title: "13 · Evolve Conway's Game of Life"
description: "Project plan: Evolve Conway's Game of Life"
weight: 13
---

{{< project-download "13-conway-s-game-of-life" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Evolve Conway's Game of Life. The project needs to keep track of **two generations of Boolean grid cells**.

## Proposed method

Count each cell's eight neighbors in the old generation, then update all cells together.

## Project-specific acceptance check

A horizontal line of three live cells becomes a vertical line of three. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Array logic can implement the cell rules; live play still requires verification of TUI timer and key events.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project13.html). The WBasic explanation and source will be written anew.
