---
title: "74 · Speak Entered Text Aloud"
description: "Project plan: Speak Entered Text Aloud"
weight: 74
---

{{< project-download "74-text-to-speech-talker" "PLAN.md" >}}

> **Status: Missing API for the original form.** There is no runnable WBasic source yet. The downloadable document is a chapter plan, not source code or a test result.

## WBasic project

Speak Entered Text Aloud. The project needs to keep track of **the text, language, and speech state**.

## Proposed method

Call a TTS provider and handle unsupported languages.

## Project-specific acceptance check

Empty text does not start speech. This is an acceptance example to test when the source is written; it has not passed yet.

## Remaining gap

Missing API for the original form: v0.3 has no TTS, audio, or OS speech API. A speech provider must accept text and language and return testable success or error. Printing text or using predetermined data does not generate speech, so it does not complete this project.

This project takes its starting idea from [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project74.html). The WBasic explanation and source will be written anew.
