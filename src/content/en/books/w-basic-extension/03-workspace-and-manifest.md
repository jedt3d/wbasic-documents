---
title: "3 · Tour the workspace and manifest"
description: "Understand App.wproj, Outline, and the Projects view before writing the program"
weight: 3
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

Open `App.wproj`. Its basic shape looks like this:

```toml
[project]
name = "MyFirstWBasic"
module = "MyFirstWBasic"
entry = "src/Main.wbas"
toolchain = "0.2.0"

[dependencies]
```

`name` is the project name shown to users, `module` is the primary namespace,
and `entry` is a path relative to the manifest. `toolchain` binds the project to
a supported tooling contract.

## Tools for reading a manifest

- **Syntax highlighting** distinguishes sections, keys, strings, and comments.
- **Outline** lists sections and keys for direct navigation.
- **Completion** offers contextual keys for `.wproj` and `module.toml`.
- **Hover** explains keys and dependency paths.
- **WBasic Projects** summarizes what the compiler actually reads.

Editor colors are lexical hints. A misspelled path may still look handsome, and
the compiler may still reject it. Good looks are not a type system.

Completion also offers valid manifest keys and local dependency paths. These are editing aids; **Check Project** validates the saved project and compiler contract.

## Check the project for the first time

Open the Command Palette and select **WBasic: Check Project**. This checks the
saved manifest, source, modules, and dependencies. Its problem matcher links
each issue back to the file, line, column, and diagnostic code.

For unsaved source, use live diagnostics or **WBasic: Check Active Source**. The
latter sends editor text directly to the compiler, but checks it as a standalone
source. It does not replace **Check Project** when code uses imports or multiple modules.

## Change the default profile

`wbasic.defaultProfile` accepts `debug` or `release`. The default, `debug`, suits
the edit-and-run loop. Select `release` when you need behavior under the compiler's
release profile. This does not turn a Development Build into a production distribution.

## Checkpoint

- [ ] Manifest Outline shows `[project]` and `[dependencies]`.
- [ ] Hover over `entry` explains the path.
- [ ] Check Project finishes without an error.
- [ ] You know the difference between Check Active Source and Check Project.

Continue to [Write with language intelligence]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}}).

