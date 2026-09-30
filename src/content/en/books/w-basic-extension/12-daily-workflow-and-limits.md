---
title: "12 · The daily workflow and its limits"
description: "Summarize the edit-check-test-build loop and separate ready features from Planned work"
weight: 12
---

Once the tools are familiar, the daily workflow should be short and predictable.

## Recommended loop

1. Open the workspace and confirm the active project in WBasic Projects.
2. Write code with completion, hover, and signature help.
3. Read live diagnostics before adding a workaround.
4. Use definition and references to understand impact before rename.
5. Save and Check Project after changing a manifest, module, or Import.
6. Run the relevant case in Test Explorer.
7. Run Project in the integrated terminal.
8. Build Development Debug while developing.
9. Run the full suite and Build Development Release before review.
10. Record compiler and extension revisions in reproducible evidence.

## A quick decision table

| Need | Tool |
|---|---|
| Understand a word or symbol | Hover |
| See accepted arguments | Signature Help |
| Open a declaration | Go to Definition |
| Understand impact | Find All References |
| Rename across files | Rename Symbol |
| Check one unsaved source | Check Active Source |
| Check the real project and modules | Check Project |
| Run an interactive program | Run Project |
| Check a small behavior | Test Explorer |
| See the active compiler | Show Toolchain Status |

## Ready in this guide

- Source and manifest coloring and Outline
- Compiler-backed diagnostics and project-aware LSP
- Completion, hover, nested signature help, and workspace symbols
- Cross-file definition and references, plus validated rename
- New Project, active-project selection, and Projects view
- Direct local-module dependency management
- Check, Run, Development Build Debug and Release, and Tasks
- Native Test Explorer and bundled examples
- Offline v0.3 specification

## Planned or outside this guide

- Debug Adapter Protocol, breakpoints, and stepping
- Compiler-backed formatter
- General import and manifest code actions beyond keyword-case quick fix
- Production entitlement and clean-machine, no-SDK distribution
- Signing, notarization, and Marketplace publication
- Linux ARM64 and native x86_64 acceptance
- WORM, WebView, and language or library work beyond verified v0.3

The absence of a debugger does not make Run temporary. Run, Build, and Test use
the compiler pipeline tested together; source-level stepping waits for a debug
contract that can be proved.

## Finish with one complete exercise

Copy `local-module-project`, rename the project, add a procedure with a Thai name,
use cross-file Rename, add a test case, run Test Explorer, and Build Development
Release. If every step passes without an external terminal, you have exercised
the extension's primary workflow.

Continue with the [Language Reference]({{< relref "/books/language-reference/_index.md" >}}),
[Standard Library]({{< relref "/books/standard-library/_index.md" >}}), and
[API Reference]({{< relref "/books/api-reference/_index.md" >}}).

