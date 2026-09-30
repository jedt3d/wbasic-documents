---
title: "5 · Read diagnostics and apply quick fixes"
description: "Separate syntax, type, and infrastructure errors, then apply keyword-case fixes safely"
weight: 5
---

A useful diagnostic says more than “wrong.” It identifies the file, location,
stage, and code so you can fix the cause instead of adding semicolons at random.
Semicolons would not rescue WBasic anyway.

## Create a type error

Temporarily change `Main` to:

```basic
Procedure Main()
  Let count As Integer = 3
  If count Then
    PrintLn("ไม่ควรผ่าน")
  EndIf
EndProcedure
```

An `If` condition must be Boolean, so the compiler marks the `count` span and
reports a diagnostic. Open the Problems panel and select the entry to return to
that location. Fix it with:

```basic
If count > 0 Then
```

{{< guide-screenshot name="05-diagnostics.png" alt="Main.wbas with a typed Boolean diagnostic under count and the Problems panel showing file, line, column, and diagnostic code" caption="Screenshot to capture: a compiler type error aligned with the Problems panel" >}}

## Unsaved diagnostics and saved projects

The language server sends unsaved source to the compiler as a bounded overlay,
so it can analyze what you are typing without a save after every character.
Late results for older text are discarded instead of replacing newer diagnostics.

Manifest and dependency workflows still use the saved project. For an import or
module-path error, save the files and run **Check Project**.

## Keyword-case quick fix

When the compiler reports WB200 or WB201 for incorrect keyword casing, the
extension may offer a Quick Fix for that exact span. It checks the candidate
source with the compiler before applying it. The extension neither replaces
matching words across the file nor edits comments or strings.

An absent quick fix does not mean the extension is broken. The error may have no
safe edit, or the connected compiler may not advertise the `quickFix` capability.

## Diagnose the correct layer

| Symptom | Check here first |
|---|---|
| Red underline in source | Problems and the diagnostic code |
| Manifest or Import cannot be found | Save, then Check Project |
| Command missing from Command Palette | Workspace Trust and compiler capabilities |
| Compiler does not start | Show Toolchain Status |
| Language help stops updating | Show Language Server Output |

The diagnostic contract is described in
[Entry points, tools, and diagnostics]({{< relref "/books/language-reference/13-entry-tools-diagnostics.md" >}}).

Continue to [Navigate code and rename safely]({{< relref "/books/w-basic-extension/06-navigation-and-refactoring.md" >}}).

