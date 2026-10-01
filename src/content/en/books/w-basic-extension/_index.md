---
title: "WBasic Extension Guide"
description: "A hands-on guide to WBasic in VS Code, from creating a project to running, building, testing, and managing modules"
weight: -4
---

**Choose the matched version.** Chapters 1–12 describe the published private experimental `0.1.0` compiler/runtime prerelease with extension `wbasic-dev.wbasic@0.2.1` and protocol package `0.0.2`. Its Windows/macOS ARM64 ZIPs and bundled VSIX were published and independently rechecked against the sealed source. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private `0.0.2` package bundles extension `0.1.0` and cannot perform the chapter 1–12 project editor workflows.

The current development guide teaches the **WBasic Extension for VS Code** through a complete working
path: open an empty workspace, create a first project, write source with completion
and diagnostics, manage modules, build the program, and run tests through Test Explorer.

We use one small project, `MyFirstWBasic`, throughout the book. Every chapter has
a **practice task** and a **checkpoint**, so you can tell whether the step worked
instead of clicking through pictures and hoping the compiler feels charitable.

The extension described here is the verified 0.2.1 development payload
`wbasic-dev.wbasic@0.2.1`, tested with VS Code 1.139.1 on Windows 11 ARM64
and 1.140.0 on macOS ARM64. With the bundled matched compiler, runtime assets, and linker, Run and Development Build work without using a host SDK. Building from source still needs a native SDK. Fresh no-SDK host acceptance and production distribution remain open.

For the matched prerelease, start with [Prepare VS Code, the extension, and the compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}).

