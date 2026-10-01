---
title: "12 · The Collatz Sequence"
description: "Practice loops and remainder-based decisions, starting at 13"
weight: 12
---

{{< project-download "12-collatz" >}}

## Project goal

Start with a positive integer. If it is even, divide it by two; if it is odd, multiply by three and add one. Stop on reaching 1. This example starts at **13** so both branches appear in a short trace. It uses a constant rather than keyboard input and limits the loop to 20 iterations, making repeated checks straightforward. It is an algorithm exercise, not a proof that every starting value reaches 1.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. On a development machine with `wb` and a matching native SDK and runtime, run:

```console
wb check main.wbas --json
wb run main.wbas
```

`check` checks the source; `run` compiles, links, and executes. The recorded examples use compiler `2614b37`. Merged compiler 0.0.2 offers `wb build` for `.wproj` projects with debug/release profiles, not standalone `.wbas` files. The experimental package includes linking tools; fresh-machine/no-SDK acceptance remains open. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root and provide the native toolchain for that machine.

The output has one number per line, making each transition easy to check:

```text
Collatz from 13
13
40
20
10
5
16
8
4
2
1
```

{{< project-source "12-collatz" >}}

## Follow the changing value

`number` changes on each pass through `For`. We print its current value at the start of the pass, so 13 appears. After printing 1, `Break` stops immediately instead of turning 1 into 4. `Mod 2` yields zero for an even number. For 13 the remainder is one, giving `3 * 13 + 1 = 40`; next, 40 halves to 20.

`Div` expresses integer division. The 20-pass limit is only a boundary for this example. If another start prints 20 values without reaching 1, the result is merely a *prefix* of its sequence, not evidence that it never ends. A sufficiently large value may also overflow `Integer` at `3 * number + 1` before the limit.

## Try next

1. Start at 8 and predict every line. Why does this path never take the odd branch before 1?
2. Count *changes of value* and print the count at the end. Distinguish changes from values printed.
3. Start at 1 and confirm that only one value appears. This boundary case catches printing after calculation.

Inspired by [Big Book of Small Python Projects, Project 12: Collatz Sequence](https://inventwithpython.com/bigbookpython/project12.html) by Al Sweigart. This explanation and WBasic program were written anew as a bounded, reproducible experiment.
