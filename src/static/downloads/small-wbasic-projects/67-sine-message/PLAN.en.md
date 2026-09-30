# Project 67 Plan: Move a Message Along a Sine Wave

Status: Missing API for the original form; no main.wbas exists yet.

Goal: Move a Message Along a Sine Wave.
Data: the message and a table of horizontal offsets.
Method: Use a fixed wave pattern when Sin is unavailable.
Acceptance check: The offsets 0, 1, 2, 1 cycle back to 0.
Remaining gap: Missing API for the original form: Math.Sin is absent. A chosen offset sequence is a sample wave pattern, not a sine result for arbitrary angles. A sine lookup table must state its angle range and error; moving output also needs TUI verification.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project67.html

This document is a plan, not runnable code.
