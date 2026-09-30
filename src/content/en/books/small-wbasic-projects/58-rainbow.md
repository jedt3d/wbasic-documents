---
title: "58 · Animate a Text Rainbow"
description: "Project plan: Animate a Text Rainbow"
weight: 58
---

{{< project-download "58-rainbow" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Animate a Text Rainbow. The project needs to keep track of **seven colors and the pattern position**.

## Proposed method

Shift colors each tick, with a monochrome fallback.

## Project-specific acceptance check

After seven ticks, the pattern returns to its starting position. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify terminal color capability and the TUI timer.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project58.html). The WBasic explanation and source will be written anew.
