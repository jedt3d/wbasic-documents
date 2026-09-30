---
title: "05 · Bounce a Logo and Count Corner Hits"
description: "Project plan: Bounce a Logo and Count Corner Hits"
weight: 5
---

{{< project-download "05-bouncing-dvd-logo" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Bounce a Logo and Count Corner Hits. The project needs to keep track of **the logo coordinates, travel direction, and screen dimensions**.

## Proposed method

Advance the logo on each tick and reverse direction when it reaches an edge.

## Project-specific acceptance check

After hitting the right edge, horizontal direction dx is negative. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the TUI timer, viewport dimensions, and repeated rendering on a real terminal.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project5.html). The WBasic explanation and source will be written anew.
