---
title: "API Reference"
description: "Signatures and contracts for public APIs, organized by module"
weight: 3
---

Use this part to look up specific APIs. Each page identifies parameter types, returns, errors, platform limits, and verification status. Coverage grows only from APIs that have been merged and tested.

At this checkpoint, the behavior catalog contains 71 Passed, 23 Planned, and 1 Deferred. An API marked “Passed” has passed its group gates on Windows 11 ARM64 and macOS ARM64 at the recorded revisions. It does not mean every composite acceptance clause has passed.

## Contents

1. [TUI model loop and effects](tui-model-loop.md)
2. [Layout, navigation, and forms](layout-navigation-forms.md)
3. [Data controls and rich output](data-and-rich-output.md)
4. [Jobs](jobs.md)
5. [Tui.Test and doctor](testing-and-doctor.md)
6. [Terminal lifecycle and platform limits](terminal-lifecycle.md)

Widget pages describe implementations that passed native examples and round gates for their groups. They do not claim that every composite behavior-catalog clause has passed. “The API exists” and “it passed on every terminal on earth” are different statements.

Positive OSC52 read on Windows remains Deferred. Linux ARM64, native x86_64, and R8 clean-machine no-SDK packaging have not passed acceptance. Do not infer their status from Windows/macOS ARM64 results.
