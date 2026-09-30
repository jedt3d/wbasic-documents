# Project 15 Plan: Generate a Shifting Deep-Cave View

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Generate a Shifting Deep-Cave View.
Data: the left and right cave edges on each row.
Method: Move each edge by at most one cell according to a fixed seed while keeping a passage open.
Acceptance check: On every row, the left edge precedes the right edge.
Remaining gap: Specify the PRNG and verify image updates driven by the TUI timer.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project15.html

This document is a plan, not runnable code.
