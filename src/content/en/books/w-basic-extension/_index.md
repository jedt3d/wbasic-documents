---
title: "WBasic Extension Guide"
description: "A hands-on guide to WBasic in VS Code, from creating a project to running, building, testing, and managing modules"
weight: -4
---

**Choose your version first.** The [current merged 0.1.0 workflow]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) applies to compiler `0.0.2` at source `143be583` and the matching VS Code extension source. Chapters 1–12 below document the separate, unmerged R8B `0.2.0` development branch. Their New Project, Projects view, Test Explorer, bundled examples and cross-file editor actions are not available in the merged `0.1.0` extension.

The R8B branch guide teaches the **WBasic Extension for VS Code** through a complete working
path: open an empty workspace, create a first project, write source with completion
and diagnostics, manage modules, build the program, and run tests through Test Explorer.

We use one small project, `MyFirstWBasic`, throughout the book. Every chapter has
a **practice task** and a **checkpoint**, so you can tell whether the step worked
instead of clicking through pictures and hoping the compiler feels charitable.

The extension described here is the R8B development preview
`wbasic-dev.wbasic@0.2.0`, tested with VS Code 1.137 or later on Windows 11 ARM64
and macOS ARM64. Builds in this guide are **Development Builds** and still require
the platform's native SDK. They are not packages for distribution to clean machines.

For the current source, start with [Use the merged extension]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). For the R8B branch, start with [Prepare VS Code, the extension, and the compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}).

