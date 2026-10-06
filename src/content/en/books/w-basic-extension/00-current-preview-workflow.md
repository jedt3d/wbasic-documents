---
title: "0 · Choose the matched 0.1.0 package"
description: "Distinguish the published ARM64 package from the locally verified 0.2.3 VS Code extension"
weight: 0
---

**Private experimental v0.1.0 prerelease.** The [private release](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0) contains compiler/runtime `0.1.0`, bundled VS Code extension `wbasic-dev.wbasic@0.2.1`, and protocol package `0.0.2` from sealed source `3901cf17ce971dd0c7f591b424d73b086610fc46`. All eight release assets were downloaded and rehashed before publication. Access requires permission to the private repository. This guide uses a separately supplied extension `0.2.3`. Its live Windows palette proof used development compiler source `dfdcbdc`; the published `0.1.0` compiler is sealed source `3901cf17`. Equal version numbers alone do not establish equivalent test evidence. The extension has no public release or Marketplace listing.

With the sealed published compiler/runtime pair, the 0.2.3 extension passed 127 editor unit checks with no skips and 11 isolated VS Code host checks on Windows ARM64. The real user's Check/Run/Build palette and retained-output proof remains tied to the development source `dfdcbdc`.

## Select and verify the ZIP

Download `wbasic-0.1.0-windows-arm64.zip` or `wbasic-0.1.0-macos-arm64.zip` from the private release for your host. Compare the ZIP SHA-256 with its `.sha256` sidecar and the release record before extraction. The verified Windows ZIP hash is `85c135ce9ad6ccf2edadd3c892ea677110f1ca0f15d012ec348a924213d93a74`; the macOS ZIP hash is `50abba3266fd1209666865e1351a68a899aabed95f5a486522d996bc1a93bad6`. Inspect `wb-package.json` inside the top-level package folder for compiler version, source revision, target, inventory, and `vscodeVsix.path`/`sha256`. The recorded VSIX is `editors/vscode/wbasic-0.2.1.vsix` with SHA-256 `d2aa385b5ec035b278aadfcfea500093e23e98797d91b307902cf14413f6158f`; verify both path and hash. Keep the compiler, matched runtime assets, linker, and probe from the same ZIP together. The bundled runtime uses platform libraries rather than a standalone static runtime file.

The ZIP's `Install-And-Test.ps1` on Windows or `Install-And-Test.sh` on macOS checks its native examples and writes a report. Core `wb check`, `wb run`, `wb test`, and `wb build` do not require VS Code. The extracted package ran and built in debug/release with its bundled compiler, runtime assets, and linker without using a host SDK; source builds still require native development tools. This private experimental package is separate from production distribution. Fresh no-SDK acceptance, redistribution notices, signing/notarization, and production entitlement remain open.

## Connect VS Code

In Extensions, choose **Install from VSIX…** and select the separately supplied 0.2.3 VSIX. The `wb-package.json` path still identifies bundled 0.2.1, with its older behavior. Reload the window and confirm the installed version in Extensions. In a trusted workspace, set `wbasic.compilerPath` to an absolute `wb.exe` or `wb` path visible to this VS Code process; set `wbasic.probePath` only if you use the separate native probe command. Run **WBasic: Show Toolchain Status** and confirm compiler `0.1.0` and the expected target. The extension also searches its managed development toolchain, a repository debug build, and `PATH`.

The package's offline specification is under `docs/`. Workspace Trust is required for compiler, build, run, and test commands. Coloring, Outline, and local documentation remain available in Restricted Mode.

## Start a project

Use **WBasic: New Project** in an empty folder. Its `App.wproj` pins the selected compiler's reported version, so confirm `toolchain = "0.1.0"` before Check Project. For a module, its `module.toml` must use the same toolchain version. Do not mix v0.0.2 source manifests or compiler/runtime binaries with this package without an explicit reviewed update. Use **WBasic: Check Project** to validate saved imports and direct dependencies; **Check Active Source** checks an unsaved standalone file and cannot replace a project check.

Continue with [Prepare VS Code, the extension, and the compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}), then follow chapters 2–12 for Projects, diagnostics, completion, navigation, Test Explorer, examples, and Development Build. The older private v0.0.2 package contains extension 0.1.0 and does not provide those editor workflows; use its own release notes and package documentation when working at that version.
