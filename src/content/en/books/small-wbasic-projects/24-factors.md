---
title: "24 · Find the Factors of 36"
description: "Use remainders to test whether one number divides another exactly"
weight: 24
---

{{< project-download "24-factors" >}}

## Project goal

A factor of positive integer `n` is a positive integer that divides `n` without a remainder. For example, 4 is a factor of 36 because `36 Div 4 = 9` exactly. This program tests candidates 1 through **36** and prints those that pass. The choice of 36 highlights `6 * 6 = 36`: the middle factor should appear once.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime on a development machine:

```console
wb check main.wbas --json
wb run main.wbas
```

`check` checks source; `run` compiles, links, and runs. If building the tools from a product checkout, first run `cargo build --workspace --locked` at its root. The recorded examples use compiler `2614b37`. The newer R8A/R8B line supports `wb build` for development with a native SDK; this is not production/no-SDK distribution acceptance.

Factors appear in ascending order, one per line:

```text
Factors of 36
1
2
3
4
6
9
12
18
36
```

{{< project-source "24-factors" >}}

## Why the remainder is enough

For a positive `candidate`, `number Mod candidate = 0` means exact division. `For` tests every integer from 1 to 36 once. Printing as soon as a candidate passes also sorts the output without another step.

Check the pairs by hand: `1 * 36`, `2 * 18`, `3 * 12`, `4 * 9`, and `6 * 6`. The last pair explains why 6 appears on only one line. This program tests each candidate once rather than adding both members of each pair. An optimized version that checks only through the square root and emits both partners must avoid duplicating 6.

The example uses the fixed positive number 36 and has no input or zero case. For `number = 1`, the only factor should be 1. One is not prime, because a prime needs **two distinct positive factors**. Zero has infinitely many positive divisors and does not fit this finite listing. Testing every candidate is simple but slow for very large numbers.

## Try next

1. Use 29 and check that only 1 and 29 appear. What does that tell you?
2. Count factors only when `Mod` is zero, and print the total after `For`.
3. Check only while `candidate * candidate <= number` and print factor pairs without duplicates. Test the 6 case with 36.

Inspired by [Big Book of Small Python Projects, Project 24: Factor Finder](https://inventwithpython.com/bigbookpython/project24.html) by Al Sweigart. The fixed-value WBasic program and explanation were written anew.
