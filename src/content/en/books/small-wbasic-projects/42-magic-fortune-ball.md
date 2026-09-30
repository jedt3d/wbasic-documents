---
title: "42 · Answer Questions with Fortune Responses"
description: "Project plan: Answer Questions with Fortune Responses"
weight: 42
---

{{< project-download "42-magic-fortune-ball" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Answer Questions with Fortune Responses. The project needs to keep track of **a collection of fortunes and the user's questions**.

## Proposed method

Read each question, choose a response from a fixed seed, and continue until EOF.

## Project-specific acceptance check

The same seed yields the same sequence of responses. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Use a PRNG or supplied seed to make response selection repeatable.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project42.html). The WBasic explanation and source will be written anew.
