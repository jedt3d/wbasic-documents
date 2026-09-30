---
title: "52 · One Number, Several Bases"
description: "Convert decimal values to binary and hexadecimal using division and remainders"
weight: 52
---

{{< project-download "52-numeral-systems" >}}

## Goal and scope

Decimal ten is `1010` in binary and `A` in hexadecimal. Its value stays the same; only its notation changes. This chapter shows numbers 10 through 17 in three bases, crossing the hexadecimal boundary after `F`, where a new place gives `10`. We implement conversion using division and remainders rather than a ready-made formatter, so the order of digits is visible.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If building `wb` from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet available to users. Expect this table:

```text
10 | 1010 | A
11 | 1011 | B
12 | 1100 | C
13 | 1101 | D
14 | 1110 | E
15 | 1111 | F
16 | 10000 | 10
17 | 10001 | 11
```

{{< project-source "52-numeral-systems" >}}

## Why prepend each digit?

`InBase` uses `remaining Mod base` to select a symbol from `digits`, then `remaining Div base` to advance to the next place. For decimal 10 in binary, the successive remainders are 0, 1, 0, 1, from right to left. Each new symbol must therefore go at the **front** of `result`. Appending would incorrectly give `0101`. The loop stops when `remaining` reaches zero.

Zero needs a separate return of `"0"`, because `While` would do no work. The function also returns `invalid` for negative values and bases outside 2–16. Without excluding base 1, repeated division would never reduce the value. This exercise handles small nonnegative integers, uses no digits beyond base 16, and omits prefixes such as `0x` and `0b` to keep the table clear.

## Try next

1. Add octal and check that decimal 16 becomes octal 20.
2. Call `InBase(0, 2)` and `InBase(17, 1)` to test cases the normal loop cannot handle.
3. Explain why hexadecimal after `F` is `10`, rather than `G`.

Inspired by [Big Book of Small Python Projects, Project 52: Numeral System Counters](https://inventwithpython.com/bigbookpython/project52.html) by Al Sweigart. This WBasic converter and explanation were written anew.
