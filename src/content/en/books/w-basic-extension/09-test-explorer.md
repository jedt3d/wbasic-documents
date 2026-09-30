---
title: "9 · Test with Test Explorer"
description: "Discover, run, select, and cancel native WBasic tests while preserving compiler identity"
weight: 9
---

Open **Testing** in the Activity Bar. When the project has a test catalog, the
extension calls `wb test MANIFEST --list --json` and builds the tree from case
identities returned by the compiler.

## Write the first test

Follow the generated skeleton in `tests/main_spec.wbas`, or add a case such as:

```basic
Module MyFirstWBasic
Import Test

Public Procedure Test_GivenNameWhenGreetingThenUnicode()
  ' Given: ชื่อผู้ใช้ที่เป็น Unicode
  Let name As String = "นักพัฒนา"

  ' When: สร้างข้อความต้อนรับ
  Let actual As String = Greeting(name)

  ' Then: ข้อความต้องรักษา Unicode ทุกตัว
  Test.Equal(actual, "สวัสดี นักพัฒนา จาก WBasic 🙂", "greeting")
EndProcedure
```

`Given`, `When`, and `Then` are organizing comments, not WBasic keywords. The
real assertion is `Test.Equal`. Follow the skeleton and the
[Testing API]({{< relref "/books/api-reference/testing-and-doctor.md" >}})
that correspond to your compiler revision.

## Discovery and identity

Test Explorer preserves the compiler's case ID, group path, typed data-row ID,
and Unicode label. Running one case uses its complete identity as a filter. If
that filter is ambiguous, the extension refuses it instead of silently running
additional cases.

## Read status precisely

| Status | Meaning |
|---|---|
| Passed | The assertion and cleanup completed under their contract |
| Failed | The assertion did not match |
| Error | The test program raised a typed runtime error |
| Crash | The process ended abnormally |
| Timeout | The runner deadline expired |
| Infrastructure | The compiler, linker, or harness could not complete |

An expected-failure example in the catalog completes its lesson when it produces
the declared failure kind. In Test Explorer, an assertion failure still remains
a failed test; it is not painted green for encouragement.

## Run and Cancel

Run the root to execute everything, or run one case or data row. Stop cancels
the run, terminates the compiler process tree, and closes the run explicitly.
Discovery of zero tests is an error, never an empty green suite.

{{< guide-screenshot name="09-test-explorer.png" alt="VS Code Testing view with a WBasic test group, passing case, assertion failure, and typed data rows shown as distinct statuses" caption="Screenshot to capture: Test Explorer after discovering and running several result kinds" >}}

## Practice task

Create a passing case, an assertion-failure case, and typed data rows from the
`Given/When/Then` snippet. Observe their distinct labels and statuses in Test Explorer.

Continue to [Learn from Examples and TUI templates]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}}).

