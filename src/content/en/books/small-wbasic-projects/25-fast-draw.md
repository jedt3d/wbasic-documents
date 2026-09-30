---
title: "25 · Race to Press a Key After the Signal"
description: "Project plan: Race to Press a Key After the Signal"
weight: 25
---

{{< project-download "25-fast-draw" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Race to Press a Key After the Signal. The project needs to keep track of **the signal state and elapsed milliseconds**.

## Proposed method

Wait for a timer signal. Treat an early press as a false start and a later press as a response time.

## Project-specific acceptance check

A press before the signal cannot count as a win. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify the TUI timer, event timestamp or elapsed-time value, and real keyboard input.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project25.html). The WBasic explanation and source will be written anew.
