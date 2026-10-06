---
title: "Entry Points, Tools, and Diagnostics"
description: "Supported Main forms, available development commands, and diagnostic reports"
weight: 13
---

This final chapter connects the language to tools in the current implementation. It separates verified commands from plans so a roadmap table cannot masquerade as a user guide.

Native evidence for these commands comes from Windows 11 ARM64 and macOS ARM64 in the recorded environments. It does not yet certify Linux ARM64, native x86_64, or end-user machines without an SDK.

## Three forms of Main

An executable has one `Main` and accepts three signatures:

```basic
Procedure Main()
EndProcedure
```

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn(args.Length.ToString())
  Return 0
EndProcedure
```

A non-returning Main exits with status 0 on normal completion. `args` excludes the executable name and preserves Unicode arguments. A user-returned status must be 0–255; an out-of-range value is a runtime Validation error.

## Check and run

Check source without executing it:

```console
wb check hello.wbas --json
```

Run a standalone file or project manifest through the native development runner:

```console
wb run hello.wbas
wb run App.wproj -- first "ภาษาไทย"
```

`wb run` compiles and links a native executable; it is not an interpreter. The
latest published compiler/runtime is **0.1.0**, matching the compiler selected
by locally verified Extension 0.2.3; the published ZIP still bundles Extension 0.2.1. Project and module `toolchain` pins must match. Both ARM64
portable ZIPs passed extracted developer-host checks; fresh-host no-SDK
acceptance remains open.

`wb build` accepts a **project manifest**, not a standalone `.wbas` file:

```console
wb build App.wproj --profile release
```

`check`, `emit-object`, `run`, `build`, and `test` accept `--profile debug|release`; debug is the default. Build support is for internal development. `wb --capabilities` reports `productionBuildEntitlement: false` and `noSdkDistribution: false`.

## Test WBasic

`wb test` discovers public procedures following Test module conventions and runs cases separately:

```console
wb test . --list
wb test App.wproj --filter Customer --json
```

The runner distinguishes assertion failure, unexpected Error, process crash, and timeout. Zero discovered tests do not silently pass; `--allow-empty` must be explicit. The current Test suite supports typed data rows, grouped reports, structural collection/JSON matchers, and scoped aggregates.

## Available analysis tools

`wb symbols FILE --json` and `wb references FILE --json` expose compiler-checked metadata to editors and protocols. `wb project-info MANIFEST --json` reads project metadata; `wb --capabilities` reports what this binary advertises. These commands share the compiler with check rather than creating a shadow parser.

Compiler 0.1.0 also provides `wb editor-project --json` and
`wb editor-manifest --json`. They accept versioned JSON requests on stdin and
analyze project/manifest snapshots without executing the application, including
unsaved source overlays. LSP/Extension use these reports for diagnostics,
completion and cross-file navigation when `editorProject: true` is advertised.
Older compilers retain only their capability-supported services. See
[version boundaries]({{< relref "/implementation-status.md" >}}).

For a terminal, use:

```console
wb tui doctor --font "JetBrainsMonoNL Nerd Font Mono" --format json --output report.json
```

Doctor separates automated checks, user-entered font information, and visual inspection results. It does not change font settings or assume a glyph looks good merely because the protocol responds.

## Diagnostics are data, not just red sentences

A diagnostic contains a stable code, stage, source file, line/column, and offending source span, with guidance using WBasic terms. JSON output suits editors, MCP/LSP, and CI. Internal source spans may use byte offsets, but adapters correctly convert to an editor's position encoding, so Unicode names and text do not move the caret to the wrong character.

The CLI does not advertise `wb fmt`. A successful `wb build` does not establish production distribution, signing, or fresh-host no-SDK acceptance.
