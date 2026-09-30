---
title: "72 · Alternating Letter Case"
description: "Change case for English letters only, preserving punctuation"
weight: 72
---

{{< project-download "72-spongecase" >}}

## Goal and scope

Alternating upper- and lowercase letters look as though someone pressed Shift in rhythm. This chapter converts `WBasic is fun!`, making the first English letter lowercase, the next uppercase, and so on. Spaces and the exclamation mark do not consume a turn. The rule is deliberately **deterministic**, making Boolean state easy to inspect and showing why text length differs from the number of transformed letters.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet a user command. Expect:

```text
WBasic is fun!
wBaSiC iS fUn!
```

{{< project-source "72-spongecase" >}}

## One bit of state chooses the next letter

`upperNext` begins as `False`, meaning the first English letter should be lowercase. `For Each` visits characters, while `letters.Contains(character)` recognizes ASCII a–z and A–Z. On a match, the program applies `.ToUpper()` or `.ToLower()`, then flips the state with `Not upperNext`. A space or `!` is appended unchanged without flipping it. After the six letters of `WBasic`, `is` therefore starts lowercase.

Using `index Mod 2` instead would count spaces and change the rhythm after them. This is a design choice, not a universal spongecase rule: some versions randomize case. This one is repeatable and does not define case alternation for Thai, which lacks A–Z-style uppercase and lowercase pairs.

## Try next

1. Insert `123` between words and check that the following letters continue the rhythm.
2. Start uppercase by changing only the initial state.
3. Reset state after each space so every word begins lowercase, then compare outputs.

Inspired by [Big Book of Small Python Projects, Project 72: sPoNgEcAsE](https://inventwithpython.com/bigbookpython/project72.html) by Al Sweigart. The deterministic rule and WBasic source were written anew.
