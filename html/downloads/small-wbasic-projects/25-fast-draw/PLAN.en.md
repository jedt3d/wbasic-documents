# Project 25 Plan: Race to Press a Key After the Signal

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Race to Press a Key After the Signal.
Data: the signal state and elapsed milliseconds.
Method: Wait for a timer signal. Treat an early press as a false start and a later press as a response time.
Acceptance check: A press before the signal cannot count as a win.
Remaining gap: Verify the TUI timer, event timestamp or elapsed-time value, and real keyboard input.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project25.html

This document is a plan, not runnable code.
