---
title: "81 · Water Buckets and Step-by-Step State Changes"
weight: 81
---

{{< project-download "81-water-bucket-puzzle" >}}

Three buckets hold 8, 5, and 3 liters. The goal is 4 liters in one bucket. An action may fill a bucket, empty it, or pour from one to another until the source empties or the destination fills. This example replays a prepared action sequence and stops as soon as it reaches the goal, teaching state transitions without player-input parsing.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
8L=0 5L=0 3L=0
8L=0 5L=5 3L=0
8L=0 5L=2 3L=3
8L=0 5L=2 3L=0
8L=0 5L=0 3L=2
8L=0 5L=5 3L=2
8L=0 5L=4 3L=3
goal: 4L
```

## Read one action as a state change

{{< project-source "81-water-bucket-puzzle" >}}

`capacity` holds fixed limits and `water` holds changing quantities. `actions` is an array of three-number commands: action type, source bucket, and destination bucket. Type 0 fills, type 1 empties, and type 2 pours. For pouring, the program chooses the smaller of the source's water and the destination's free space as `amount`, subtracting and adding that same amount. A pour therefore conserves total water.

Before touching the arrays, the program validates both indices and forbids pouring a bucket into itself. It prints state after each action and *then* tests the goal, so the winning state is visible. The replay reaches 4 liters in the 5-liter bucket after pouring from it into the 3-liter bucket, which already contains 2 liters and can accept only 1 more.

## Check boundary cases

Filling an already full bucket must not exceed capacity. Pouring from an empty one gives `amount = 0` and no change. Source index 3 or -1 in the first action should report `invalid bucket` before array access. A deeper extension is to search for the shortest solution by visiting previously unseen states, using bucket quantities to identify each state.

## Scope and origin

Inspired by [Project 81: Water Bucket Puzzle](https://inventwithpython.com/bigbookpython/project81.html) by Al Sweigart. This newly written WBasic code is a replay and goal check, not an interactive game or shortest-solution search.
