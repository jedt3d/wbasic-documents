---
title: "63 · Play the Royal Game of Ur"
description: "Project plan: Play the Royal Game of Ur"
weight: 63
---

{{< project-download "63-royal-game-of-ur" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Play the Royal Game of Ur. The project needs to keep track of **piece paths, die results, and safe spaces**.

## Proposed method

Roll from a fixed seed and move pieces according to the rules for each space.

## Project-specific acceptance check

A roll of zero does not move a piece. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Specify the dice rules and verify the PRNG and command input.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project63.html). The WBasic explanation and source will be written anew.
