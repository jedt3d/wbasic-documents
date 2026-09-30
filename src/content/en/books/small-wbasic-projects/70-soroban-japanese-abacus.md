---
title: "70 · Display and Adjust a Japanese Abacus"
description: "Project plan: Display and Adjust a Japanese Abacus"
weight: 70
---

{{< project-download "70-soroban-japanese-abacus" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Display and Adjust a Japanese Abacus. The project needs to keep track of **upper and lower beads in each place**.

## Proposed method

Move the selected bead and calculate the value from beads touching the beam.

## Project-specific acceptance check

One upper bead and two lower beads represent 7. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

A static image is feasible; key control and state changes need TUI verification.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project70.html). The WBasic explanation and source will be written anew.
