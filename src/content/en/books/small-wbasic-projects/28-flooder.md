---
title: "28 · Recolor a Connected Grid Region"
description: "Project plan: Recolor a Connected Grid Region"
weight: 28
---

{{< project-download "28-flooder" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Recolor a Connected Grid Region. The project needs to keep track of **a color grid, starting cell, and replacement color**.

## Proposed method

Find all old-color cells connected in four directions and replace them as one region.

## Project-specific acceptance check

A connected group of three A cells changes all three cells. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

The flood-fill algorithm is feasible; verify TUI key input and color rendering.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project28.html). The WBasic explanation and source will be written anew.
