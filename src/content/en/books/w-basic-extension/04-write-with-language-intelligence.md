---
title: "4 · Write with language intelligence"
description: "Practice completion, hover, signature help, and Outline with a first Thai-language program"
weight: 4
---

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

{{< guide-screenshot name="04-source-intelligence.png" alt="Main.wbas in the editor with procedure completion, signature help for Greeting, and Outline visible" caption="Screenshot to capture: Completion, Signature Help, and Outline for the same source" >}}

## Practice hover and Outline

Point at `Greeting` to see its signature and types, then open Outline. You should
see the module and two procedures. Select an Outline item to go directly to its
declaration.

Thai and other-language identifiers are supported under the Unicode NFC rules:

```basic
Procedure คำทักทาย(name As String) As String
  Return "ยินดีต้อนรับ " + name
EndProcedure
```

Do not mix Thai and Western digits in one numeric expression, such as `๑๐ + 25`.
Use one numeral script consistently within an expression, as required by the language.

## Current completion boundary

Typed member completion covers directly declared receivers, Structure fields,
and public APIs exposed through compiler capability metadata. It does not yet
guarantee every complex expression chain, every intrinsic String or Array member,
or local-variable navigation.

For the grammar, see [A WBasic program]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}}).

## Practice task

Add `Farewell(name As String) As String` and use completion to call it from `Main`.
The task is complete when hover shows its signature and Check Project passes.

Continue to [Read diagnostics and apply quick fixes]({{< relref "/books/w-basic-extension/05-diagnostics-and-quick-fixes.md" >}}).

