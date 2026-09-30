---
title: "Null Safety"
description: "Non-null by default, nullable types, If Let, safe calls, and lazy fallback"
weight: 8
---

WBasic types reject `Null` by default. `String` therefore always contains a string; `String?` may contain a string or `Null`. One question mark can spare a surprising number of questions in production.

```basic
Let nickname As String? = Null
Let title As String = nickname?.Trim() ?? "Guest"
PrintLn(title)
```

`T?` accepts `T` or `Null`; nested nullable types such as `T??` do not exist. Parentheses distinguish positions: `Array Of String?` is an array of nullable members, while `(Array Of String)?` is a nullable array.

## Unwrapping with If Let

```basic
If Let name As String = nickname Then
  PrintLn(name.ToUpper())
Else
  PrintLn("No nickname")
EndIf
```

The expression on the right is evaluated once. When it has a value, `If Let` creates a non-nullable local `name` scoped to the then-block. `If nickname <> Null` does not cause an implicit smart cast; use `If Let` to make the unwrapping path explicit.

## Safe calls and fallback

`?.` safely accesses a property or calls a method that returns a value. If the receiver is Null, arguments are not evaluated and the result is nullable. A method that already returns a nullable value does not add another layer.

`left ?? right` takes the left value when present; otherwise it evaluates the right expression. This laziness matters:

```basic
Procedure ExpensiveDefault() As String
  PrintLn("computing default")
  Return "Guest"
EndProcedure

Procedure Main()
  Let present As String? = "Ada"
  PrintLn(present?.Trim() ?? ExpensiveDefault())
EndProcedure
```

The example does not print `computing default`, because the left side has a value.

A safe call cannot be an assignment target or call a mutating operation. Unwrap a nullable receiver before calling `.Equals()`, or use `=` to compare Null according to the equality rules.

## Absence versus failure

A nullable value suits an ordinary absence, such as Map `Get` missing a key or `TextReader.ReadLine()` reaching EOF. Failure to read a file, malformed JSON, or an out-of-bounds index is an Error; returning Null should not conceal its cause.

The language has no `!!`, implicit unwrap, or unchecked cast. There is no “I am very sure” button that passes the burden to runtime. If a value must be present, check with `If Let` or make the parameter non-nullable from the outset.
