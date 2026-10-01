---
title: "9 · Test and continue"
description: "Run the real example and distinguish evidence from open limits"
weight: 9
---

From the source repository root, use `wb` 0.1.0 and its matching static runtime:

```console
wb check examples/billing-time-worm/App.wproj --json
wb run examples/billing-time-worm/App.wproj -- billing-time-demo.sqlite
```

A first run against a new path prints six lines (the invoice ID changes with an existing file):

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

The [example README](https://github.com/jedt3d/wbasic-language/blob/v0.1.0/examples/billing-time-worm/README.md) gives full commands and limits. An [independent fixture](https://github.com/jedt3d/wbasic-language/tree/v0.1.0/fixtures/projects/worm-billing-tests) calls public `Billing` procedures to check migration drift, generated values, saved rates, rollback, conflicts, duplicate links, empty drafts, and competing writers against real SQLite. M3/M5 native debug/release evidence passed on Windows ARM64 and macOS ARM64. This is not production or every-host acceptance.

`wb build` accepts a project manifest and supports `--profile debug|release` when a separate executable is needed; `wb run` serves the edit/run loop. Version 0.1.0 has private experimental portable ARM64 ZIPs with matched compiler, runtime, and bundled linker. Core CLI use does not require Node; protocol tooling uses it. Source builds on developer hosts still use a native toolchain/SDK. Fresh-host no-SDK acceptance is a separate gate.

Try a new database or change the rate, while keeping date, tax, currency, and rounding policy claims tied to code and tests.
