---
title: "1 · Prepare VS Code, the extension, and the compiler"
description: "Install the development VSIX, connect wb, and confirm that the extension sees the correct toolchain"
weight: 1
---

The first chapter has one goal: introduce VS Code to `wb` before creating a
project. If you skip this step, some completion may still look perfectly polite,
but compile commands will stand silent like a professor who never received the class list.

## What you need

- VS Code 1.137 or later
- The WBasic development VSIX for R8B
- `wb` and the static runtime built from the same revision
- A native toolchain: MSVC ARM64 on Windows or Apple Clang on macOS

This release is development tooling. It is not a Marketplace release and does
not yet include an installer for a clean machine without an SDK.

## Install the VSIX

1. Open the **Extensions** view in VS Code.
2. Open the `…` menu at the top of the view.
3. Select **Install from VSIX…**.
4. Select `wbasic-0.2.0.vsix`.
5. Reload the window when VS Code asks.

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

Open the Command Palette and select **WBasic: Show Toolchain Status**. A ready
result shows the path, compiler version, development round, and native target
for this machine.

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

