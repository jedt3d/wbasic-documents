---
title: "31 · Guess a Number with Higher-or-Lower Clues"
description: "Project plan: Guess a Number with Higher-or-Lower Clues"
weight: 31
---

{{< project-download "31-guess-the-number" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Guess a Number with Higher-or-Lower Clues. The project needs to keep track of **the secret-number bounds and guess count**.

## Proposed method

Choose the secret number from a fixed seed and respond whether a guess is too high or too low.

## Project-specific acceptance check

With secret number 7, guessing 5 gets a higher clue. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG used to select the secret number. A mode with a predetermined number is feasible.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project31.html). The WBasic explanation and source will be written anew.
