---
title: "4 · Write with language intelligence"
description: "Practice completion, hover, signature help, and Outline with a first Thai-language program"
weight: 4
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

Open `src/Main.wbas` and replace its contents with:

```basic
Module MyFirstWBasic

Procedure Greeting(name As String) As String
  Return "สวัสดี " + name + " จาก WBasic 🙂"
EndProcedure

Procedure Main()
  Let message As String = Greeting("นักพัฒนา")
  PrintLn(message)
EndProcedure
```

## Practice completion

Place the cursor after `Pro`, invoke completion, and select `Procedure`. Then
start typing the name of a procedure declared in this file. Extension completion
comes from the compiler symbol report, so it distinguishes declarations from
words that merely appear in comments or strings.

When you type `Greeting(`, signature help shows the `name As String` parameter
and return type. Inside a nested call, the compiler selects the call context;
the extension does not try to count parentheses with a regular expression.

In a project that imports a module through an alias, type the alias and a period,
then press **Ctrl+Space**. Completion offers accessible procedures and APIs from
the compiler. For a declared Structure binding, type its name and a period to
see supported fields and attached methods. Parameter hints choose the argument
inside nested calls even when a string contains a comma. Text in comments and
strings is not a navigable symbol.

{{< guide-screenshot name="04-source-intelligence.png" alt="Main.wbas in the editor with procedure completion, signature help for Greeting, and Outline visible" caption="Screenshot to capture: Completion, Signature Help, and Outline for the same source" >}}

## Practice hover and Outline

Point at `Greeting` to see its signature and types, then open Outline. You should
see the module and two procedures. Select an Outline item to go directly to its
declaration.

Hover for supported procedures, locals/parameters, nominal types, and members
uses the actual declaration, type, or signature. Authored comments above a
declaration are not currently extracted as documentation; a tooltip does not
invent prose that the compiler did not provide.

Thai and other-language identifiers are supported under the Unicode NFC rules:

```basic
Procedure คำทักทาย(name As String) As String
  Return "ยินดีต้อนรับ " + name
EndProcedure
```

Do not mix Thai and Western digits in one numeric expression, such as `๑๐ + 25`.
Use one numeral script consistently within an expression, as required by the language.

## Current completion boundary

For a simple declared binding of a Structure or imported nominal type, type a
period after the binding to see compiler-approved visible fields and methods.
Public APIs also require the corresponding compiler capability metadata. Methods
that are private, internal to another module, or unimported are omitted.
Completion does not promise arbitrary expression chains or every intrinsic
String or Array member. Local/parameter/type/member navigation works where the
compiler supplies complete identities and reference spans. Otherwise the editor
does not guess from matching text near the cursor.

For the grammar, see [A WBasic program]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}}).

## Practice task

Add `Farewell(name As String) As String` and use completion to call it from `Main`.
The task is complete when hover shows its signature and Check Project passes.

Continue to [Read diagnostics and apply quick fixes]({{< relref "/books/w-basic-extension/05-diagnostics-and-quick-fixes.md" >}}).


## Templates in the 0.4.0 candidate

The candidate adds **WBasic: Insert Template** with linked placeholders and **WBasic: Insert File Template**, which inserts into an empty WBasic editor. Templates start the code; check names, arguments and resources, then run compiler Check after filling them in. See the [candidate scope]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); File and linked templates with Undo passed in the installed Windows candidate. The Insert Template statement command also passed in the repaired VSIX: entering Vim Insert mode before invoking it inserted `Let value As Integer = 0`, Tab advanced to the next placeholder, and Ctrl+Z restored the empty document without an infrastructure notification.

### Vim and candidate placeholders

With Vim, enter Insert mode before invoking Insert Template so Tab can advance linked placeholders; Visual mode intercepted Tab in the tested window. Inspect both linked names after pasting. In the tested Windows window, the default was already selected, yet paste appended to it and updated both occurrences. Edit the resulting names as needed; this is an observed Vim/VS Code paste interaction that the extension does not override.
