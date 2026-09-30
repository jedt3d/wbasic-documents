---
title: "40 · Convert Text to Leetspeak"
description: "Make a readable, deterministic letter-substitution table"
weight: 40
---

{{< project-download "40-leetspeak" >}}

## Goal and scope

Leetspeak plays with the appearance of letters, such as replacing `A` with `4` and `E` with `3`. This chapter converts the fixed text `WBasic is neat!` with six rules for A, E, I, O, S, and T. The result is the same on every run, unlike versions that randomly choose among alternatives. A small table lets us inspect each character and see that unlisted characters survive.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. The development machine needs `wb` and a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles and links before execution. If building `wb` yourself, first run `cargo build --workspace --locked` at the WBasic repository root. The recorded examples use compiler `2614b37`. The newer R8A/R8B line supports `wb build` for development with a native SDK; this is not production/no-SDK distribution acceptance. Expect:

```text
WBasic is neat!
WB451c 15 n347!
```

{{< project-source "40-leetspeak" >}}

## Read the substitutions character by character

`Leet` walks the text with `For Each` and lowercases the current character for rule selection. Thus `a` and `A` follow the same rule. A match adds its numeral; otherwise the original character is added. In `WBasic`, `W` and `B` remain, while `a`, `s`, and `i` become `4`, `5`, and `1`. Accumulating with `result += ...` matters: `result = ...` each time would retain only the last character's replacement.

This is not encryption and generally cannot be reversed unambiguously: an original `4` and a replaced `A` look identical afterward. This version preserves spaces, punctuation, Thai letters, and all unlisted letters. `.ToLower()` selects a rule; it does not force the entire result to lowercase.

## Try next

1. Add `B` → `8` and predict the new second line before running.
2. Include an original digit `4` and explain why decoding becomes ambiguous.
3. Store source and replacement pairs in an array so the table can grow without many `ElseIf` branches.

Inspired by [Big Book of Small Python Projects, Project 40: Leetspeak](https://inventwithpython.com/bigbookpython/project40.html) by Al Sweigart. This deterministic table and WBasic source were written anew.
