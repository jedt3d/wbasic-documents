---
title: "33 · Find a Password from Positional Matches"
description: "Project plan: Find a Password from Positional Matches"
weight: 33
---

{{< project-download "33-hacking-minigame" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Find a Password from Positional Matches. The project needs to keep track of **a list of equal-length words and the answer**.

## Proposed method

Choose the answer with a fixed seed and count matching positions in each guess.

## Project-specific acceptance check

Comparing CAT with CAR gives two positional matches. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

The comparison rule is feasible; selecting the answer randomly needs a verified PRNG.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project33.html). The WBasic explanation and source will be written anew.
