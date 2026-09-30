---
title: "09 · Play Carrot in a Box"
description: "Project plan: Play Carrot in a Box"
weight: 9
---

{{< project-download "09-carrot-in-a-box" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Play Carrot in a Box. The project needs to keep track of **two boxes, the carrot's position, and each player's answer**.

## Proposed method

Choose the carrot's box from a fixed seed and hide it from the guesser until a box is chosen.

## Project-specific acceptance check

The guesser sees the boxes but not the carrot before the reveal. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Use a verified seeded PRNG to choose the box, and test whether the console presentation actually hides information from the guesser.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project9.html). The WBasic explanation and source will be written anew.
