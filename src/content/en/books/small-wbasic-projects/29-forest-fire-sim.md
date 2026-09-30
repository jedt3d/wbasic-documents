---
title: "29 · Simulate Fire Spreading on a Grid"
description: "Project plan: Simulate Fire Spreading on a Grid"
weight: 29
---

{{< project-download "29-forest-fire-sim" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Simulate Fire Spreading on a Grid. The project needs to keep track of **a grid of trees, fire, and ash**.

## Proposed method

Compute the next generation from the old grid and seeded spread decisions.

## Project-specific acceptance check

A cell burning in this generation becomes ash in the next. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG, TUI timer, and grid-edge conditions.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project29.html). The WBasic explanation and source will be written anew.
