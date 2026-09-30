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

`wb run` compiles and links a native executable; it is not an interpreter. The current developer checkout still needs a native SDK and a matching runtime static library. Clean-machine distribution without an SDK and the `wb build` command are R8 acceptance gates, so they are not presented as ready commands.

## Test WBasic

`wb test` discovers public procedures following Test module conventions and runs cases separately:

```console
wb test . --list
wb test App.wproj --filter Customer --json
```

The runner distinguishes assertion failure, unexpected Error, process crash, and timeout. Zero discovered tests do not silently pass; `--allow-empty` must be explicit. The current Test suite supports typed data rows, grouped reports, structural collection/JSON matchers, and scoped aggregates.

## Available analysis tools

`wb symbols FILE --json` and `wb references FILE --json` expose compiler-checked metadata to editors and protocols. `wb project-info MANIFEST --json` reads project metadata; `wb --capabilities` reports what this binary advertises. These commands share the compiler with check rather than creating a shadow parser.

For a terminal, use:

```console
wb tui doctor --font "JetBrainsMonoNL Nerd Font Mono" --format json --output report.json
```

Doctor separates automated checks, user-entered font information, and visual inspection results. It does not change font settings or assume a glyph looks good merely because the protocol responds.

## Diagnostics are data, not just red sentences

A diagnostic contains a stable code, stage, source file, line/column, and offending source span, with guidance using WBasic terms. JSON output suits editors, MCP/LSP, and CI. Internal source spans may use byte offsets, but adapters correctly convert to an editor's position encoding, so Unicode names and text do not move the caret to the wrong character.

Formatting and distributable builds remain product directions, but the current CLI does not advertise `wb fmt` or `wb build` as user commands. This book will add instructions when native acceptance evidence exists; there is no need to teach a button that cannot yet be pressed.
