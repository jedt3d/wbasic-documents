---
title: "0 · Use the current merged extension"
description: "A source-backed VS Code workflow for compiler 0.0.2 and extension 0.1.0"
weight: 0
---

This chapter applies to the merged WBasic editor/tool source at `143be583` (unchanged at `e7edb1e`) and the private experimental `v0.0.2` package sealed at `b9c8ef99`. The optional VSIX inside that ZIP is extension version `0.1.0`, requires VS Code `^1.139.0`, and is labeled an R6 Draft. It is not a Marketplace extension. Use a matched compiler/runtime pair. The ZIP includes its compiler, linker and runtime; a source checkout needs a native SDK to build those files. Fresh no-SDK host acceptance and production distribution remain open.

## Install from the private ZIP

Choose `wbasic-0.0.2-windows-arm64.zip` or `wbasic-0.0.2-macos-arm64.zip` for your ARM64 host. Verify its SHA-256 against the supplied `.sha256` sidecar, extract it, and keep the top-level package folder intact. The package has `wb.exe`/`wb`, `wb-native-probe.exe`/`wb-native-probe`, `wb-linker.json`, its bundled linker and runtime, offline draft specifications in `docs/`, and the optional `editors/vscode/wbasic-r5-0.1.0.vsix`. Inspect `wb-package.json` for the package's source, target and file inventory.

In VS Code's Extensions view, choose **Install from VSIX…** and select that `wbasic-r5-0.1.0.vsix`. In a trusted workspace, set `wbasic.compilerPath` to the **absolute path** of the extracted package's top-level `wb.exe` on Windows or `wb` on macOS. To use **WBasic: Inspect R1 Native Probe**, set `wbasic.probePath` to the absolute path of the extracted top-level probe executable. The package's `docs/wbasic-language-spec-draft-0.3.md` is readable offline; open that file directly from the package. **Open Draft v0.3 Specification** resolves a path relative to the installed extension and is not verified for a standalone VSIX installation.

The package's `Install-And-Test.ps1` on Windows or `Install-And-Test.sh` on macOS checks its native examples and writes a report. The VSIX is optional for core `wb check`, `wb run`, `wb test` and `wb build`. A private package is still a development preview; its clean-host, editor-host and distribution acceptance are separate gates.

## Connect from a source checkout

Build the repository with `cargo build --workspace --locked`; this route needs the native build tools/SDK. Open `editors/vscode` as a local extension-development project, or package/install this source with your VS Code development tooling. In a trusted workspace, set `wbasic.compilerPath` to the **absolute executable path** of that checkout's `target/debug/wb.exe` on Windows or `target/debug/wb` on macOS. An empty setting uses that debug build relative to the extension source. `wbasic.probePath` only affects the separate **Inspect R1 Native Probe** command.

The merged extension has no **Show Toolchain Status** command and does not search a managed toolchain directory or `PATH`. Confirm the selected compiler in a terminal with its absolute path plus `--capabilities` and `--version`. Its capability record, rather than the editor's colors, determines which help and profile actions appear. Workspace Trust is required for compiler and probe commands; coloring works in Restricted Mode.

## Make a small project by hand

Create `App.wproj` and `src/Main.wbas` in a workspace folder. The extension has no **New Project** command.

```toml
# App.wproj
[project]
name = "MyFirstWBasic"
module = "App"
entry = "src/Main.wbas"
toolchain = "0.0.2"

[dependencies]
```

```wbasic
Module App

Procedure Main()
  PrintLn("Hello from WBasic")
EndProcedure
```

Keep the manifest toolchain equal to the selected compiler version. Source packages use a `src` directory; the entry declares `Module App`. For a local dependency, add a direct relative `.wmod` path to `[dependencies]` and give that module its own `module.toml` and `src` directory. There is no textual Include. The extension does not offer manifest key completion or a Projects tree.

## Check, run, build and test

Use **WBasic: Check Project** for the saved manifest, modules and imports. **WBasic: Show Project Modules** prints compiler project metadata. With one manifest the command selects it; with several it chooses the manifest containing the active file or asks you to pick. **WBasic: Check Active Source** sends unsaved editor text to `wb check - --json` as a standalone source, so it cannot resolve project imports. A `_spec.wbas` active source uses test mode.

**WBasic: Run Project** opens an interactive terminal. **WBasic: Test Project** runs the entire project suite and shows case identity, status and totals; there is no Test Explorer or individual-case UI. **WBasic: Emit Project Object** writes a native object, not a distributable application. **WBasic: Run Active Source in Terminal** runs a saved `.wbas` file. **WBasic: New R6 TUI/Jobs Template** opens an unsaved foundation example only when the compiler reports `r6-tui-jobs-foundation`; save it before running.

Set `wbasic.buildProfile` to `debug` (default) or `release` for project Check, Run, Build, Emit Object and Test. **WBasic: Build Project** and release mode require compiler capability `r8-shared-build-profile`; they create internal development builds. An explicit `profile` in a `wbasic` task overrides that setting. The task provider discovers saved `.wproj` files and offers check, run and test, plus build when the capability is present. A run task may supply literal `arguments`; an emit-object task needs an absolute `outputPath`. There is no `wbasic.defaultProfile` setting.

## Editor help and boundaries

Source coloring is lexical. Compiler-backed diagnostics come from Check Active Source or Check Project. Qualified completion, hover and signatures for libraries appear only under the corresponding compiler feature IDs. `Csv.Create`'s four-argument exclusive-create help requires `csv-exclusive-create`; WORM help requires both `worm-sqlite-feasibility` and matching version 1 metadata. These gates describe bounded APIs, not general field or instance-member inference.

Go to Definition, Find References and Rename are limited to compiler-resolved **same-file named procedures**. Rename validates the edited source. Keyword-case quick fixes require the compiler's `quickFix` capability and an exact WB200/WB201 span. Cross-file symbol navigation, project-wide rename, local-variable indexing, live LSP wiring in this extension, manifest Outline, Projects view, Test Explorer and bundled example browser are not present in this package. The separate `tools/protocol` LSP/MCP adapters offer bounded compiler-backed source and saved-project queries; they do not execute programs through LSP/MCP.

Chapters 1–12 and their screenshots describe the unmerged R8B `0.2.0` branch. Follow them only with that branch's extension and matched compiler. For the merged source, use this chapter and the compiler's `wb --capabilities` output as the practical boundary.
