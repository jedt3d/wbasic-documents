# Project 79 Plan: Slide and Merge 2048 Tiles

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Slide and Merge 2048 Tiles.
Data: a 4×4 board and move direction.
Method: Merge equal tiles only once per turn and add a new tile only when the board changes.
Acceptance check: Before adding a new tile, sliding 2,2,2,0 left produces 4,2,0,0.
Remaining gap: Verify the PRNG used to spawn tiles and TUI key input.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project79.html

This document is a plan, not runnable code.
