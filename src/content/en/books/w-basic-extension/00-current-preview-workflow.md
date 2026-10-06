---
title: "0 · Choose the matched 0.2.0 toolchain"
description: "Verify the ARM64 package, VSIX 0.3.0, and the compiler selected by VS Code"
weight: 0
---

This guide covers one matched **private experimental** set: compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `wbasic-dev.wbasic@0.3.0` for Windows/macOS ARM64. Obtain it from the [private WBasic releases](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0); repository access is required. The older `0.1.0` release with extension `0.2.1` remains separate release history. Extension `0.2.3` was a locally verified correction, not the VSIX in this new package. Do not combine binaries, runtime assets, manifest pins, or test results from different sets.

## Select and verify the package

Choose the Windows ARM64 or macOS ARM64 ZIP labeled compiler `0.2.0`. Compare its SHA-256 with the `.sha256` sidecar and release record before extraction. Read the package's `wb-package.json`: `sourceRevision`, target, compiler version, inventory, and `vscodeVsix.path`/`sha256` must match the downloaded assets. Keep `wb`, runtime assets, linker, and native probe from the same package together. A build folder made with another runtime may be rejected; preserve old output separately before rebuilding.

This is private experimental development tooling. Native Windows/macOS ARM64 checks passed on developer hosts, including the source-backed editor example and BillingTime debug/release runs. Production entitlement, fresh no-SDK host acceptance, signing/notarization, and other platforms remain outside production distribution acceptance.

## Connect VS Code

In Extensions choose **Install from VSIX…**, select the `0.3.0` VSIX recorded by `wb-package.json`, verify its hash, then use **Developer: Reload Window**. Open the project in a trusted workspace and run **WBasic: Show Toolchain Status**. Confirm compiler `0.2.0` and your native target. If discovery fails, set `wbasic.compilerPath` to the absolute path of `wb.exe` or `wb` from the selected package; use `wbasic.probePath` only when the probe is separate. These settings take executable paths, not shell commands.

Check, Run, Build, and Test require Workspace Trust and compiler-advertised capabilities. Coloring, Outline, About and Credits, and the bundled specification remain available in Restricted Mode. Project editor actions require `editorProject` and `editorSemanticGraph`; work involving test sources also requires `editorProjectTests`. A new VSIX cannot supply those capabilities to an older compiler.

## Start a project and check the result

Use **WBasic: New Project** in an empty folder. The generated manifest pins the selected compiler's reported version: for this set, `toolchain = "0.2.0"` in `App.wproj` and related `module.toml` files. Use **WBasic: Check Project** for the saved project. Live diagnostics can analyze bounded unsaved project overlays; **Check Active Source** checks one standalone source and cannot replace a project check for Imports.

The [daily editor workflow at tag v0.2.0](https://github.com/jedt3d/wbasic-language/tree/v0.2.0/examples/editor-daily-workflow) is pinned to the release source and included in the package. Its cross-module project passes `wb check`, passes both `wb test` cases, and prints `24` under `wb run`. Continue with [Install the extension and compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}), then chapters 2–12 for writing, navigation, formatting, inline tests, and direct-call hierarchy in VS Code.
