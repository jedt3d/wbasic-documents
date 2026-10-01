---
title: "WBasic Reference"
description: "Versioned guides to the language, standard library, and public APIs"
---

## Read by book

This reference separates language rules from the standard library and module APIs. Its current-behavior descriptions cover verified WBasic v0.3 functionality. Proposals remain in the developer documentation until there is evidence that they work.

## Current coverage

This reference follows the **compiler/runtime 0.1.0 private experimental release**
with **Extension 0.2.1**. CLI, portable ZIP and the compiler selected in VS Code
use the same compiler version, separate from the draft v0.3 language design. Read
[compiler and tooling versions]({{< relref "/implementation-status.md" >}})
before installation or updating older project manifests.

The reference covers the language, standard library, and public APIs verified in the current implementation. Each chapter presents clear rules, small examples, boundary cases, and relevant diagnostics. Features that remain Planned or Deferred are identified explicitly. A reference book should not write fiction on the compiler's behalf.

Thai is the authoritative source edition. This English edition translates the reviewed Thai documentation at the user's request, preserving its implementation and verification boundaries.

## Writing conventions

Keywords and API names use the exact spelling accepted by the compiler. Complete programs have one `Main`; fragments identify their required context. Types, values, and errors follow WBasic's own definitions rather than borrowing assumptions from other languages.
