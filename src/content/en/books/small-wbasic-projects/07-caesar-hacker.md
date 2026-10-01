---
title: "07 · Try Every Caesar Cipher Key"
description: "Decode with all 26 keys and let the reader identify meaningful text"
weight: 7
---

{{< project-download "07-caesar-hacker" >}}

## Goal and scope

When the Caesar key is unknown, we need not guess at random. There are only 26 distinct shifts in A–Z, so we can try keys 0 through 25. This chapter uses the fixed ciphertext `PHHW DW QRRQ!` from the previous project and displays every candidate for a human to judge. It does not detect language automatically. Here, “hacking” means exhausting a tiny key space.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. Use `wb` with a matching native SDK and runtime on a development machine:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles and links before execution. If you built the tools yourself, first run `cargo build --workspace --locked` at the product repository root. The recorded examples use compiler `2614b37`. Merged compiler 0.0.2 offers `wb build` for `.wproj` projects with debug/release profiles, not standalone `.wbas` files. The experimental package includes linking tools; fresh-machine/no-SDK acceptance remains open. The program prints 26 lines in key order:

```text
key 0: PHHW DW QRRQ!
key 1: OGGV CV PQQP!
key 2: NFFU BU OPPO!
key 3: MEET AT NOON!
key 4: LDDS ZS MNNM!
key 5: KCCR YR LMML!
key 6: JBBQ XQ KLLK!
key 7: IAAP WP JKKJ!
key 8: HZZO VO IJJI!
key 9: GYYN UN HIIH!
key 10: FXXM TM GHHG!
key 11: EWWL SL FGGF!
key 12: DVVK RK EFFE!
key 13: CUUJ QJ DEED!
key 14: BTTI PI CDDC!
key 15: ASSH OH BCCB!
key 16: ZRRG NG ABBA!
key 17: YQQF MF ZAAZ!
key 18: XPPE LE YZZY!
key 19: WOOD KD XYYX!
key 20: VNNC JC WXXW!
key 21: UMMB IB VWWV!
key 22: TLLA HA UVVU!
key 23: SKKZ GZ TUUT!
key 24: RJJY FY STTS!
key 25: QIIX EX RSSR!
```

Every line above is expected output, including candidates that do not read as words.

{{< project-source "07-caesar-hacker" >}}

## From one key to all keys

`Decode` looks up a letter in `alphabet`, then selects `(position + 26 - key) Mod 26`. Adding 26 first keeps the modulo input nonnegative for the allowed keys. Spaces and punctuation pass through unchanged. `For key = 0 To 25` calls the same function for every possible shift, leaving no gap in this key space.

The program does not *know* that key 3 is correct; a reader recognizes the English sentence. Very short ciphertext may yield several plausible candidates, and other languages or algorithms may yield none. Trying all keys is practical here because there are only 26. That says nothing about the feasibility of brute force against other encryption systems.

## Try next

1. Substitute `ABC` and inspect the pattern of all 26 candidates.
2. Print only candidates containing `MEET`, noting that this filter uses prior knowledge of the language.
3. Compare keys 0 and 25 to explain alphabet wrapping.

Trying every key was inspired by [Big Book of Small Python Projects, Project 7: Caesar Hacker](https://inventwithpython.com/bigbookpython/project7.html) by Al Sweigart. The WBasic code and explanation were written anew.
