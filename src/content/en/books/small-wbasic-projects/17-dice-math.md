---
title: "17 · Practice Addition with Dice"
description: "Project plan: Practice Addition with Dice"
weight: 17
---

{{< project-download "17-dice-math" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Practice Addition with Dice. The project needs to keep track of **two die values, their addition problem, and the user's answer**.

## Proposed method

Generate the die values from a fixed seed and check their sum against the answer.

## Project-specific acceptance check

For 3 + 4, accept 7 and reject 6. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Random problems need a tested seeded PRNG.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project17.html). The WBasic explanation and source will be written anew.
