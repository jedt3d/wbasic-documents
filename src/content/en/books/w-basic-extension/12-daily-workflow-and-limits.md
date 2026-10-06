---
title: "12 · The daily workflow and its limits"
description: "Summarize the edit-check-test-build loop and separate ready features from Planned work"
weight: 12
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

Once the tools are familiar, the daily workflow should be short and predictable.

## Recommended loop

1. Open the workspace and confirm the active project in WBasic Projects.
2. Write code with completion, hover, and signature help.
3. Read live diagnostics before adding a workaround.
4. Use definition, references, highlights, and Call Hierarchy to understand impact before rename.
5. Save and Check Project after changing a manifest, module, or Import.
6. Run the relevant case through inline Run Test or Test Explorer.
7. Run Project and inspect the task terminal, which remains open after completion.
8. Build Development Debug while developing.
9. Run the full suite and Build Development Release before review.
10. Format the document or selection when needed, then record compiler and extension revisions in reproducible evidence.

## A quick decision table

| Need | Tool |
|---|---|
| Understand a word or symbol | Hover |
| See accepted arguments | Signature Help |
| Open a declaration | Go to Definition |
| See a declaration without leaving the file | Peek Definition |
| Understand impact | Find All References |
| See uses in this file | Usage highlights |
| Rename across files | Rename Symbol |
| See who calls whom | Show Call Hierarchy → Incoming/Outgoing |
| Repair compiler-reported keyword case | Ctrl+. → Quick Fix |
| Adjust indentation while preserving tokens | Format Document/Format Selection in the Command Palette |
| Check one unsaved source | Check Active Source |
| Check the real project and modules | Check Project |
| Run a project | Run Project in a VS Code terminal |
| Check a small behavior | Test Explorer |
| Run a test at its declaration | Run Test above a discovered test procedure |
| See the active compiler | Show Toolchain Status |

## Ready in this guide

- Source and manifest coloring and Outline
- Compiler-backed diagnostics and project-aware LSP
- Completion, hover, nested signature help, and workspace symbols
- Cross-file definition and references, Peek, highlights, and compiler-validated rename
- WB200/WB201 Quick Fix candidates checked by the compiler
- Token-preserving Format Document/Selection, retaining comments, strings, and line endings
- Inline Run Test by exact compiler-discovered identity and direct-call hierarchy
- New Project, active-project selection, and Projects view
- Direct local-module dependency management
- Check, Run, Development Build Debug and Release, and Tasks
- Native Test Explorer and bundled examples
- Offline v0.3 specification

This ready list is limited to the verified compiler/runtime 0.2.0, protocol 0.1.0,
and extension 0.3.0 set. The project editor service follows the compiler's
capability record. An older compiler may omit `editorProject`,
`editorSemanticGraph`, or `editorProjectTests`; a new extension does not create
those capabilities by itself.

The daily editor example passed `wb check`, both tests, and `wb run` output `24`
on Windows/macOS ARM64. E01–E10 normal actions passed in a real Windows VS Code
window. Editor and protocol suites passed 131/131 and 90/90 on both hosts. The
one-case inline Run Test happy path was checked separately from cancellation
of a native test run through Testing/Command Palette. In the cancellation check,
completed results remained and interrupted work was distinct from Passed.

## Planned or outside this guide

- Debug Adapter Protocol, breakpoints, and stepping
- A formatter whose layout is designed by the compiler; the current shared
  extension/protocol formatter conservatively changes indentation and preserves tokens
- General import and manifest code actions beyond keyword-case quick fix
- Production entitlement and fresh no-SDK host acceptance
- Signing, notarization, and Marketplace publication
- Linux ARM64 and native x86_64 acceptance
- WebView and language or library work beyond the verified scope; WORM M2/M3 examples in this catalog are covered
- Go to Implementation and unresolved procedure-value call targets

Renaming a test-entry procedure that changes catalog identity remains unsupported.
If a saved test file has no discoverable case or app/test snapshots change
during validation, References, Rename, and incoming Call Hierarchy return
unavailable rather than a partial result. Inline Run Test requires saved project
sources and is limited to 100 cases and a 1 MiB source file. Project overlays
allow 32 files, 1 MiB per file, and 4 MiB total. These bounds make results
auditable; they do not promise navigation for every expression or token.

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


## 0.4.0 development candidate with compiler 0.2.0

Extension 0.3.0 with protocol 0.1.0 above remains the published version. Source 0.4.0 remains an unpublished DX01–DX10 candidate. Protocol checks passed 98/98 on each Windows/macOS ARM64 host; editor checks passed 154 with one Mac-alias skip on Windows and 155/155 on Mac; the repaired isolated Windows host passed 16/16.

In the installed Windows candidate, navigation and code inspection passed for Shortcut Guide, Actions at Caret, Refactor This, rename preview, cold Workspace Symbols, F12 while an unowned Template was open, and a resolved semantic-function token. Editing passed for file and linked templates with Undo, and Surround With with Check/Undo. The Run/Test workflow passed for named Run, Run Again, test navigation, the intentionally failing scaffold and native failed-case rerun; Toolchain Doctor and Release Build passed in the same window.

The Insert Template statement command passed in the repaired Windows VSIX: entering Vim Insert mode before invoking it inserted `Let value As Integer = 0`, Tab advanced to the next placeholder, and Ctrl+Z restored the empty document without an infrastructure notification. Mac/Linux real-window actions are not claimed. Compiler/runtime 0.2.0 and protocol 0.2.0 are the matched candidate tools. The extension version is separate from the language and package versions.

Set `wbasic.shortcutProfile = intellij` for WBasic-editor bindings: Shift+F6 Rename, Ctrl+B on Windows Definition, Alt+Enter Actions at Caret, Ctrl+Alt+Shift+T Refactor This and Shift+F10 Run Again. The default `standard` adds none of these keys. **Shortcut Guide** lists them; OS or Vim bindings may conflict. **Insert Template** has linked placeholders, **Insert File Template** inserts into an empty WBasic editor, and **Surround With** explicitly wraps a selection in If or Try/Finally. Review and Check Project after filling conditions and cleanup because templates do not prove semantic equivalence.

Named Run configurations remember the manifest, profile and arguments; **Run Again** repeats normal application effects. Test navigation finds candidates; the test scaffold has an intentionally failing TODO assertion and claims no coverage. Cold Workspace Symbols uses accepted compiler reports with caps of 8 workspace roots, 16 manifests, 512 directories, 8192 entries, depth 16 and 256 results. It rechecks freshness and reports rejected projects explicitly when other projects can still be shown; it is not a complete index. Semantic color applies only to resolved compiler identities, with lexical color still useful in incomplete code. **WBasic: Toolchain Doctor** shows compiler capabilities and recovery hints for missing or invalid configuration, plus the time of one capability query. That time is not whole-editor latency or proof of runtime pairing or fresh no-SDK distribution. An unsaved Template outside the compiler project inventory is kept out of project overlays and receives standalone diagnostics; owned project sources continue to use project analysis. After the protocol repair, F12 in an owned source still reached its declaration while the Template was open. The language repository's DX report records artifact pins and detailed evidence.

### Vim in the candidate window

In the tested Windows VS Code window, Vim Normal mode claimed Ctrl+T and Visual Line mode claimed Ctrl+B. Use the Command Palette for Workspace Symbol and Definition when those keys are claimed. Enter Vim Insert mode before invoking Insert Template so Tab can advance placeholders; Visual mode intercepted Tab in the tested window. Inspect both linked names after pasting. In the observed case, the default was already selected, yet paste appended to it while updating both occurrences. This Vim observation is scoped to the tested key mapping, not every Vim setup.
