---
title: "14 · Display a Timed Countdown"
description: "Project plan: Display a Timed Countdown"
weight: 14
---

{{< project-download "14-countdown" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Display a Timed Countdown. The project needs to keep track of **the initial number and timer ticks**.

## Proposed method

Subtract one for each TimerEvent in a TUI session and stop at zero.

## Project-specific acceptance check

Starting at 3 displays 3, 2, 1, 0, with no negative number. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

A TUI session can use its timer without a wall-clock API. Test timer startup, shutdown, terminal-mode restoration, and actual display. Injected ticks test the counting rule but do not by themselves verify a working countdown.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project14.html). The WBasic explanation and source will be written anew.
