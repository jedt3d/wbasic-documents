---
title: "1 · Prepare VS Code, the extension, and the compiler"
description: "Install VSIX 0.3.0, connect wb 0.2.0, and confirm the selected toolchain"
weight: 1
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

The first chapter has one goal: introduce VS Code to `wb` before creating a
project. If you skip this step, some completion may still look perfectly polite,
but compile commands will stand silent like a professor who never received the class list.

## What you need

- VS Code 1.137 or later
- The 0.3.0 VSIX recorded in the 0.2.0 package's `wb-package.json`
- `wb`, runtime assets, linker, and probe from the same 0.2.0 ZIP
- MSVC ARM64 or Apple Clang only if you are building the toolchain from source

This private experimental release is development tooling, not a Marketplace or
production release. Native Run/Build passed on developer hosts; fresh no-SDK
host acceptance remains open.

## Install the VSIX

1. Open the **Extensions** view in VS Code.
2. Open the `…` menu at the top of the view.
3. Select **Install from VSIX…**.
4. Select the 0.3.0 VSIX at `vscodeVsix.path` in `wb-package.json` and verify its SHA-256 against the release record.
5. Reload the window when VS Code asks.

Use **Developer: Reload Window** after installation. Extension 0.3.0 passed real VS Code 1.140.0 actions on Windows ARM64 and isolated host checks. Mac ARM64 editor/protocol tests are separate evidence, not proof that every UI action was repeated in a real Mac window.

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

Confirm extension `0.3.0` in the Extensions view. Open the Command Palette and select **WBasic: Show Toolchain Status**. For this guide, verify it reports compiler `0.2.0`. A ready result shows the path, compiler version, development round, and native target for this machine.

**WBasic: About and Credits** shows the installed extension version without invoking the compiler and opens local extension notices in Restricted Mode. Compiler/runtime notices belong to the separate matched compiler package.

{{< guide-screenshot name="01-toolchain-status.png" alt="VS Code after WBasic: Show Toolchain Status, showing compiler path, version, development round, and native target without personal information" caption="Screenshot to capture: Toolchain Status after the VSIX and compiler are connected" >}}

## Workspace Trust

Syntax highlighting, Outline, and the bundled specification remain available in
Restricted Mode. Check, run, build, and test work only in a trusted workspace,
because these commands invoke the native compiler and may run project programs.

Trust only folders whose origin you know. In 0.3.0, Check Project, Run Project,
and the three Development Build commands remain visible in the palette. If one
refuses to run, check Workspace Trust and live compiler capabilities before
changing settings.

## Checkpoint

- [ ] The extension is displayed as `WBasic`.
- [ ] The Command Palette finds `WBasic:` commands.
- [ ] **Show Toolchain Status** reports ready and the correct machine target.
- [ ] The practice workspace is trusted.

Continue to [Create the first project]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}}).


## 0.4.0 development candidate

Extension 0.4.0 is still a development candidate, not the VSIX in the current release. The installation steps above continue to use published Extension 0.3.0 with compiler/runtime 0.2.0. Read the [candidate scope and open checks]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}) before building from source.
