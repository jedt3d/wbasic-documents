---
title: "1 · Prepare VS Code, the extension, and the compiler"
description: "Install the development VSIX, connect wb, and confirm that the extension sees the correct toolchain"
weight: 1
---

> **Version scope — private v0.1.0 prerelease.** These steps use the published private experimental compiler/runtime `0.1.0`, bundled extension `wbasic-dev.wbasic@0.2.1`, and protocol package `0.0.2` from sealed source `3901cf17`. Start with [the matched-package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

The first chapter has one goal: introduce VS Code to `wb` before creating a
project. If you skip this step, some completion may still look perfectly polite,
but compile commands will stand silent like a professor who never received the class list.

## What you need

- VS Code 1.137 or later
- The bundled 0.2.1 VSIX at `editors/vscode/wbasic-0.2.1.vsix`
- `wb`, runtime assets, and linker from the same v0.1.0 ZIP
- MSVC ARM64 or Apple Clang only if you are building the toolchain from source

This private prerelease is development tooling, not a Marketplace or production
release. The portable ZIP's bundled toolchain runs and builds without using a host
SDK; fresh no-SDK host acceptance remains open.

## Install the VSIX

1. Open the **Extensions** view in VS Code.
2. Open the `…` menu at the top of the view.
3. Select **Install from VSIX…**.
4. Select the VSIX at `vscodeVsix.path` in the extracted package's `wb-package.json`; verify its recorded SHA-256.
5. Reload the window when VS Code asks.

The 0.2.1 payload is installed in the normal Windows VS Code profile. Its managed
compiler, runtime assets, and linker now match the published Windows ZIP. If your
window was already open, use **Developer: Reload Window** before checking the commands.

After installation, open the Command Palette and search for `WBasic:`. The
extension is active when you see commands such as **WBasic: New Project**,
**WBasic: Show Toolchain Status**, and **WBasic: Open v0.3 Specification**.

## Connect the compiler

By default, the extension searches for `wb` in this order:

1. The development toolchain directory managed by the extension
2. The debug build in the WBasic repository
3. The system `PATH`

If discovery fails, open Settings, search for `WBasic: Compiler Path`, and enter
the absolute path to `wb.exe` on Windows or `wb` on macOS. Do not append a shell
command or arguments: this setting accepts one executable path.

Confirm extension `0.2.1` in the Extensions view. Open the Command Palette and select **WBasic: Show Toolchain Status**. For this guide, verify it reports compiler `0.1.0`. A ready result shows the path, compiler version, development round, and native target for this machine.

{{< guide-screenshot name="01-toolchain-status.png" alt="VS Code after WBasic: Show Toolchain Status, showing compiler path, version, development round, and native target without personal information" caption="Screenshot to capture: Toolchain Status after the VSIX and compiler are connected" >}}

## Workspace Trust

Syntax highlighting, Outline, and the bundled specification remain available in
Restricted Mode. Check, run, build, and test work only in a trusted workspace,
because these commands invoke the native compiler and may run project programs.

Trust only folders whose origin you know. If compile commands are missing while
the toolchain is ready, check Workspace Trust before changing one setting after another.

## Checkpoint

- [ ] The extension is displayed as `WBasic`.
- [ ] The Command Palette finds `WBasic:` commands.
- [ ] **Show Toolchain Status** reports ready and the correct machine target.
- [ ] The practice workspace is trusted.

Continue to [Create the first project]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}}).

