---
title: "27 · Animate Fish in a Text Tank"
description: "Project plan: Animate Fish in a Text Tank"
weight: 27
---

{{< project-download "27-fish-tank" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Animate Fish in a Text Tank. The project needs to keep track of **each fish, its position, and swimming direction**.

## Proposed method

Move fish and reverse them at an edge while preserving the tank border.

## Project-specific acceptance check

A fish at the right edge turns left. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the TUI timer, viewport, and PRNG controlling movement.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project27.html). The WBasic explanation and source will be written anew.
