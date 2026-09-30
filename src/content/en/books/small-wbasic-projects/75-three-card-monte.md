---
title: "75 · Track a Target Card Through Swaps"
description: "Project plan: Track a Target Card Through Swaps"
weight: 75
---

{{< project-download "75-three-card-monte" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Track a Target Card Through Swaps. The project needs to keep track of **three card positions, the target, and the swaps**.

## Proposed method

Choose seeded swaps and update the target position after every swap.

## Project-specific acceptance check

Starting at position 1, swaps 1–3 then 2–3 leave the target at position 2. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the shuffling PRNG and, if swaps are animated, the TUI timer.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project75.html). The WBasic explanation and source will be written anew.
