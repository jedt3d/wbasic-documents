---
title: "11 · Settings, Trust, and troubleshooting"
description: "Configure only what is needed, read logs, and diagnose layers without resetting everything"
weight: 11
---

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

### Run exists, but Build is missing

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

