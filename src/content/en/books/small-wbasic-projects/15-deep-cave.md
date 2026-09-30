---
title: "15 · Generate a Shifting Deep-Cave View"
description: "Project plan: Generate a Shifting Deep-Cave View"
weight: 15
---

{{< project-download "15-deep-cave" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Generate a Shifting Deep-Cave View. The project needs to keep track of **the left and right cave edges on each row**.

## Proposed method

Move each edge by at most one cell according to a fixed seed while keeping a passage open.

## Project-specific acceptance check

On every row, the left edge precedes the right edge. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Specify the PRNG and verify image updates driven by the TUI timer.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project15.html). The WBasic explanation and source will be written anew.
