# Project 19 Plan: Show the Current Time as a Digital Clock

Status: Missing API for the original form; no main.wbas exists yet.

Goal: Show the Current Time as a Digital Clock.
Data: hours, minutes, seconds, and redraw signals.
Method: Read wall-clock time once an API exists; use the timer only to request redraws.
Acceptance check: A supplied time of 09:05:07 renders exactly as 09:05:07, without guessing from ticks.
Remaining gap: Missing API for the original form: there is no wall-clock or DateTime API. A TUI timer alone cannot report current time. Rendering a supplied 09:05:07 tests formatting only; it does not make a clock that reads the current time.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project19.html

This document is a plan, not runnable code.
