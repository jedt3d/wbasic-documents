---
title: "Enums and Flags"
description: "Named value types, bit flags, and conversion limits"
weight: 11
---

Use `Enum` when a value must be one of several named choices. Use `Flags` when it can combine choices. Both say more than a mysterious number arriving at your desk without a label.

## Enum

```basic
Enum ExportMode
  Csv
  Text
EndEnum

Procedure Main()
  Let mode As ExportMode = ExportMode.Csv
  Select mode
  Case ExportMode.Csv
    PrintLn("CSV")
  Case ExportMode.Text
    PrintLn("Text")
  EndSelect
EndProcedure
```

Members are qualified by their Enum type. Different Enum types are not interchangeable and do not implicitly convert to Integer. Each member has an internal ordinal starting at zero in declaration order. The ordinal is not a persistent wire or file format; for data kept across versions, serialize names or an explicitly defined mapping.

## Flags

```basic
Flags FileOptions
  Read
  Write
  Create
EndFlags

Procedure Main()
  Let options As FileOptions = FileOptions.Read | FileOptions.Write
  PrintLn(options.Has(FileOptions.Read).ToString())
EndProcedure
```

Flags members automatically receive power-of-two values in order, with at most 64 members. `None` is reserved for zero. `|`, `&`, and `^` work on Flags of the same type. `.Has(flag)` checks that all supplied bits are present, and `.Has(Type.None)` returns True.

Do not mix Flags with a bare Integer even when their bits look alike: numeric coincidence is not a type contract. `&`, `^`, and `|` also work normally on two Integers.

Enums and Flags have value equality through `=` and `.Equals()`, but the automatic JSON codec does not yet support them directly. Convert them to names or values under your own explicit policy before serialization.
