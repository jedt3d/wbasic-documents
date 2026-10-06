---
title: "1 · Tools and the compiler"
description: "Meet wb, inspect its version, and understand how it builds Billing Time."
weight: 1
---

Billing Time is a small command-line application that totals recorded work before
it becomes an invoice. It is compact enough to read in one sitting while still
giving the compiler a real job.

This chapter targets matched release **compiler/runtime 0.2.0**, VS Code Extension
**0.3.0**, and protocol **0.1.0**. Match manifests and runtime to this compiler.
Read [toolchain versions]({{< relref "/implementation-status.md" >}}) before
switching workflows.

| Tool | Role |
|---|---|
| `wb` | Resolves a project, checks source, compiles, links, and runs it |
| terminal | Runs commands and displays results |
| native toolchain | Building the compiler toolchain from Rust source uses MSVC on Windows or Apple Clang on macOS; the portable ZIP supplies a linker for WBasic app builds |

Check the compiler first:

```console
wb --version
wb --capabilities
```

Building the compiler toolchain from Rust source on a developer host still needs
the native platform toolchain/SDK and matching static runtime. The private
experimental 0.2.0 ARM64 portable ZIP bundles its compiler, runtime, and linker;
it builds WBasic app source on the tested developer hosts. Its packaged smoke
tests are separate from fresh-host no-SDK acceptance. Core CLI use does
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

In VS Code, set `wbasic.compilerPath` to the 0.2.0 `wb`, then open the Command
Palette (`Ctrl+Shift+P` on Windows) for **WBasic: Check Project**, **Run Project**,
or **Build Project — Debug/Release (Development)**. The tested portable package
uses its bundled linker/runtime for app builds on developer hosts. Building the
compiler toolchain itself from Rust source still needs an SDK/native toolchain;
portable package smoke tests do not establish fresh-host no-SDK acceptance.

Next: [Create the Billing Time project]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}}).
