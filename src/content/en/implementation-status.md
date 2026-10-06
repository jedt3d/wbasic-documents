---
title: "Compiler and tooling versions covered by this reference"
description: "Private experimental compiler/runtime 0.2.0, protocol 0.1.0, and Extension 0.3.0"
---

Updated **6 October 2026**. This guide covers the [private experimental v0.2.0 release](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0): compiler/runtime **0.2.0**, protocol **0.1.0**, and VS Code Extension **0.3.0** for Windows/macOS ARM64. Its sealed source is `8d740dabe72bdf27f978f979d64725dc26c84be0`. Before installation, compare ZIP/VSIX SHA-256 values with the release record and [compiler release manifest](https://jedt3d.github.io/wbasic-documents/compiler-release.json). The older `0.1.0` release and VSIX `0.2.1` remain immutable history; Extension `0.2.3` was a locally verified correction, not part of this new package.

Compiler release numbers differ from the language design's **draft v0.3** and the website's publication version. The CLI, portable ZIP, and compiler selected in VS Code must use compiler `0.2.0` with its matched runtime/linker. Check the actual version with `wb --version` and **WBasic: Show Toolchain Status** before updating manifests.

## The current toolchain

| Component | Current scope |
|---|---|
| Compiler/runtime | Matched 0.2.0 pair on native Windows ARM64 / macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor`, `editor-project`, `editor-manifest` |
| Build | Project manifest; debug/release profiles; production entitlement remains false |
| WORM | Experimental SQLite: typed mapping, changes, queries, transactions, and optimistic version guards |
| VS Code Extension | `wbasic-dev.wbasic@0.3.0` with E01–E10 normal actions checked in real Windows VS Code; Marketplace is outside scope |
| LSP/MCP | Protocol package 0.1.0; compiler-owned project snapshots and semantic graph |
| Project/module pins | `toolchain = "0.2.0"`; New Project pins the selected compiler automatically |
| Guides | Getting Started, reference, and Extension Guide use this matched set |

The Extension keeps Check/Run/Development Build visible in the Command Palette, while handlers still check Workspace Trust and live capabilities. Run/Build use a process task that keeps output readable after completion. `wbasic.compilerPath` accepts the compiler's absolute path. When changing packages, keep runtime/linker from the same package and rebuild output made with another runtime. Do not bypass a mixed-pair error by overwriting old files.

## Editor capabilities and boundaries

E01–E10 normal actions passed in VS Code 1.140.0 on Windows ARM64: hover, definition, rename, completion/parameter hints, references/Peek, highlights, Quick Fix, Format Document/Selection, one-case inline Run Test, and direct-call hierarchy. Native test-run cancellation through Testing/Command Palette passed separately: completed results remained, while interrupted work was not marked Passed. Test-source operations analyze discovered contexts separately so an app rename cannot leave test calls stale.

Editor and protocol suites passed **131/131** and **90/90** on Windows/macOS ARM64; the isolated Windows Extension Host passed **12 checks**. Workspace Rust tests passed **544 Windows** (5 ignored) and **532 Mac** (3 ignored); ignored tests are not Passed. The current example catalog has **32 entries / 10 categories / 66 teaching files**. `editor-daily-workflow` passed check, 2/2 tests, and run output `24` on both native hosts. BillingTime passed debug/release against real SQLite: a fresh two-line invoice totals 18000 cents and a repeat run creates the next invoice.

The current shared extension/protocol formatter conservatively changes indentation while preserving tokens, comments, strings, and line endings; it is not a compiler-owned layout engine. Hover does not extract authored declaration comments as documentation. Call Hierarchy includes only compiler-resolved direct calls; Go to Implementation and targets of indirect procedure-value calls are outside scope. Arbitrary expression chains and intrinsic String/Array member completion remain incomplete. Renaming a test-entry procedure that changes catalog identity is unsupported. An action lacking complete test context is rejected rather than returning partial edits.

## Install and verify the package

Compare ZIP/VSIX SHA-256 values with their sidecars and release record before extraction. Use `Install-And-Test.ps1` or `Install-And-Test.sh` and the session PATH helper. Core compilation requires no Node; Node is for optional protocol adapters, and VS Code is for editor use. Continue with [Getting Started]({{< relref "/books/getting-started/_index.md" >}}), [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}), and the [Extension Guide]({{< relref "/books/w-basic-extension/_index.md" >}}).

The native evidence above comes from developer hosts. It does **not** establish fresh no-SDK host acceptance or production distribution. Production entitlement, redistribution notices, signing/notarization, and Linux ARM64/native x86_64 acceptance remain open; `noSdkDistribution` stays false.

## Acceptance and historical examples

At the published **v0.1.0** checkpoint, the normative draft v0.3 catalog was **72 Passed / 23 Planned / 0 Deferred**, excluding separate WORM milestones. That is an older release boundary, not the current status. The separately tracked current source catalog remains **93 Passed / 2 Planned**; this editor/website work does not promote it. R6 D1–D5 passed within their recorded scope. Positive Windows OSC52 transport used a pinned private Microsoft ConPTY endpoint, while some inbox hosts still time out; NativeLocal and OSC52 are distinct routes. Older release evidence did not include Linux ARM64 or native x86_64.

Small WBasic Projects retains **29 native-verified examples / 52 Planned lessons** at their recorded revisions. Documentation changes do not promote Planned lessons or establish human/AI cost claims. Historical evidence keeps its original versions and hashes; the release record and website manifest identify the current set.
