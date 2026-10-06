---
title: "Getting Started"
description: "Build and run a small Billing Time project, then follow its planned path toward a database-backed application."
weight: -10
---

This book introduces WBasic through **Billing Time**, a small command-line program
that totals recorded work. The first four chapters form a runnable path through
the tools, project structure, language, compiler, and command line. Chapters 5–9 read the separately runnable SQLite/WORM example and its verified
native fixtures. The first four chapters remain a small project you create yourself.

Commands and manifests here use **compiler/runtime 0.1.0**, shared by CLI,
portable ZIP and the compiler selected by locally verified Extension 0.2.3. The published ZIP still bundles Extension 0.2.1. Project and module
`toolchain` pins must match this version; New Project pins the selected compiler
automatically. See [version boundaries]({{< relref "/implementation-status.md" >}}).

Start with [Tools and the compiler]({{< relref "/books/getting-started/01-tools-and-compiler.md" >}}).
