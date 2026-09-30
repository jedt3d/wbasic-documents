---
title: "37 · Escape Robots Pursuing the Player"
description: "Project plan: Escape Robots Pursuing the Player"
weight: 37
---

{{< project-download "37-hungry-robots" "PLAN.md" >}}

> **Status: Awaiting implementation and verification.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Escape Robots Pursuing the Player. The project needs to keep track of **the player, robots, and walls**.

## Proposed method

Move the player first, then move robots to reduce distance and check collisions.

## Project-specific acceptance check

Walking into a wall leaves the player's coordinates unchanged. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Verify TUI events and timer behavior, along with grid-collision rules.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project37.html). The WBasic explanation and source will be written anew.
