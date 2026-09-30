---
title: "62 · Draw a Rotating Cube in Text"
description: "Project plan: Draw a Rotating Cube in Text"
weight: 62
---

{{< project-download "62-rotating-cube" "PLAN.md" >}}

> **Status: Missing API for the original form.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Draw a Rotating Cube in Text. The project needs to keep track of **vertices, rotation angles, and screen projections**.

## Proposed method

Use sin and cos or a bounded angle lookup table, then project and draw the vertices.

## Project-specific acceptance check

After a full rotation, projected coordinates return to their starting values within a stated tolerance. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Missing API for the original form: trigonometric functions are absent. A precomputed angle table can teach projection, but its angular resolution and numerical error must be stated and tested. Verify Float calculations and TUI frames; animation still needs working TUI events and frame rendering.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project62.html). The WBasic explanation and source will be written anew.
