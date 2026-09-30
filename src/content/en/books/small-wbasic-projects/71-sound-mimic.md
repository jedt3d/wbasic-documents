---
title: "71 · Listen to and Repeat a Sound Sequence"
description: "Project plan: Listen to and Repeat a Sound Sequence"
weight: 71
---

{{< project-download "71-sound-mimic" "PLAN.md" >}}

> **Status: Missing API for the original form.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Listen to and Repeat a Sound Sequence. The project needs to keep track of **the sound sequence and the listener's answer**.

## Proposed method

Play each sound through a verified audio API, then compare the listener's sequence.

## Project-specific acceptance check

Accept A-B-A for A-B-A and reject A-A-B. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Missing API for the original form: WBasic has no sound-generation or playback API. Comparing letters can test the memory rule but does not make a listening game. It needs an audio provider and verification that each sound finishes in order before answers are accepted.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project71.html). The WBasic explanation and source will be written anew.
