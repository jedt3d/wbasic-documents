---
title: "78 · Trick Questions and an Answer Checker"
description: "Keep questions, answers, and scripted responses aligned by index"
weight: 78
---

{{< project-download "78-trick-questions" >}}

## Goal and scope

Trick questions test our assumptions. This chapter uses two new questions: removing a label from a box does not remove a pen, and a test that resets its fixture each time does not share state across runs. The program stores questions, correct answers, and scripted responses in three arrays. The first response is deliberately wrong and the second right, exercising both the reveal and scoring paths. Scripted responses keep lesson output reproducible.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root. The recorded examples use compiler `2614b37`. The newer R8A/R8B line supports `wb build` for development with a native SDK; this is not production/no-SDK distribution acceptance. The two questions produce:

```text
Q1: A box holds five pens. Remove its label: how many pens remain?
scripted guess: 3
Answer: 5
Q2: Two tests reset their fixtures. How many runs share state?
scripted guess: 0
Correct
Score: 1/2
```

{{< project-source "78-trick-questions" >}}

## Three arrays must stay aligned

`index` starts at zero and stops before `questions.Length`. The same position in all three arrays describes one question. `index + 1` presents familiar one-based question numbers without changing array indices. After lowercasing, a matching response increments `score` and prints `Correct`; otherwise the answer is revealed. The final score uses the actual question count rather than a hard-coded 2.

The parallel arrays are fragile: adding a question without its answer or scripted response can cause an out-of-range read. A larger version should group each question in a `Structure` and check counts before play. Exact string comparison also accepts only specified forms: `five` differs from `5` even if a person treats them as equivalent. Broad substring matching can accidentally accept incorrect answers containing the expected word.

## Try next

1. Change the first scripted answer to `5` and predict the score.
2. Add a third question, answer, and response to all three arrays; check numbering and the score denominator.
3. Design `Structure Question` with the question and answer together to reduce mismatched-array risk.

Inspired by [Big Book of Small Python Projects, Project 78: Trick Questions](https://inventwithpython.com/bigbookpython/project78.html) by Al Sweigart. Both questions, scoring, and WBasic source were written anew.
