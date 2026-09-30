---
title: "80 · Vigenère Cipher: Shift by a Keyword"
weight: 80
---

{{< project-download "80-vigenere-cipher" >}}

A Vigenère cipher changes the shift according to a keyword. With `LEMON`, the first message letter uses L, the next E, and so on, repeating the keyword. Punctuation remains unchanged and **does not consume a keyword position**. This program encrypts fixed text and decrypts it again to check the rule's symmetry.

## Try running it

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
LXFOPV EF RNHR!
ATTACK AT DAWN!
```

## Alphabet positions are numbers

{{< project-source "80-vigenere-cipher" >}}

`Position` gives A the value 0 through Z the value 25, returning -1 for anything else. `Transform` walks the message. For a non-A–Z character, it immediately appends the original. For a letter, `used Mod keyword.Length` selects a keyword letter. Encryption adds its position to the message letter's position and takes modulo 26 to wrap beyond Z. Decryption subtracts it, adding 26 before modulo to keep the result in 0–25.

`used` increases only after a letter is transformed, so the space between `ATTACK` and `AT` does not advance the keyword. `Main` checks that the keyword is nonempty and contains only A–Z before calling the helper. Any other caller of `Transform` must preserve that precondition.

## Experiment

With keyword `A`, every letter should stay the same because A has position 0. With `B`, `Z!` should encrypt to `A!` and decrypt back. An empty keyword must be rejected before modulo by its zero length. As an extension, support lowercase while preserving case.

This classical cipher has weaknesses in real use. It belongs here as an exercise in cycles and algorithm state, not as modern data protection.

## Scope and origin

Inspired by [Project 80: Vigenère Cipher](https://inventwithpython.com/bigbookpython/project80.html) by Al Sweigart. The WBasic code was written anew with fixed text and keyword, without live input or keyless cracking.
