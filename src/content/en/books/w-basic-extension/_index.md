---
title: "WBasic Extension Guide"
description: "Use WBasic 0.2.0 and VS Code extension 0.3.0 for projects, editing, running, building, and testing"
weight: -4
---

**Choose the matched version.** Chapters 1–12 use compiler/runtime `0.2.0`, protocol `0.1.0`, and extension `wbasic-dev.wbasic@0.3.0` from one private experimental ARM64 set. The older `0.1.0` release with extension `0.2.1` remains separate release history, not the toolchain for E01–E10 in this guide. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

The current development guide teaches the **WBasic Extension for VS Code** through a complete working
path: open an empty workspace, create a first project, write source with completion
and diagnostics, manage modules, build the program, and run tests through Test Explorer.

We use one small project, `MyFirstWBasic`, throughout the book. Every chapter has
a **practice task** and a **checkpoint**, so you can tell whether the step worked
instead of clicking through pictures and hoping the compiler feels charitable.

Extension 0.3.0 passed E01–E10 normal actions in VS Code 1.140.0 on Windows 11
ARM64. A separate native test-run cancellation through Testing/Command Palette
retained completed cases and distinguished interrupted work; the one-case
inline Run Test happy path passed separately. Editor/protocol suites passed on
Windows/macOS ARM64 at the same source revision. That does not prove every UI
action in a Mac or Linux window. Run and Development Build passed with matched
compiler, runtime assets, and linker on developer hosts. Fresh no-SDK host
acceptance and production distribution remain open.

For the matched prerelease, start with [Prepare VS Code, the extension, and the compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}).

