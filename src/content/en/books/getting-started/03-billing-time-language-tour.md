---
title: "3 · A short language tour"
description: "Read the procedures, values, types, control flow, arguments, and output."
weight: 3
---

`Module BillingTime` must be the first declaration and gives this source file its
namespace. `Procedure` declares a callable unit. `Main` is the entry point; its `Array Of
String` receives command-line arguments and its `Integer` result becomes the
process exit code.

WBasic targets the same approachable class of small programs often begun in
Python, while keeping the flow readable, types visible at their declarations,
and a path to a native executable. Readability comes from putting detail in the
right place rather than hiding all of it.

`Let` introduces typed local values. Billing amounts use integer cents, avoiding
binary floating-point surprises. `Div` performs integer division, and the sample
chooses minute/rate values that divide exactly by 60. A production billing policy
must still define rounding, overflow, currency, and tax.

```basic
If args.Length > 0 Then
  projectName = args[0]
EndIf
```

This guard proves an item exists before indexing the array. `PrintLn` writes one
line to standard output. `ToString()` turns integer values into text before `+`
joins them with labels.

Next: [Check, compile, and run from the command line]({{< relref "/books/getting-started/04-command-line-workflow.md" >}}).
