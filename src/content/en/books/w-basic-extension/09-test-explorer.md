---
title: "9 · Test with Test Explorer"
description: "Discover, run, select, and cancel native WBasic tests while preserving compiler identity"
weight: 9
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

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

For a test procedure discovered by the compiler, **Run Test** appears above its
declaration in the editor. It sends the full test identity to the native runner
for exactly one case, not another case with a similar name. Save changed project
sources first; dirty or stale source is rejected. Inline actions are limited to
100 displayed cases and a 1 MiB source file. Use Test Explorer or
`wb test App.wproj --json` for the full suite.

Canceling a native test run keeps results for completed cases and clearly marks
work that did not start or was interrupted; it never reports a passing suite by
default. The real Windows VS Code cancellation check retained three completed
timeouts and marked the interrupted next case skipped with a cancellation
message. The one-case inline Run Test happy path was checked separately.

{{< guide-screenshot name="09-test-explorer.png" alt="VS Code Testing view with a WBasic test group, passing case, assertion failure, and typed data rows shown as distinct statuses" caption="Screenshot to capture: Test Explorer after discovering and running several result kinds" >}}

## Practice task

Create a passing case, an assertion-failure case, and typed data rows from the
`Given/When/Then` snippet. Observe their distinct labels and statuses in Test Explorer.

Continue to [Learn from Examples and TUI templates]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}}).


## Test navigation and scaffolding in the 0.4.0 candidate

**WBasic: Go to Test or Source** uses compiler project inventory and native test discovery to offer candidate files in either direction; it claims no coverage relationship. **WBasic: New Test Scaffold** requires an existing `tests` directory, creates a new file without overwriting, confirms native discovery and inserts `Test.Check(False, "TODO: specify expected behavior")` as an intentionally failing assertion. Supply the real expected value and run the exact compiler-discovered identity; do not count the skeleton as passing coverage. Reruns must preserve case identity and distinguish assertion failure, timeout, crash and cancellation. See the [candidate scope]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); Test navigation, the intentionally failing scaffold and native failed-case rerun passed in the installed Windows window.
