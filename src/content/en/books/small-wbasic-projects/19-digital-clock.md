---
title: "19 · Show the Current Time as a Digital Clock"
description: "Project plan: Show the Current Time as a Digital Clock"
weight: 19
---

{{< project-download "19-digital-clock" "PLAN.md" >}}

> **Status: Missing API for the original form.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Show the Current Time as a Digital Clock. The project needs to keep track of **hours, minutes, seconds, and redraw signals**.

## Proposed method

Read wall-clock time once an API exists; use the timer only to request redraws.

## Project-specific acceptance check

A supplied time of 09:05:07 renders exactly as 09:05:07, without guessing from ticks. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Missing API for the original form: there is no wall-clock or DateTime API. A TUI timer alone cannot report current time. Rendering a supplied 09:05:07 tests formatting only; it does not make a clock that reads the current time.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project19.html). The WBasic explanation and source will be written anew.
