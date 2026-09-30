---
title: "59 · Play Rock, Paper, Scissors Against the Computer"
description: "Project plan: Play Rock, Paper, Scissors Against the Computer"
weight: 59
---

{{< project-download "59-rock-paper-scissors" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Play Rock, Paper, Scissors Against the Computer. The project needs to keep track of **the player's and computer's moves**.

## Proposed method

Choose the computer's move from a fixed seed and compare it against the winning pairs.

## Project-specific acceptance check

Rock beats scissors and loses to paper. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG used for the computer's choice.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project59.html). The WBasic explanation and source will be written anew.
