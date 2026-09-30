---
title: "55 · Simulate Lottery Tickets and Draws"
description: "Project plan: Simulate Lottery Tickets and Draws"
weight: 55
---

{{< project-download "55-powerball-lottery" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Simulate Lottery Tickets and Draws. The project needs to keep track of **tickets, winning numbers, and simulation rounds**.

## Proposed method

Generate nonrepeating numbers from a fixed seed and count matches.

## Project-specific acceptance check

No ticket contains a duplicate number. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the PRNG, uniqueness of numbers, and limits of large simulations.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project55.html). The WBasic explanation and source will be written anew.
