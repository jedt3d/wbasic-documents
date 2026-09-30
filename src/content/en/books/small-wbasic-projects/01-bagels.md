---
title: "01 · Guess a Three-Digit Code from Positional Clues"
description: "Project plan: Guess a Three-Digit Code from Positional Clues"
weight: 1
---

{{< project-download "01-bagels" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Guess a Three-Digit Code from Positional Clues. The project needs to keep track of **a three-digit code with distinct digits and clues for guesses**.

## Proposed method

Shuffle digits 0–9 with a fixed seed, then compare each guessed digit by value and position.

## Project-specific acceptance check

For code 248, guess 843 gives one correct-position digit and one wrong-position digit. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Write a seeded random generator in the chapter and check its integer bounds; WBasic has no public random API. A specified and tested seed can support the algorithm.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project1.html). The WBasic explanation and source will be written anew.
