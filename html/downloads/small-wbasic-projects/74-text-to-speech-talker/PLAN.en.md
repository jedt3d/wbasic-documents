# Project 74 Plan: Speak Entered Text Aloud

Status: Missing API for the original form; no main.wbas exists yet.

Goal: Speak Entered Text Aloud.
Data: the text, language, and speech state.
Method: Call a TTS provider and handle unsupported languages.
Acceptance check: Empty text does not start speech.
Remaining gap: Missing API for the original form: v0.3 has no TTS, audio, or OS speech API. A speech provider must accept text and language and return testable success or error. Printing text or using predetermined data does not generate speech, so it does not complete this project.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project74.html

This document is a plan, not runnable code.
