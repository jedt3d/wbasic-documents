# Project 01 Plan: Guess a Three-Digit Code from Positional Clues

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Guess a Three-Digit Code from Positional Clues.
Data: a three-digit code with distinct digits and clues for guesses.
Method: Shuffle digits 0–9 with a fixed seed, then compare each guessed digit by value and position.
Acceptance check: For code 248, guess 843 gives one correct-position digit and one wrong-position digit.
Remaining gap: Write a seeded random generator in the chapter and check its integer bounds; WBasic has no public random API. A specified and tested seed can support the algorithm.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project1.html

This document is a plan, not runnable code.
