---
title: "47 · Generate Mondrian-Style Rectangles"
description: "Project plan: Generate Mondrian-Style Rectangles"
weight: 47
---

{{< project-download "47-mondrian-art-generator" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Generate Mondrian-Style Rectangles. The project needs to keep track of **the canvas, subdivided rectangles, and colors**.

## Proposed method

Split the canvas using seeded choices, then draw lines and colors within the viewport.

## Project-specific acceptance check

No subdivided rectangle exceeds the screen bounds. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify TUI color, viewport dimensions, and the PRNG used for positions.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project47.html). The WBasic explanation and source will be written anew.
