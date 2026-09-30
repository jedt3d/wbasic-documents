---
title: "Structures and Value Semantics"
description: "Named records, defaults, attached procedures, and copies without hidden aliases"
weight: 7
---

A `Structure` is a named record for data with a schema, such as a customer, configuration, or job result. It is not a class, has no inheritance, and needs no elaborate object setup ceremony.

## Declaring and constructing values

```basic
Structure ExportOptions
  Destination As String
  IncludeHeader As Boolean = True
EndStructure

Procedure Main()
  Let options As ExportOptions = ExportOptions(Destination := "out.csv")
  Let copy As ExportOptions = options
  copy.Destination = "backup.csv"
  PrintLn(options.Destination)
  PrintLn(copy.Destination)
EndProcedure
```

Every field needs a type. A default must be a compile-time constant. Fields without defaults must be supplied during construction. The compiler-generated constructor accepts named fields only. There is no positional construction, custom constructor, inheritance, or property getter/setter.

Fields of a mutable value can be assigned directly. The example therefore prints `out.csv` and then `backup.csv`: changing `copy` does not change `options`, because structures have value semantics.

## Attached procedures

```basic
Procedure ExportOptions.Describe() As String
  Return $"Export to {Self.Destination}"
EndProcedure
```

An attached procedure must be declared in the Structure's module and is resolved statically. `Self` is a readable receiver that cannot be directly modified. For a chainable transformation, return a new Structure. To modify the original variable, use a standalone procedure with ByRef.

An attached procedure name cannot collide with a field or intrinsic `Equals`. There is no virtual dispatch, destructor, or user lifecycle hook.

## Semantically deep copies

Primitives, strings, structures, arrays, and maps all have value semantics:

```basic
Let a As Array Of (Array Of Integer) = [[1, 2], [3]]
Let b As Array Of (Array Of Integer) = a
b[0][1] = 9
b[1].Append(4)
PrintLn(a[0][1].ToString())
PrintLn(a[1].Length.ToString())
```

The results are `2` and `1`, even with nested collections. The implementation may use ARC and copy-on-write to avoid physical copies, but those details must not create an alias visible to users. ByRef is the explicit way to modify a caller's value.

A Structure can have other Structures and collections as fields. Self-reference must go through an Array or Map, not direct embedding. Resource-handle fields are an exception: copying a Structure copies a handle to the same resource; it does not open a new resource. See Errors and Resource Lifetimes.

## Structures and external data

Structures are the main models for the supported JSON mapper. `SerializedName` and `SerializeIgnore` metadata can rename or omit fields. This does not make a Structure an ORM, and it does not imply a database, YAML, or XML mapper.
