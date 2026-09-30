# Project 62 Plan: Draw a Rotating Cube in Text

Status: Missing API for the original form; no main.wbas exists yet.

Goal: Draw a Rotating Cube in Text.
Data: vertices, rotation angles, and screen projections.
Method: Use sin and cos or a bounded angle lookup table, then project and draw the vertices.
Acceptance check: After a full rotation, projected coordinates return to their starting values within a stated tolerance.
Remaining gap: Missing API for the original form: trigonometric functions are absent. A precomputed angle table can teach projection, but its angular resolution and numerical error must be stated and tested. Verify Float calculations and TUI frames; animation still needs working TUI events and frame rendering.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project62.html

This document is a plan, not runnable code.
