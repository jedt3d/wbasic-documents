# Project 20 Plan: Animate Streams of Characters

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Animate Streams of Characters.
Data: character columns and the screen height.
Method: Advance columns each tick, generate new characters from a fixed seed, and trim anything beyond the bottom.
Acceptance check: On a screen five rows high, no sixth row is retained or drawn.
Remaining gap: Verify the TUI timer, display area, and the PRNG used to choose characters.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project20.html

This document is a plan, not runnable code.
