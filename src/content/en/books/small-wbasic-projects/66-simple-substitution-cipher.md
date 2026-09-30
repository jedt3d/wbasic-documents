---
title: "66 · Simple Substitution Cipher"
weight: 66
---

{{< project-download "66-simple-substitution-cipher" >}}

A simple substitution cipher pairs A–Z with a shuffled alphabet. Each original letter always maps to the same replacement. This program encrypts one fixed uppercase line and decodes it, showing how the same map works in both directions when source and destination alphabets are exchanged.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
DTTZ QZ FGGF!
MEET AT NOON!
```

## The map must be one-to-one

{{< project-source "66-simple-substitution-cipher" >}}

`alphabet` is the reference order; `key` contains replacements at matching positions. For example, A maps to Q and B to W. `Translate` searches `fromAlphabet` for each character and takes the corresponding position from `toAlphabet`. An unmatched character such as a space or `!` remains unchanged. To decode, `Main` supplies `key` as the source and `alphabet` as the destination.

Before using it, the program checks that `key` has 26 letters, that each is A–Z, and that none repeats. Duplicate replacements would make decoding ambiguous: several original letters could become the same letter. Validating the map is part of the algorithm.

## Experiment

Put Q twice in the key to get `duplicate key letter`; insert a digit to get `key must be A-Z`. For `ABC XYZ`, check each letter's mapped position by hand. To support lowercase, decide whether it needs another key or case conversion with case restoration. This version leaves lowercase unchanged.

Repeated-letter patterns remain visible in this cipher, so it is for learning mappings rather than storing secrets.

## Scope and origin

Inspired by [Project 66: Simple Substitution Cipher](https://inventwithpython.com/bigbookpython/project66.html) by Al Sweigart. The WBasic code was written anew for fixed uppercase text, without a random key or interactive mode.
