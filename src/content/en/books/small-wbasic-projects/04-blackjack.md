---
title: "04 · Play Blackjack Against a Dealer"
description: "Project plan: Play Blackjack Against a Dealer"
weight: 4
---

{{< project-download "04-blackjack" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Play Blackjack Against a Dealer. The project needs to keep track of **a 52-card deck and both hands**.

## Proposed method

Shuffle the deck with a fixed seed. Count an ace as 11, then reduce it to 1 if the hand exceeds 21.

## Project-specific acceptance check

An ace, 9, and 5 have a value of 15. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Build the deck and verify a seeded PRNG for shuffling; WBasic has no public random API.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project4.html). The WBasic explanation and source will be written anew.
