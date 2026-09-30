---
title: "1 · Tools and the compiler"
description: "Meet wb, inspect its version, and understand how it builds Billing Time."
weight: 1
---

Billing Time is a small command-line application that totals recorded work before
it becomes an invoice. It is compact enough to read in one sitting while still
giving the compiler a real job.

| Tool | Role |
|---|---|
| `wb` | Resolves a project, checks source, compiles, links, and runs it |
| terminal | Runs commands and displays results |
| native toolchain | Links the object with the WBasic runtime; currently MSVC on Windows and Apple Clang on macOS |

Check the compiler first:

```console
wb --version
wb --capabilities
```

The current development setup needs `wb`, its matching static runtime, and the
native platform toolchain. Clean-machine, no-SDK packaging belongs to a later
distribution round.

The commands used in this book are:

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--runtime <path>] [-- arguments...]
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` is today's compile-link-run path. `emit-object` stops after object
generation. The developer CLI does not yet offer a distributable `wb build`
command.

Next: [Create the Billing Time project]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}}).
