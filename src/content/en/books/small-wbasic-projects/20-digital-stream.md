---
title: "20 · Animate Streams of Characters"
description: "Project plan: Animate Streams of Characters"
weight: 20
---

{{< project-download "20-digital-stream" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Animate Streams of Characters. The project needs to keep track of **character columns and the screen height**.

## Proposed method

Advance columns each tick, generate new characters from a fixed seed, and trim anything beyond the bottom.

## Project-specific acceptance check

On a screen five rows high, no sixth row is retained or drawn. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the TUI timer, display area, and the PRNG used to choose characters.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project20.html). The WBasic explanation and source will be written anew.
