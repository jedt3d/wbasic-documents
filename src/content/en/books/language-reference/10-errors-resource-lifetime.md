---
title: "Errors and Resource Lifetimes"
description: "Try/Catch/Finally, the Error model, Using, cleanup order, and suppressed errors"
weight: 10
---

WBasic distinguishes “no value” from “operation failed.” The former uses a nullable type; the latter uses `Error`. EOF need not dress up as an accident, and an accident is not hidden under Null.

## Try, Catch, and Finally

```basic
Procedure Main() As Integer
  Try
    Let content As String = File.ReadText("settings.txt")
    PrintLn(content)
    Return 0
  Catch err As Error
    If err.Kind = ErrorKind.IO Then
      Console.ErrorLn(err.Message)
      Return 1
    EndIf
    Throw
  Finally
    PrintLn("finished")
  EndTry
EndProcedure
```

`Try` needs at least a `Catch` or `Finally` block and permits one `Catch` block. Use `If` or `Select` to distinguish `Kind` and `Code`. `Throw err` throws an Error; a bare `Throw` rethrows inside `Catch`, preserving its original source. An Error raised in a Catch does not return to that same Catch.

`Finally` runs on normal exit, `Return`, `Break`, `Continue`, or error. `Return`, `Break`, and `Continue` are forbidden within Finally because they would obscure the outgoing control flow.

## Programmatically inspectable errors

An Error exposes:

- `Kind`: category such as IO, Network, Parse, Conversion, Bounds, or Validation
- `Code`: stable, namespaced name such as `File.NotFound`
- `Message`: human-readable text
- `Suppressed`: cleanup errors that should not displace the primary error

```basic
Throw Error.Create(ErrorKind.Validation, "App.InvalidName", "Name is required")
```

Make decisions using Kind or Code, not by parsing Message. An unhandled Error reports code/message and source location when available, then exits the process with code 1.

## Using closes resources on every exit

File streams, database connections, and cursors are opaque resource handles. Copying a handle refers to the same resource; it does not copy its contents:

```basic
Procedure Main()
  Using reader As TextReader = File.OpenText("input.txt")
    While True
      If Let line As String = reader.ReadLine() Then
        PrintLn(line.Trim())
      Else
        Break
      EndIf
    EndWhile
  EndUsing
EndProcedure
```

The initializer must succeed before entering the `Using` scope. `Using` calls Close on every exit path, and nested scopes close in reverse opening order. `.Close()` is idempotent. An operation on a closed handle throws `ErrorKind.ResourceClosed`. A variable declared by Using cannot be assigned a new handle.

If the body succeeds but Close fails, the close error is thrown. If an earlier error exists, it remains primary and the close error goes in `Suppressed`. ARC is a safety net for memory and OS handles, but it is no substitute for Using when successful flush/close must be known.

Process-owned standard streams follow Core's special close rules. Resource types can be created only by Core or curated modules. This version has no user-defined resource types or destructors.
