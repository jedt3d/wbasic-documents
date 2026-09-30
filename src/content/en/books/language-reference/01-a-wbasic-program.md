---
title: "A WBasic Program"
description: "The smallest complete program, entry-point forms, and commands to check and run it"
weight: 1
---

## The smallest program

A standalone WBasic source file has the `.wbas` extension. A program built as an executable has one entry procedure named `Main`.

```basic
Procedure Main()
  PrintLn("Hello, WBasic")
  PrintLn("สวัสดี 😀")
EndProcedure
```

Save this program as `hello.wbas`. `Procedure` starts a procedure declaration, `Main()` specifies its parameter list, and `EndProcedure` closes its statements. Two-space indentation is a readability convention; it does not create a block.

`PrintLn` belongs to Core, so this program needs no `Import`. Every call requires parentheses, including calls without arguments. The parentheses may be empty, but they cannot be omitted.

## Check before running

`wb check` parses and type-checks a program without running it:

```console
wb check hello.wbas --json
```

If the source is rejected, the report includes a stable diagnostic code, stage, file, line, column, and source span. A warning reported by a tool does not necessarily reject the program. Editors and other tools use the same compiler report rather than implementing another parser.

Run the program with the development runner:

```console
wb run hello.wbas
```

The output is:

```text
Hello, WBasic
สวัสดี 😀
```

`wb run` is the development path verified for this edition. `wb build` will be specified and verified in a later distribution round, so this chapter does not claim that command is ready.

## Entry-point forms

WBasic accepts three forms of `Main`. A procedure with no return type exits with status zero when it completes normally:

```basic
Procedure Main()
  PrintLn("ready")
EndProcedure
```

An `Integer`-returning `Main` uses that value as the process exit status:

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

Command-line arguments use `Array Of String`. They exclude the executable name and preserve Unicode arguments:

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn($"Received {args.Length} arguments")
  Return 0
EndProcedure
```

A user-returned exit status must be between `0` and `255` for consistent behavior across supported operating systems. A value outside that range causes a runtime validation error.

## Files and declarations

A source file contains declarations at module scope. It cannot contain executable statements or mutable global variables. This is invalid:

```basic
PrintLn("runs at module scope")  ' invalid
```

Put executable statements in a procedure. `Const` may declare a module-scope constant. Module-level procedure names are resolved before bodies in all files are checked, allowing calls to later declarations and recursion:

```basic
Const Greeting As String = "Hello"

Procedure Greet(name As String) As String
  Return $"{Greeting}, {name}"
EndProcedure

Procedure Main()
  PrintLn(Greet("Ada"))
EndProcedure
```

The next chapters define how to read source text and assign types to declared values.
