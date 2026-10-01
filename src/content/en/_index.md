---
title: "WBasic Reference"
description: "Versioned guides to the language, standard library, and public APIs"
---

## Read by book

This reference separates language rules from the standard library and module APIs. Its current-behavior descriptions cover verified WBasic v0.3 functionality. Proposals remain in the developer documentation until there is evidence that they work.

## Current coverage

This update follows the merged **0.0.2 private experimental compiler/runtime
preview**, including `wb build` and WORM SQLite. This scope differs from the
draft v0.3 language design and the R8B editor branch. Read
[compiler and tooling versions]({{< relref "/implementation-status.md" >}})
before choosing installation steps and examples.

The reference covers the language, standard library, and public APIs verified in the current implementation. Each chapter presents clear rules, small examples, boundary cases, and relevant diagnostics. Features that remain Planned or Deferred are identified explicitly. A reference book should not write fiction on the compiler's behalf.

Thai is the authoritative source edition. This English edition translates the reviewed Thai documentation at the user's request, preserving its implementation and verification boundaries.

## Writing conventions

Keywords and API names use the exact spelling accepted by the compiler. Complete programs have one `Main`; fragments identify their required context. Types, values, and errors follow WBasic's own definitions rather than borrowing assumptions from other languages.
