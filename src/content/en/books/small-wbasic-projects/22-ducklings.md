---
title: "22 · Move Ducklings Across the Screen"
description: "Project plan: Move Ducklings Across the Screen"
weight: 22
---

{{< project-download "22-ducklings" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Move Ducklings Across the Screen. The project needs to keep track of **each duckling's position and multirow drawing**.

## Proposed method

Move ducklings on each tick and remove any that have left the screen.

## Project-specific acceptance check

A duckling beyond the edge no longer remains in state. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the TUI timer, viewport, and seeded PRNG controlling spacing.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project22.html). The WBasic explanation and source will be written anew.
