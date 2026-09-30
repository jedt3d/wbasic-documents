---
title: "34 · Guess Letters Before the Drawing Is Complete"
description: "Project plan: Guess Letters Before the Drawing Is Complete"
weight: 34
---

{{< project-download "34-hangman-guillotine" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Guess Letters Before the Drawing Is Complete. The project needs to keep track of **the target word, guessed letters, and penalty count**.

## Proposed method

Reveal every position containing a correct letter and avoid charging for repeated guesses.

## Project-specific acceptance check

Guessing A in BANANA reveals three positions. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Choose words from a word bank and verify Unicode-scalar handling and multiline drawing.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project34.html). The WBasic explanation and source will be written anew.
