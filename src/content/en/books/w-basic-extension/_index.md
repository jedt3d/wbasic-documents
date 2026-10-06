---
title: "WBasic Extension Guide"
description: "A hands-on guide to WBasic in VS Code, from creating a project to running, building, testing, and managing modules"
weight: -4
---

**Choose the matched version.** Chapters 1–12 use locally verified extension `wbasic-dev.wbasic@0.2.3` with a matched local development compiler/runtime. The published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. Obtain the 0.2.3 VSIX separately: the published ARM64 ZIPs immutably bundle 0.2.1. There is no 0.2.3 release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

The current development guide teaches the **WBasic Extension for VS Code** through a complete working
path: open an empty workspace, create a first project, write source with completion
and diagnostics, manage modules, build the program, and run tests through Test Explorer.

We use one small project, `MyFirstWBasic`, throughout the book. Every chapter has
a **practice task** and a **checkpoint**, so you can tell whether the step worked
instead of clicking through pictures and hoping the compiler feels charitable.

The development payload described here is `wbasic-dev.wbasic@0.2.3`, whose Command Palette workflow was verified with VS Code 1.140.0 on Windows 11 ARM64. Its Mac ARM64 editor workflow and interactive TUI input were not rerun at 0.2.3. With matched compiler, runtime assets, and linker, Run and Development Build work without using a host SDK. Building from source still needs a native SDK. Fresh no-SDK host acceptance and production distribution remain open.

For the matched prerelease, start with [Prepare VS Code, the extension, and the compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}).

