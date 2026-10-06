---
title: "11 · Settings, Trust, and troubleshooting"
description: "Configure only what is needed, read logs, and diagnose layers without resetting everything"
weight: 11
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

The WBasic Extension deliberately has few settings. Project behavior belongs in
the manifest and compiler metadata rather than hidden machine configuration.

## Available settings

| Setting | Use it when |
|---|---|
| `wbasic.compilerPath` | Auto-discovery cannot find `wb`, or you must pin one compiler |
| `wbasic.defaultProfile` | Select `debug` or `release` for Run and the default build |
| `wbasic.probePath` | A contributor needs the native feasibility probe |
| `wbasic.trace.server` | Diagnose LSP traffic at `off`, `messages`, or `verbose` |

`verbose` may record source text in the local Output channel. Enable it only
while diagnosing a problem and turn it off afterward.

This 0.3.0 guide uses `wbasic.defaultProfile`. The older extension 0.1.0 used `wbasic.buildProfile`. After changing the VSIX, reload VS Code and confirm Show Toolchain Status reports compiler `0.2.0` from the package matched to the build runtime.

## Diagnostic order when the extension is not working

1. **Show Toolchain Status** — are path, version, target, and capabilities correct?
2. Check **Workspace Trust** — execution commands are disabled in Restricted Mode.
3. Save the manifest and run **Check Project**.
4. Open **Show Language Server Output** for startup and protocol errors.
5. Set trace to `messages` before trying `verbose`.
6. Confirm that the VS Code and VSIX versions are compatible.

## Common symptoms

### Color works, but completion does not

The TextMate grammar can work before the compiler or LSP is ready. Check the
toolchain and the language-server output channel.

### Completion is incomplete

Check the receiver type and current compiler capabilities. Arbitrary expression
chains and intrinsic String and Array member metadata remain incomplete. The
0.2.0 compiler has a semantic graph for resolved locals, parameters, types, and
members, but does not guess at tokens without graph coverage.

### Check, Run, or Build is missing from the palette

In 0.3.0, **Check Project**, **Run Project**, and all three Development Build
commands remain visible in the Command Palette. After installing, use
**Developer: Reload Window** and check the version in Extensions. Visible
commands still refuse execution without Workspace Trust or the required live
compiler capability.

### The command is visible, but the compiler is unavailable

Check **Show Toolchain Status** and whether this VS Code process can see the
configured executable. On one measured Windows host, the live process could
not see a compiler staged under `%LOCALAPPDATA%/WBasic`, although an external
process could. Moving the matched compiler/runtime/linker to a location visible
to that window and updating `wbasic.compilerPath` and, if needed,
`wbasic.probePath` restored discovery. This does not establish a universal
Store/MSIX filesystem rule.

### Build is refused

The compiler must advertise development-build capability and supported profiles.
The extension fails closed rather than creating an imitation build command.

If the compiler says an existing build output uses a different runtime, preserve
that output as a backup and rebuild with the compiler/runtime/linker from the
same 0.2.0 package. Do not overwrite it with old DLLs or archives to bypass
the matched-pair check.

### References, Rename, or Call Hierarchy is unavailable

Check `editorProject`, `editorSemanticGraph`, and `editorProjectTests` for the
operation at hand. Save test files so the compiler can discover cases. App/test
references must cover each relevant test context; stale contexts or a saved
test file with no discoverable case cause an explicit unavailable result rather
than partial edits. Project overlays allow 32 documents, 1 MiB per file, and
4 MiB total. Inline Run Test allows 100 cases and a 1 MiB source file.

### The module path is correct, but Check fails

Use Add Local Module Dependency instead of guessing at TOML. Confirm that the
module is inside the workspace, does not pass through a symlink, and has a unique
name in `module.toml`.

### TUI width is wrong

Run `wb tui doctor` in that terminal, profile, and font. Font rendering and the
framework's text-width contract are separate concerns. One terminal cannot prove
compatibility or incompatibility for every system.

## Information to include in a bug report

- VS Code version and architecture
- Extension version
- Show Toolchain Status result
- A small project manifest that reproduces the issue
- Diagnostic code or bounded language-server trace
- OS, terminal, and font only when the issue crosses a native or TUI boundary

Continue to [The daily workflow and its limits]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}).

