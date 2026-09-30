---
title: "48 · Compare Staying and Switching in Monty Hall"
description: "Project plan: Compare Staying and Switching in Monty Hall"
weight: 48
---

{{< project-download "48-monty-hall" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Compare Staying and Switching in Monty Hall. The project needs to keep track of **three doors, the prize door, and the host's reveal**.

## Proposed method

Reveal an unchosen losing door, then compare the stay and switch outcomes.

## Project-specific acceptance check

If the prize is behind door 1 and door 2 is chosen, revealing door 3 makes switching a win. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG and the host rule that only a losing door is opened.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project48.html). The WBasic explanation and source will be written anew.
