---
title: "02 · Simulate Shared Birthdays in a Group"
description: "Project plan: Simulate Shared Birthdays in a Group"
weight: 2
---

{{< project-download "02-birthday-paradox" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Simulate Shared Birthdays in a Group. The project needs to keep track of **the group size, birthdays numbered 1–365, and trial count**.

## Proposed method

Generate birthdays from a fixed seed and count trials with at least one shared birthday.

## Project-specific acceptance check

A group of one person has zero birthday collisions. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Define and verify a seeded PRNG for simulated birthdays; WBasic has no public random API.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project2.html). The WBasic explanation and source will be written anew.
