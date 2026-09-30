---
title: "43 · Mancala: Sow Seeds and Capture"
weight: 43
---

{{< project-download "43-mancala" >}}

Each Mancala player has six pits and one store. We use Kalah rules: pick up all seeds from one of your pits and sow them around the board, skipping the opponent's store. Landing the last seed in your own store grants another move. This chapter replays **four predetermined moves** to practice state updates and seed conservation. It is not a complete game played to the end.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
P1 pit 2 store 1
P1 pit 0 store 1
P2 pit 9 store 1
P2 pit 7 store 1
seeds 48
stores 1:1
```

## Read the ring of pits

{{< project-source "43-mancala" >}}

Indices 0–5 are player 1's pits, 6 is that player's store, 7–12 are player 2's pits, and 13 is player 2's store. The sequence `[2, 0, 9, 7]` matters: the last seed from pit 2 lands in store 6, giving P1 an extra turn at pit 0. P2 later plays pit 9 and also gains an extra turn.

The sowing loop advances `position` modulo 14 and decrements `seeds` only when the destination is not the opposing store. Capture applies when the last seed lands in an own pit that was empty before this drop (now holding one) and the opposite pit has seeds. Both sides then move into the store. The opposite pit is `12 - position`.

The `seeds 48` total is an important invariant. Sowing and capture move seeds; they never create or destroy them. A changed total points to a faulty update.

## Check the edges

Change the first move to pit 9 for `invalid pit`. Choosing a newly empty pit without changing players should give `empty pit`. Make a move that skips the opponent's store and check the total remains 48. For a full game, detect when one player's six pits are empty, sweep the remaining seeds into the other store, and compare scores.

## Scope and origin

Inspired by [Project 43: Mancala](https://inventwithpython.com/bigbookpython/project43.html) by Al Sweigart. This WBasic replay was written anew with sowing, store skipping, extra turns, and capture. It has no live input or end-game scoring.
