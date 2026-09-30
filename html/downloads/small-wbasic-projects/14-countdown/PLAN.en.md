# Project 14 Plan: Display a Timed Countdown

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Display a Timed Countdown.
Data: the initial number and timer ticks.
Method: Subtract one for each TimerEvent in a TUI session and stop at zero.
Acceptance check: Starting at 3 displays 3, 2, 1, 0, with no negative number.
Remaining gap: A TUI session can use its timer without a wall-clock API. Test timer startup, shutdown, terminal-mode restoration, and actual display. Injected ticks test the counting rule but do not by themselves verify a working countdown.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project14.html

This document is a plan, not runnable code.
