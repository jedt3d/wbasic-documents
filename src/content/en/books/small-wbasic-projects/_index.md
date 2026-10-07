---
title: "Small Wbasic Projects"
description: "Practice designing, writing, and checking small WBasic programs — English edition"
weight: -5
layout: small-projects
---

**This book adapts project ideas from The Big Book of Small Python Projects by Al Sweigart**, with newly written explanations and WBasic examples in our own voice. We thank the author for a collection that helps readers learn by doing. Read the original directly at [Invent with Python — The Big Book of Small Python Projects](https://inventwithpython.com/bigbookpython/) and use the links there to support its author.

This is an independently produced WBasic learning companion, not an official translation of that book or a claim that its author endorses WBasic. We retain the original project numbers to make the sources easy to find; your reading need not begin at number 1.

## From Getting Started to small projects

This is the second book to read after Getting Started. Once you know what a source file is and how to use `wb`, these smaller problems let you follow the whole journey from input to output within one chapter. Short code still needs careful boundaries; it simply leaves us fewer excuses not to read it.

Thai is the source edition. This English edition follows the completed Thai content and editorial review, as requested in a subsequent translation round.

## Work through projects in VS Code

Keep [How can I…?]({{< relref "/books/w-basic-extension/13-how-can-i.md" >}}) beside you: choose a walkthrough for opening examples, checking source, running a single file, or returning to a test. Extension 0.4.0 highlights include templates, Run Again, source/test navigation and Toolchain Doctor, but it is still an unpublished development candidate; the published VSIX remains 0.3.0. Each recipe names the required version before you start. Using newer tools does not change a project's Planned status or its existing verification evidence.

## Choose a reading route

Begin with the [multiplication table]({{< relref "49-multiplication.md" >}}) to practice nested loops, then [diamonds]({{< relref "16-diamonds.md" >}}) to build lines of text. Continue with [factors]({{< relref "24-factors.md" >}}) and [prime numbers]({{< relref "56-primes.md" >}}) to separate rules into procedures.

Once state feels familiar, try [Fibonacci]({{< relref "26-fibonacci.md" >}}), [Collatz]({{< relref "12-collatz.md" >}}), [ROT13]({{< relref "61-rot13.md" >}}), and the [tic-tac-toe core]({{< relref "76-tic-tac-toe.md" >}}). Each chapter explains its changes in scope: a replay is not presented as an interactive game, and a bounded experiment is not presented as a general proof.

The [81-project roadmap]({{< relref "project-roadmap.md" >}}) lists every project, its status, and the preparation it needs.

This edition contains 29 projects with lesson code and 52 project plans. Some implemented lessons deliberately cover one calculation or a replay to teach the underlying rules first. They do not claim every feature of the original programs.

Text projects cover character pictures, Caesar ciphers, trying keys, Leetspeak, Pig Latin, alternating case, and substitution ciphers. Number projects include numeral systems and seven-segment digits. Game projects include the cores of Connect Four, Mancala, tic-tac-toe, Hanoi, and the water-bucket puzzle. You can therefore practice data structures before adding command input or a screen interface.

## Download the files and read the status before running

Implemented chapters begin with a `main.wbas` download and display code from that same file. Save it in a writable directory, then use `wb check main.wbas --json` and `wb run main.wbas` after preparing the developer toolchain described in Getting Started. These examples do not establish that a distribution for machines without an SDK is ready.

Placeholder chapters show their status before the lesson and provide a downloadable plan in place of source that does not yet exist. They distinguish unwritten work, work awaiting verification, and genuinely missing APIs. The absence of a convenient built-in command does not make a problem impossible: when the same steps can be written with the core language, the chapter says so.

## How lessons are checked

The October 1, 2026 expansion adds detailed lessons and draft code to chapter 8 (a calendar from a supplied year/month), 13 (one Game of Life generation), and 73 (a Sudoku validator). Each `draft.wbas.txt` is for reading and further checking, not a program with verified execution. All three remain among the 52 planned chapters; the verified-example count stays at 29. Sudoku solving, random puzzle generation, and interactive TUI work remain unfinished.

Library requests live separately in the `wbasic-language` repository at `docs/proposals/small-projects-library-feature-requests.md`. Stable `SWP-FR-*` IDs connect a lesson's needs to a proposal. An ID does not mean the API exists or its implementation has been approved.

Every chapter with code includes expected results, input boundaries, and changes to try. Checking source and executing it are separate steps. The compiler and results are recorded in the [verification record]({{< relref "verification.md" >}}). Platform claims follow that evidence; success on one machine does not establish success everywhere.

Project numbers and source links identify the inspiration. The WBasic code and explanations are newly written. The downloads do not reproduce the original book's prose, images, or Python source collection.
