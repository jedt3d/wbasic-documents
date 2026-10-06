---
title: "Compiler and tooling versions covered by this reference"
description: "Published compiler/runtime 0.1.0 and locally verified Extension 0.2.3"
---

Updated **6 October 2026**. The [private experimental v0.1.0 release](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0) publishes compiler/runtime **0.1.0** for Windows and macOS ARM64 and bundles Extension **0.2.1**. Extension **0.2.3** is verified locally on Windows ARM64 with matched development compiler source `dfdcbdc`; it has no public release or Marketplace listing. CLI, portable ZIP and the compiler selected in VS Code use the same compiler version. Older downloads and the published ZIPs remain immutable.

Compiler release numbers differ from the language design's **draft v0.3** and the website's publication version. The [compiler release manifest](https://jedt3d.github.io/wbasic-documents/compiler-release.json) records the sealed source and both ZIP hashes. The compiler cannot read minds, but `wb --version` can resolve a surprisingly large number of mysteries.

## The current toolchain

| Component | Current scope |
|---|---|
| Compiler/runtime | Matched 0.1.0 pair on native Windows ARM64 / macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor`, `editor-project`, `editor-manifest` |
| Build | Project manifest; debug/release profiles; production entitlement remains false |
| WORM | Experimental SQLite: typed mapping, changes, query, transactions and optimistic version guards |
| VS Code extension | Locally verified `wbasic-dev.wbasic@0.2.3` on Windows ARM64; published ZIP still includes `editors/vscode/wbasic-0.2.1.vsix` |
| LSP/MCP | Protocol package 0.0.2; compiler-owned project snapshots and editor metadata |
| Project/module pins | `toolchain = "0.1.0"`; New Project pins the selected compiler automatically |
| Guides | Getting Started, reference and Extension Guide use this release cohort |

The Extension and protocol package keep independent versions. Extension 0.2.3 keeps five Check/Run/Build palette commands visible, subject to handler trust and live capability checks. Run/Build retain dedicated process-task output after completion. The live Windows compiler-path failure was resolved by relocating the matched toolchain to a path visible to that VS Code process; the precise cause and any universal Store/MSIX rule remain unproven. The published compiler source is `3901cf17`; equal compiler versions do not merge the evidence. macOS/Linux editor and interactive TUI input were not rerun at 0.2.3. After installation, reload the window and use **WBasic: Show Toolchain Status**; confirm the selected compiler reports 0.1.0. An explicit `wbasic.compilerPath` can select the portable ZIP's compiler. Its matched runtime and linker remain together in that package. Building the compiler from Rust source or using a developer installation still requires the native platform toolchain/SDK.

## Editor capabilities and their boundaries

Live diagnostics and navigation use project snapshots including unsaved source. Completion checks visibility and resolves fields/methods for simple declared receivers using compiler binding identities. Cross-file rename validates the proposed snapshot through the compiler. The catalog has **31 entries / 10 categories / 61 teaching files**; WORM M2/M3 copy with their modules and support Check/Build. Database execution requires an explicit path. M4 UI is a repository reference requiring module staging and is excluded from Copy Example.

Arbitrary expression chains, complete type-alias mapping and intrinsic String/Array member completion remain incomplete. Debugging and formatting are not advertised. The published 0.2.1 integration passed **71 protocol**, **120 editor**, and **11 real VS Code Extension Host checks** per ARM64 platform, plus 519 Windows / 507 macOS Rust tests (existing opt-in ignored tests remain separate). The release adds matched native release builds and extracted-ZIP tests. These statements do not claim every historical book example was rerun.

## Install and verify the package

Compare each ZIP's SHA-256 with its sidecar and release record before extraction, then run `Install-And-Test.ps1` or `Install-And-Test.sh` and use the session PATH helper. Core compilation requires no Node; Node is optional for protocol adapters, and VS Code is optional for editor use. Read [Getting Started]({{< relref "/books/getting-started/_index.md" >}}), [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}), and the [Extension Guide]({{< relref "/books/w-basic-extension/_index.md" >}}).

Native developer-host package verification covers Windows 11 Pro 25H2 ARM64 (PowerShell 5.1 and 7) and macOS 26.6.2 ARM64. Unicode, compile/run/build, nonzero test discovery and billing checks pass. It does **not** establish fresh-machine/no-SDK acceptance. Redistribution notices, signing/notarization and production entitlement remain open; `noSdkDistribution` stays false.

## Acceptance and historical examples

At the published v0.1.0 checkpoint, the normative draft v0.3 catalog was **72 Passed / 23 Planned / 0 Deferred**, excluding separate WORM milestones. This is the published release boundary, not a promotion or assessment of later development rounds. R6 D1–D5 passed in their recorded scope; positive Windows OSC52 transport uses a pinned private Microsoft ConPTY endpoint, while some inbox hosts still time out. NativeLocal and OSC52 are distinct routes. Linux ARM64 and native x86_64 were not included in that published release evidence.

Small WBasic Projects retains **29 native-verified examples / 52 Planned lessons** at their recorded revisions. This release does not automatically promote Planned lessons or human/AI cost claims. Historical evidence keeps its original versions and hashes. The release record and this site's manifest provide the current identities.
