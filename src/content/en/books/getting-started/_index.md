---
title: "Getting Started"
description: "Build and run a small Billing Time project, then follow its planned path toward a database-backed application."
weight: -10
---

This book introduces WBasic through **Billing Time**, a small command-line program
that totals recorded work. The first four chapters form a runnable path through
the tools, project structure, language, compiler, and command line. Chapters 5–9 read the separately runnable SQLite/WORM example and its verified
native fixtures. The first four chapters remain a small project you create yourself.

Current commands and manifests here use matched **compiler/runtime 0.2.0** in the
CLI and portable ZIP. VS Code Extension **0.3.0** uses protocol **0.1.0** and selects
that compiler version. Project and module `toolchain` pins must match the selected
compiler; New Project pins it automatically. Release 0.1.0 and Extensions 0.2.1/0.2.3
are historical evidence, not tools for a 0.2.0 manifest. See
[version boundaries]({{< relref "/implementation-status.md" >}}).

Start with [Tools and the compiler]({{< relref "/books/getting-started/01-tools-and-compiler.md" >}}).
