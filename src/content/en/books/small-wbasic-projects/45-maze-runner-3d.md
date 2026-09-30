---
title: "45 · Render a Text-Based First-Person Maze"
description: "Project plan: Render a Text-Based First-Person Maze"
weight: 45
---

{{< project-download "45-maze-runner-3d" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Render a Text-Based First-Person Maze. The project needs to keep track of **the maze map, facing direction, and view**.

## Proposed method

Project front and side walls into a text drawing, then handle turns and forward movement.

## Project-specific acceptance check

Four right turns return the player to the original facing direction. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify view rendering and TUI key input on a real terminal.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project45.html). The WBasic explanation and source will be written anew.
