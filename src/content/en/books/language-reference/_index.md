---
title: "Language Reference"
description: "Syntax and semantics of WBasic programs"
weight: 1
---

This book explains WBasic, beginning with a runnable program. It then establishes the rules for source text and types before moving on to expressions, control flow, procedures, values, modules, and errors.

## Chapter map

| Order | Chapter | Status |
|---:|---|---|
| 1 | A WBasic program | Written |
| 2 | Source text, names, literals, and line layout | Written |
| 3 | Types, declarations, and conversions | Written |
| 4 | Expressions, operators, and equality | Written |
| 5 | Control flow | Written |
| 6 | Procedures and parameters | Written |
| 7 | Structures and value semantics | Written |
| 8 | Null safety | Written |
| 9 | Collections and Unicode strings | Written |
| 10 | Errors and resource lifetimes | Written |
| 11 | Enums and Flags | Written |
| 12 | Modules, packages, and visibility | Written |
| 13 | Entry points, tools, and diagnostics | Written |

“Written” means the reference chapter covers behavior supported by passing tests in the current implementation. It does not mean every proposal in the draft specification is ready to use. Features still marked Planned or Deferred are not presented as language guarantees here.

At this checkpoint, the behavior catalog contains 71 Passed, 23 Planned, and 1 Deferred. Native testing covers Windows 11 ARM64 and macOS ARM64 in the recorded environments. Linux ARM64 and native x86_64 do not yet have complete acceptance matrices. Clean-machine distribution without an SDK is an R8 gate and is not a capability certified by this book.
