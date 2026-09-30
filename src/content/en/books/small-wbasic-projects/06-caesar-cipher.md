---
title: "06 · Caesar Cipher"
description: "Encrypt by shifting within A–Z, then decode with the complementary key"
weight: 6
---

{{< project-download "06-caesar-cipher" >}}

## Goal and scope

The Caesar cipher is a useful exercise in indexing and wrapping around a table. With a shift of three, `A` becomes `D`, and `Z` wraps to `C`. This program encrypts the fixed uppercase message `MEET AT NOON!` with key 3, then decodes it with key 23. That second shift completes the 26-letter cycle. We use uppercase English letters only to focus on the mechanism. This is not secure data protection.

## Prepare and run

Download `main.wbas` and open a terminal in its folder. The development machine needs `wb` and a matching native SDK and runtime:

```console
wb check main.wbas --json
wb run main.wbas
```

`run` compiles, links, and executes. If you build `wb` from a product checkout, first run `cargo build --workspace --locked` at its root. `wb build` is not yet a user command. Expect:

```text
Plain: MEET AT NOON!
Shift 3: PHHW DW QRRQ!
Decoded: MEET AT NOON!
```

{{< project-source "06-caesar-cipher" >}}

## Read the shifting function

`Shift` visits each character and finds its position in `alphabet`. If found at `position`, it selects the letter at `(position + key) Mod alphabet.Length`. `Z` is at position 25; shifting by 3 gives 28, whose remainder after division by 26 is 2, pointing to `C`. There is no need for a separate `Z` case.

Characters outside `alphabet`, including spaces and `!`, stay unchanged: `changed` begins as the original character and changes only on a match. Check the algorithm in both directions: `MEET` becomes `PHHW`, and a further shift of 23 restores it. Shifting back by another 3 would not. Lowercase and Thai letters do not shift in this version; supporting other alphabets requires a defined symbol order. With only 26 keys, Caesar cipher should never protect real secrets.

## Try next

1. Change the message to `XYZ` and predict a shift of 3 to test wrapping.
2. Try keys 0 and 26. Why should both preserve the message?
3. Add a separate lowercase table while preserving the original letter case.

The cipher exercise was inspired by [Big Book of Small Python Projects, Project 6: Caesar Cipher](https://inventwithpython.com/bigbookpython/project6.html) by Al Sweigart. The WBasic source and indexing explanation were written anew.
