---
title: "50 · A Countdown Verse for Jars on a Shelf"
description: "Use a descending loop for repeated verses, including the transition to zero"
weight: 50
---

{{< project-download "50-ninety-nine-bottles" >}}

## Goal and scope

A song that changes only a number in each verse is a natural loop exercise. This chapter borrows the countdown structure of Ninety-Nine Bottles but writes a new verse about three jars being removed from a shelf. Starting at 3 rather than 99 keeps the complete result on one page, so readers can check that each before-and-after count comes from the loop rather than three hard-coded verses.

## Prepare and run

Download `main.wbas`, open a terminal in its folder, and use `wb` on a development machine with a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and runs. If building WBasic from a product checkout, first run `cargo build --workspace --locked` at its root. The recorded examples use compiler `2614b37`. Merged compiler 0.0.2 offers `wb build` for `.wproj` projects with debug/release profiles, not standalone `.wbas` files. The experimental package includes linking tools; fresh-machine/no-SDK acceptance remains open. All three iterations produce:

```text
Three jars: a short counting verse
3 jars on the shelf
Move one away; 2 remain
2 jars on the shelf
Move one away; 1 remain
1 jar on the shelf
Move one away; 0 remain
The shelf is empty.
```

{{< project-source "50-ninety-nine-bottles" >}}

## Read the countdown loop

`For jars = 3 To 1 Step -1` yields 3, 2, and 1 because WBasic `For` includes its endpoint. Within each iteration, `jars` describes the shelf before removing a jar, and `jars - 1` describes it afterward. Calculating both from the same loop value avoids decrementing too early. The closing line sits outside the loop, so it prints once after the shelf is empty.

Correct counts also need correct grammar. `JarLabel` chooses `jar` for 1 and `jars` otherwise, keeping that decision out of the main verse-building expression. If you add a line about zero jars, revisit both wording and pluralization.

## Try next

1. Change the after-removal line to say `1 jar remains` in the penultimate verse, using `JarLabel(jars - 1)`.
2. Start at 5 and work out how many pairs of verse lines should appear without counting them in the full output.
3. Add a separator between verses without leaving an unintended blank line after the last.

Inspired by [Big Book of Small Python Projects, Project 50: Ninety-Nine Bottles](https://inventwithpython.com/bigbookpython/project50.html) by Al Sweigart. The jar verse and WBasic source were written anew.
