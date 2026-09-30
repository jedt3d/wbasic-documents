---
title: "67 · Move a Message Along a Sine Wave"
description: "Project plan: Move a Message Along a Sine Wave"
weight: 67
---

{{< project-download "67-sine-message" "PLAN.md" >}}

> **Status: Missing API for the original form.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Move a Message Along a Sine Wave. The project needs to keep track of **the message and a table of horizontal offsets**.

## Proposed method

Use a fixed wave pattern when Sin is unavailable.

## Project-specific acceptance check

The offsets 0, 1, 2, 1 cycle back to 0. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Missing API for the original form: Math.Sin is absent. A chosen offset sequence is a sample wave pattern, not a sine result for arbitrary angles. A sine lookup table must state its angle range and error; moving output also needs TUI verification.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project67.html). The WBasic explanation and source will be written anew.
