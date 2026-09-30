---
title: "53 · Look Up Elements in the Periodic Table"
description: "Project plan: Look Up Elements in the Periodic Table"
weight: 53
---

{{< project-download "53-periodic-table-of-the-elements" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Look Up Elements in the Periodic Table. The project needs to keep track of **atomic numbers, symbols, and names**.

## Proposed method

Read a provenance-checked element dataset and search it by number or symbol.

## Project-specific acceptance check

Atomic number 1 returns H; atomic number 0 has no match. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Prepare an element dataset with appropriate reuse rights, then verify file loading or embedded data.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project53.html). The WBasic explanation and source will be written anew.
