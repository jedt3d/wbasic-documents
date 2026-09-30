---
title: "26 · Fibonacci from Two Previous Values"
description: "Generate the first ten terms by advancing two state variables in order"
weight: 26
---

{{< project-download "26-fibonacci" >}}

## Project goal

The Fibonacci sequence begins with `F(0) = 0` and `F(1) = 1`, followed by `F(n + 2) = F(n) + F(n + 1)`. We print **the first ten terms, F(0) through F(9)**, keeping only the previous two values rather than the whole sequence in an array. Explicit indices avoid ambiguity about whether the “first term” is 0 or 1.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. Use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`check` checks source; `run` compiles, links, and runs. If building `wb` from a product checkout, first run `cargo build --workspace --locked` at its root. The distributable-file command `wb build` is not yet available to users.

Indices and values appear together so each step can be checked:

```text
First 10 Fibonacci numbers
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34
```

{{< project-source "26-fibonacci" >}}

## Watch all three steps of the update

Initially, `previous = 0` and `current = 1` represent `F(0)` and `F(1)`. Print `previous`, calculate `following = previous + current`, then assign `previous = current` and `current = following`. After the first pass the pair is `(1, 1)`, ready to print `F(1)` next. Reassigning without saving `following` would accidentally add a value that had already changed.

`For` covers 0 through 9, giving exactly ten output terms. The program still calculates `following` after printing `F(9)`, though it never displays that value. For larger counts, avoid unnecessary work and check the `Integer` range: Fibonacci values grow quickly and eventually overflow. This small example neither accepts huge counts nor claims an endless sequence can be computed.

## Try next

1. Reduce the `For` upper bound to 1 and confirm that only `F(0)` and `F(1)` appear.
2. Start with 2 and 1, then predict four terms. The recurrence remains the same, but the result is not the standard Fibonacci sequence.
3. Print only even-indexed terms while still calculating the odd-indexed terms needed for the next value.

Inspired by [Big Book of Small Python Projects, Project 26: Fibonacci](https://inventwithpython.com/bigbookpython/project26.html) by Al Sweigart. The indexed, ten-term WBasic example and explanation were written anew.
