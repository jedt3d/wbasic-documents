---
title: "08 · Print a Monthly Calendar"
description: "Project plan: Print a Monthly Calendar"
weight: 8
---

{{< project-download "08-calendar-maker" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Print a Monthly Calendar. The project needs to keep track of **the year, month, and weekday on which the month begins**.

## Proposed method

Compute leap years and arrange dates in seven columns.

## Project-specific acceptance check

February 2000 has 29 days; February 1900 has 28. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Implement and test weekday and leap-year arithmetic in the project; there is no DateTime or Calendar API.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project8.html). The WBasic explanation and source will be written anew.
