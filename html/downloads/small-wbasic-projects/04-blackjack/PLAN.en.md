# Project 04 Plan: Play Blackjack Against a Dealer

Status: Awaiting implementation and verification; no main.wbas exists yet.

Goal: Play Blackjack Against a Dealer.
Data: a 52-card deck and both hands.
Method: Shuffle the deck with a fixed seed. Count an ace as 11, then reduce it to 1 if the hand exceeds 21.
Acceptance check: An ace, 9, and 5 have a value of 15.
Remaining gap: Build the deck and verify a seeded PRNG for shuffling; WBasic has no public random API.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project4.html

This document is a plan, not runnable code.
