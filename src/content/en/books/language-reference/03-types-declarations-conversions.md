---
title: "Types, Declarations, and Conversions"
description: "Primitive types, local values, constants, nullability, and explicit numeric conversions"
weight: 3
---

## Primitive types

WBasic's main types include:

| Type | Meaning |
|---|---|
| `Integer` | Signed 64-bit integer |
| `Float` | IEEE 754 binary64 value |
| `Byte` | Integer from 0 through 255 |
| `Boolean` | `True` or `False` |
| `String` | Immutable sequence of Unicode scalar values, stored internally as UTF-8 |
| `T?` | Nullable form of type `T` |
| `Array Of T` | Ordered collection of values of one type |
| `Map Of K To V` | Collection mapping keys to values |
| `Procedure(...) As T` | Callable procedure type |

A procedure without `As` after its parameter list returns no value. WBasic has no `Void` type for this case.

## Local declarations

`Let` declares a mutable local; `Const` declares a compile-time constant. Both require a type and an initializer:

```basic
Let attempts As Integer = 0
Const ProductName As String = "WBasic"

attempts = attempts + 1
```

Locals have block scope. They are not implicitly initialized to zero, an empty string, or null. `Dim` and `Var` are not synonyms. Module scope permits constants and declarations, but no mutable global variables.

Constants are limited to compile-time computable values of primitive, `Enum`, and `Flags` types. They cannot hold mutable collections or results of runtime I/O.

## Nullability

An ordinary value cannot contain `Null`. Add `?` when absence is meaningful:

```basic
Let nickname As String? = Null

If Let name As String = nickname Then
  PrintLn(name)
EndIf
```

Nullability is part of the type and does not introduce truthiness; a condition must still be `Boolean`.

## Conversions are visible

WBasic does not implicitly convert numbers to strings, strings to numbers, or numbers to `Boolean`. Only `Byte` widens automatically to `Integer`. Other numeric changes use named conversions:

```basic
Let small As Byte = 12
Let count As Integer = small
Let ratio As Float = Float.FromInteger(count)
Let restoredCount As Integer = Integer.FromFloat(ratio)
Let checkedByte As Byte = Byte.FromInteger(count)
```

`Integer.FromFloat` accepts only finite, integral values in range. `Byte.FromInteger` checks the range 0–255. Integer arithmetic and conversions that violate these conditions report errors in both debug and release; they do not silently wrap. `Float.FromInteger` may round according to binary64 rules.

`/` performs floating-point division; `Div` performs integer division, and `Mod` returns an integer remainder. Division by zero is an error.

## Parsing text

Parsing is an explicit library operation. `Integer.Parse` returns an `Integer` or throws for invalid text. `Integer.TryParse` returns `Integer?`, using `Null` for a failed parse. Neither trims whitespace automatically. Each input accepts one decimal digit set, independent of the digit set in the calling source file.

```basic
Let value As Integer = Integer.Parse("125")
```

If an application accepts surrounding whitespace, call an explicit text operation before parsing.

## No truthiness or hidden formatting

Conditions must be `Boolean`. The compiler does not guess from an integer, string, collection, or nullable value. Format output through interpolation or the appropriate formatting API. This keeps overload resolution and data conversions visible in source.
