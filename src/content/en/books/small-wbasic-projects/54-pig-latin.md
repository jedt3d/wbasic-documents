---
title: "54 · Pig Latin for Short Words"
description: "Split words, transform by their first letter, then rebuild the sentence"
weight: 54
---

{{< project-download "54-pig-latin" >}}

## Goal and scope

Pig Latin is a simple English word game. A vowel-initial word gains `yay`; a consonant-initial word moves its first letter to the end and gains `ay`. The fixed text `pig apple map` includes both cases. This is a **lowercase English, single-space-separated** version. It does not handle punctuation, capitals, or consonant clusters as a fuller converter might.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet a user command. Expect:

```text
pig apple map
igpay appleyay apmay
```

{{< project-source "54-pig-latin" >}}

## From individual words back to a sentence

`Main` calls `.Split(" ")` and sends each word to `PigWord`. The function checks length before reading `word[0]`, protecting against an empty word. If the first character is in `aeiou`, it appends `yay`: `apple` becomes `appleyay`. Otherwise, a `For` loop gathers characters starting at index 1, then adds the first character and `ay`: `pig` becomes `igpay`.

When rebuilding the sentence, the program inserts a space only if `result` is not empty. That prevents leading and trailing spaces for this example. With adjacent spaces, however, `Split` may produce empty words, and rebuilding may not preserve the original spacing. A converter for general text must retain separators and define punctuation and contextual `y` rules.

## Try next

1. Substitute `egg dog` and predict both transformed words.
2. Move an entire starting consonant cluster, such as `st` in `stop`.
3. Try an exclamation mark and design a way to leave it at the word's end without moving it as a letter.

Inspired by [Big Book of Small Python Projects, Project 54: Pig Latin](https://inventwithpython.com/bigbookpython/project54.html) by Al Sweigart. The short-word scope, explanation, and WBasic source were written anew.
