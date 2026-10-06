---
title: "Modules, Packages, and Visibility"
description: ".wproj/.wmod structure, namespaces, Import, and Public/Internal/Private scope"
weight: 12
---

WBasic uses directories as package units. A `.wmod` is not a source include file. This lets the compiler see the actual dependency graph instead of concatenating files and hoping their order works out.

## Project layout

```text
App.wproj
src/Main.wbas
modules/Acme.wmod/module.toml
modules/Acme.wmod/src/Math/Total.wbas
```

This manifest targets compiler/runtime 0.2.0. Project and module `toolchain`
pins must match the compiler selected by the CLI and editor:

```toml
[project]
name = "Example"
module = "App"
entry = "src/Main.wbas"
toolchain = "0.2.0"

[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

Project source declares a module matching its root and path:

```basic
Module App
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

Dependency source might be:

```basic
Module Acme.Math

Public Procedure Total(value As Integer) As Integer
  Return value + 12
EndProcedure
```

A namespace name comes from the manifest root and directories beneath `src`; the filename adds no namespace. Imports precede declarations and are not textual includes. An alias shortens a qualifier but does not bring every member into the local namespace.

## Three visibility levels

- `Public` is accessible to importing packages.
- `Internal` is accessible to every namespace in the same `.wmod` or main project.
- `Private`, the default, is accessible only to the exact module namespace, across its files.

Thus `Private` in `Acme.Data` is inaccessible from `Acme.Data.Migrations`, however related their names look. `Internal` works if both share a package identity. A matching namespace prefix does not confer access across packages.

Visibility applies to Procedures, Structures, Enums, Flags, Consts, and attached procedures. There is no `Protected`, because the language has no inheritance. A Public signature cannot expose an Internal or Private type; an Internal signature cannot expose a Private type.

Import aliases and generated JSON mappers do not expand access. A module dependency cycle is a compile error. Module spelling and case must match the path even on a case-insensitive filesystem.

## Compile-time platform branches

```basic
CompileIf Compiler.OS = OS.Windows Then
  Import WindowsTools
Else
  Import PosixTools
EndCompileIf
```

`Compiler.OS`, `Compiler.Arch`, and `Compiler.Debug` are compile-time constants. The compiler selects a branch before resolving names in the unused branch, allowing an import for another OS to be hidden. Delimiters in both branches must still balance. An ordinary `If` cannot do this because both its branches must type-check.

A standalone `.wbas` without `Module` can use the App namespace, but a local `.wmod` requires a `.wproj`; the compiler does not guess libraries from the working directory. This version has no public DLL loading, C declarations, or central package manager.
