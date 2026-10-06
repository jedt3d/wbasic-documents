---
title: "1 · Prepare VS Code, the extension, and the compiler"
description: "Install the development VSIX, connect wb, and confirm that the extension sees the correct toolchain"
weight: 1
---

> **Version scope — locally verified extension 0.2.3.** The 0.2.3 VSIX was verified locally with a matched development compiler/runtime; the published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. The published ARM64 ZIPs immutably bundle extension `0.2.1`; extension `0.2.3` has no public release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

The first chapter has one goal: introduce VS Code to `wb` before creating a
project. If you skip this step, some completion may still look perfectly polite,
but compile commands will stand silent like a professor who never received the class list.

## What you need

- VS Code 1.137 or later
- A separately supplied 0.2.3 VSIX; the published ZIP still bundles 0.2.1 at `editors/vscode/wbasic-0.2.1.vsix`
- `wb`, runtime assets, and linker from the same v0.1.0 ZIP
- MSVC ARM64 or Apple Clang only if you are building the toolchain from source

This private prerelease is development tooling, not a Marketplace or production
release. The portable ZIP's bundled toolchain runs and builds without using a host
SDK; fresh no-SDK host acceptance remains open.

## Install the VSIX

1. Open the **Extensions** view in VS Code.
2. Open the `…` menu at the top of the view.
3. Select **Install from VSIX…**.
4. Select the separately supplied 0.2.3 VSIX. The extracted package's `wb-package.json` points to 0.2.1; if using that older VSIX, verify its recorded SHA-256.
5. Reload the window when VS Code asks.

Use **Developer: Reload Window** after installation so the current window loads the new version. Extension 0.2.3 was checked in VS Code 1.140.0 on Windows ARM64. The published ZIP keeps its original 0.2.1 extension and matched compiler/runtime/linker.

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

Confirm extension `0.2.3` in the Extensions view. Open the Command Palette and select **WBasic: Show Toolchain Status**. For this guide, verify it reports compiler `0.1.0`. A ready result shows the path, compiler version, development round, and native target for this machine.

{{< guide-screenshot name="01-toolchain-status.png" alt="VS Code after WBasic: Show Toolchain Status, showing compiler path, version, development round, and native target without personal information" caption="Screenshot to capture: Toolchain Status after the VSIX and compiler are connected" >}}

## Workspace Trust

Syntax highlighting, Outline, and the bundled specification remain available in
Restricted Mode. Check, run, build, and test work only in a trusted workspace,
because these commands invoke the native compiler and may run project programs.

Trust only folders whose origin you know. In 0.2.3, Check Project, Run Project,
and the three Development Build commands remain visible in the palette. If one
refuses to run, check Workspace Trust and live compiler capabilities before
changing settings.

## Checkpoint

- [ ] The extension is displayed as `WBasic`.
- [ ] The Command Palette finds `WBasic:` commands.
- [ ] **Show Toolchain Status** reports ready and the correct machine target.
- [ ] The practice workspace is trusted.

Continue to [Create the first project]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}}).

