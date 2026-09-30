---
title: "18 · Parse Dice Notation and Add Rolls"
description: "Project plan: Parse Dice Notation and Add Rolls"
weight: 18
---

{{< project-download "18-dice-roller" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Parse Dice Notation and Add Rolls. The project needs to keep track of **an NdM dice expression and its modifier**.

## Proposed method

Parse the dice count, sides, and optional signed modifier. Validate the ranges, roll and total the dice, then add the modifier with an Integer overflow check.

## Project-specific acceptance check

A result for 2d6+3 lies between 5 and 15. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Implement an NdM parser with an optional +K/-K modifier and a PRNG, with explicit range and overflow checks.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project18.html). The WBasic explanation and source will be written anew.
