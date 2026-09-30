---
title: "Procedures and Parameters"
description: "Declarations, calls, optional and named arguments, ByRef, and procedure values"
weight: 6
---

WBasic uses `Procedure` for every kind of routine. A returning procedure is often described as a function, and an attached procedure as a method, but there are no extra `Function` or `Method` keywords to learn.

## Declaring and calling

```basic
Procedure Repeat(text As String, times As Integer = 1) As String
  Let output As String = ""
  For i As Integer = 1 To times
    output = output + text
  Next
  Return output
EndProcedure

Procedure Main()
  PrintLn(Repeat("Hi", times := 2))
EndProcedure
```

Parameters and return values require explicit types. Optional parameters follow required ones, and each default must be a compatible compile-time constant. A call may put positional arguments first, followed by named arguments written `name := value`. Arguments cannot be repeated, and a positional argument cannot follow a named argument.

WBasic does not yet have user overloads or variadic parameters; use distinct names or optional parameters. Module-level procedures are visible before their bodies are checked, allowing forward calls and recursion.

## ByRef makes side effects visible

An ordinary parameter receives a local copy. To modify the caller's variable, write `ByRef` at both ends:

```basic
Procedure AddOne(ByRef value As Integer)
  value += 1
EndProcedure

Procedure Main()
  Let count As Integer = 0
  AddOne(ByRef count)
  PrintLn(count.ToString())
EndProcedure
```

ByRef accepts only a whole mutable local variable or mutable parameter, not a field, index, temporary, or property. It has no default. The same variable cannot occupy more than one ByRef position in a single call. Value arguments are snapshotted before the body begins.

```basic
Procedure Change(ByRef value As Integer, before As Integer)
  value += 1
  PrintLn(before.ToString())
EndProcedure

Procedure Main()
  Let n As Integer = 4
  Change(ByRef n, n)  ' before ยังคงเป็น 4
EndProcedure
```

ByRef borrows a value only for the call. It cannot be stored in a Structure, returned, or passed to a callback that retains it.

## Procedures as values

A named module-level procedure can be stored as a procedure value when its signature matches:

```basic
Procedure IsPositive(value As Integer) As Boolean
  Return value > 0
EndProcedure

Procedure Main()
  Let predicate As Procedure(value As Integer) As Boolean = IsPositive
  PrintLn(predicate(7).ToString())
EndProcedure
```

Parameter names do not belong to the signature; types, order, ByRef markers, and return type do. This version has no anonymous or nested procedures, closure capture, or bound instance methods. TUI and Jobs callbacks also use named procedures under these rules. The runtime holds state and lends context only during the call.

`Of T` in curated calls such as JSON, TUI, and Jobs does not let users declare generic procedures. The compiler supports only the defined APIs, and concrete types must be visible.
