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

For a source build on a developer host, use `wb`, its matching static runtime,
and the native platform toolchain/SDK. The private experimental 0.0.2 ARM64
portable ZIP bundles the matched compiler, runtime, and linker. Its packaged
smoke tests are separate from fresh-host no-SDK acceptance. Core CLI use does
not require Node; Node is for optional protocol tooling.

The commands used in this book are:

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--profile debug|release] [-- arguments...]
wb build <manifest.wproj> [--profile debug|release] --output <path>
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` compiles, links, and runs; `wb build` produces a separate binary
from a project manifest. `emit-object` stops after object generation. An omitted
profile means debug. `wb check` requires `--json` or `--format vscode`.

Next: [Create the Billing Time project]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}}).
