---
title: "10 · Bet on Odd or Even with Two Dice"
description: "Project plan: Bet on Odd or Even with Two Dice"
weight: 10
---

{{< project-download "10-cho-han" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Bet on Odd or Even with Two Dice. The project needs to keep track of **two die results and an odd-or-even guess**.

## Proposed method

Generate two values from 1 to 6 and compare the sum's parity with the guess.

## Project-specific acceptance check

A roll of 2 and 5 has an odd sum. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify a seedable dice PRNG; WBasic has no public random API.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project10.html). The WBasic explanation and source will be written anew.
