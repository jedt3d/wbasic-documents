---
title: "32 · The Question That Asks Again"
description: "Handle yes, no, and unrecognized answers in a scripted conversation"
weight: 32
---

{{< project-download "32-gullible" >}}

## Goal and scope

The program asks whether you want to know a secret. A yes prompts another question; a no reveals that the secret is to keep asking. Behind the small joke is a useful exercise: normalize answers, reject unknown ones, and end a conversation deliberately. This version uses scripted answers `yes`, `Y`, `perhaps`, `no` rather than waiting for live typing, so lesson checks never hang.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and runs. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet a user command. The scripted exchange is:

```text
Want the secret? (scripted answers)
> yes
Then ask again...
> Y
Then ask again...
> perhaps
Please answer yes or no.
> no
The secret is to ask again.
```

{{< project-source "32-gullible" >}}

## Answers have three paths, not two

The program calls `.ToLower()` before comparison, so `Y` and `yes` take the same path. The first branch recognizes `no` or `n`, prints the secret, and uses `Break`. The next recognizes `yes` or `y` and asks again. An unknown answer such as `perhaps` is neither: the program explains the expected format and moves to the next answer. Guessing what an unknown answer means would cause surprising behavior with real input.

`For Each` traverses a finite scripted array, so it cannot loop forever even if every answer is yes. A live version needs an exit rule, such as `no`, a maximum number of questions, or a quit command, explained to the player. If this array ends without a no, the current program ends silently; an extended version should report that outcome.

## Try next

1. Add `YES` and `N` to check case normalization.
2. Move `no` to the first position. Will later answers be read?
3. Count yes answers and print the count at the end, without counting unknown answers.

Inspired by [Big Book of Small Python Projects, Project 32: Gullible](https://inventwithpython.com/bigbookpython/project32.html) by Al Sweigart. The scripted answers and WBasic code were written anew.
