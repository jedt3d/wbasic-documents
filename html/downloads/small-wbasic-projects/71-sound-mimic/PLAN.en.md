# Project 71 Plan: Listen to and Repeat a Sound Sequence

Status: Missing API for the original form; no main.wbas exists yet.

Goal: Listen to and Repeat a Sound Sequence.
Data: the sound sequence and the listener's answer.
Method: Play each sound through a verified audio API, then compare the listener's sequence.
Acceptance check: Accept A-B-A for A-B-A and reject A-A-B.
Remaining gap: Missing API for the original form: WBasic has no sound-generation or playback API. Comparing letters can test the memory rule but does not make a listening game. It needs an audio provider and verification that each sound finishes in order before answers are accepted.

Credit: Al Sweigart, author of The Big Book of Small Python Projects. This WBasic chapter plan reworks the idea in new words.

Original idea: https://inventwithpython.com/bigbookpython/project71.html

This document is a plan, not runnable code.
