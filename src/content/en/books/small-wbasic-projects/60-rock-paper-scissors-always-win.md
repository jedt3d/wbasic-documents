---
title: "60 · Rock Paper Scissors: The Player Always Wins"
description: "Choose the move that loses to the player, then test all three cases"
weight: 60
---

{{< project-download "60-rock-paper-scissors-always-win" >}}

## Goal and scope

In a normal game the computer chooses without knowing the player's move. This version deliberately lets the player win every turn: it sees the player's move **first**, then chooses a losing one. Rock beats scissors, paper beats rock, and scissors beats paper. Three scripted turns exercise every branch of the rule without randomness or live input.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If building `wb` from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet a user command. The three turns produce:

```text
rock beats scissors
paper beats rock
scissors beats paper
Wins: 3
```

{{< project-source "60-rock-paper-scissors-always-win" >}}

## Rules and scores must agree

`LosingMove` receives the player's move. For `rock` it returns `scissors`; for `paper`, `rock`; the remaining branch returns `paper` for the scripted `scissors`. `Main` walks the three moves, prints each pair, and increments `wins` once per turn. A wrong pair could still produce a score of three because the program assumes the helper is right. Verify each move pair as well as the final score.

This does not prove a win for every possible string: `LosingMove("lizard")` returns `paper`, although lizard is not a move here. A live-input version must validate the three permitted choices and perhaps normalize case. Seeing a move before choosing also makes the game unfair; present it as a rule demonstration, not a random opponent.

## Try next

1. Reorder the move array and check that the winning pairs and score remain correct.
2. Write `Wins(player, computer)` to check the relationship instead of trusting `LosingMove` when adding a point.
3. Validate input outside rock/paper/scissors and give a clear result.

Inspired by [Big Book of Small Python Projects, Project 60: Rock Paper Scissors (Always-Win Version)](https://inventwithpython.com/bigbookpython/project60.html) by Al Sweigart. This WBasic lesson and source were written anew.
