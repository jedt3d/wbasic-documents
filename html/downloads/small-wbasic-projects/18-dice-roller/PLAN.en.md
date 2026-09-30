# Project 18 Plan: Parse Dice Notation and Add Rolls

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Parse Dice Notation and Add Rolls.
Data: an NdM dice expression and its modifier.
Method: Parse the dice count, sides, and optional signed modifier. Validate the ranges, roll and total the dice, then add the modifier with an Integer overflow check.
Acceptance check: A result for 2d6+3 lies between 5 and 15.
Remaining gap: Implement an NdM parser with an optional +K/-K modifier and a PRNG, with explicit range and overflow checks.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project18.html

This document is a plan, not runnable code.
