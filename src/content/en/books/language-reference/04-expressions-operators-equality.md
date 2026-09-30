---
title: "Expressions, Operators, and Equality"
description: "Precedence of arithmetic, Boolean operations, nullable fallback, and value equality"
weight: 4
---

WBasic expressions aim to read naturally while following definite precedence rules. Even a calculator needs rules; otherwise `2 + 3 * 4` might provoke an unnecessarily long meeting.

## Operator precedence

From tightest to loosest binding: postfix `()`, `[]`, `.`, `?.`; unary `+` and `-`; `*`, `/`, `Div`, `Mod`; `+`, `-`; bitwise `&`, `^`, `|`; comparisons; `Not`; `And`; `Or`; and nullable fallback `??`.

```basic
Procedure Main()
  PrintLn((2 + 3 * 4).ToString())
  PrintLn((5 / 2).ToString())
  PrintLn((-5 Div 2).ToString())
  PrintLn((-5 Mod 2).ToString())
EndProcedure
```

`/` returns a floating-point quotient. `Div` truncates integer division toward zero, and `Mod` gives the corresponding remainder. The example prints `14`, `2.5`, `-2`, and `-1`, respectively. Arithmetic overflow is an error in both debug and release.

`And` and `Or` short-circuit. `??` evaluates its right side only when the left side is `Null`. If an expression begins to resemble a crossword puzzle, add parentheses. Your future readers will thank you:

```basic
Let name As String? = Null
Let printable As Boolean = (name ?? "") = ""
```

Chained comparisons such as `a < b < c` are forbidden. Write `a < b And b < c`.

## Assignment is not an expression

`=` has two roles distinguished by context. In a statement it assigns; in an expression it compares:

```basic
Let count As Integer = 1
count = count + 1
If count = 2 Then
  PrintLn("two")
EndIf
```

WBasic has no assignment expression, so `count = 2` cannot be hidden in an argument. Compound assignment `+=`, `-=`, `*=`, `/=` evaluates its target once, and its result must be assignable to the original type.

## Equality compares values

Primitives and strings compare values of matching types. Strings compare Unicode scalars case-sensitively and do not normalize their contents automatically. Arrays and structures compare members in order; maps compare key/value sets regardless of insertion order.

```basic
Structure Person
  Id As Integer
  Name As String
EndStructure

Procedure Person.SameIdentity(other As Person) As Boolean
  Return Self.Id = other.Id
EndProcedure

Procedure Main()
  Let a As Person = Person(Id := 1, Name := "Alice")
  Let b As Person = Person(Id := 1, Name := "Alicia")
  PrintLn((a = b).ToString())
  PrintLn(a.Equals(b).ToString())
  PrintLn(a.SameIdentity(b).ToString())
EndProcedure
```

The first two lines print `False` because the names differ. The last prints `True` because `SameIdentity` is a business rule we wrote. Intrinsic `.Equals()` always agrees with `=` for the same pair of operands. The name `Equals` is reserved; users cannot declare a field or attached procedure with that name.

Nullable values of the same type compare equal when both are `Null` or their contained values are equal. Floats follow IEEE rules: NaN is unequal to every value, including itself, and `+0` equals `-0`.

Current WBasic has no user-defined operator overloading. `.equal()` is not an alias for `.Equals()` because names are case-sensitive. For business equality, use a descriptive procedure such as `SameIdentity` rather than changing the meaning of `=`.
