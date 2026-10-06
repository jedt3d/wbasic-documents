---
title: "11 · Settings, Trust, and troubleshooting"
description: "Configure only what is needed, read logs, and diagnose layers without resetting everything"
weight: 11
---

> **Version scope — locally verified extension 0.2.3.** The 0.2.3 VSIX was verified locally with a matched development compiler/runtime; the published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. The published ARM64 ZIPs immutably bundle extension `0.2.1`; extension `0.2.3` has no public release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

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

This 0.2.3 guide uses `wbasic.defaultProfile`, as do 0.2.1 and 0.2.2. The older extension 0.1.0 uses `wbasic.buildProfile`; keep settings aligned with the version actually loaded. After changing the VSIX, reload the VS Code window and confirm Show Toolchain Status reports compiler `0.1.0`.

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
chains, intrinsic String and Array member metadata, and local-variable navigation
are not complete yet.

### Check, Run, or Build is missing from the palette

In 0.2.3, **Check Project**, **Run Project**, and all three Development Build
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

