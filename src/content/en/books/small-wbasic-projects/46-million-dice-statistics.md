---
title: "46 · Count Frequencies in a Million Dice Rolls"
description: "Project plan: Count Frequencies in a Million Dice Rolls"
weight: 46
---

{{< project-download "46-million-dice-statistics" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Count Frequencies in a Million Dice Rolls. The project needs to keep track of **frequency buckets for sums from 2 to 12**.

## Proposed method

Roll two seeded dice one million times and count each sum in its bucket.

## Project-specific acceptance check

The counts across all buckets total one million. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG, Integer range, and runtime for one million iterations.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project46.html). The WBasic explanation and source will be written anew.
