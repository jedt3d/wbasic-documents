---
title: "9 · Run, check, and continue"
description: "Try the SQLite app and separate local evidence from the published release"
weight: 9
---

Download and extract the [Billing Time source snapshot](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip). From its `billing-time` folder, use the matched compiler/runtime 0.2.0 portable package, which includes its compiler, runtime, and linker. Building the compiler toolchain from Rust source separately requires an SDK and matching static runtime. The current manifest pins toolchain 0.2.0:

```console
wb check billing-time.wproj --json
wb run billing-time.wproj -- billing-time-demo.sqlite
```

You may omit the argument to use `billing-time-demo.sqlite` in the current working directory. One nonempty path is accepted; more than one argument or an empty path returns an error before opening the database. A first run with a new file prints six lines:

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

Running again against the same file adds another customer, project, pair of time entries, and invoice. The invoice ID depends on existing data; the next run may print `#2`. It does not edit the previous invoice. [QuickStart](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/docs/QuickStart.md) and the [README](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/README.md) give further commands and limits. The snapshot's `scripts/verify.py` checks SQLite contents and repeat runs.

The 0.2.0-pinned snapshot passed `scripts/verify.py` on Windows ARM64 and macOS ARM64 with matched compiler/runtime in debug and release: 18,000 cents on the first run, invoice `#2` on a repeat, default and explicit paths, and invalid arguments rejected before opening the database. One earlier Windows CLI invalid-argument attempt timed out; the unchanged full retry passed. These results do not establish production or every-host acceptance.

Release 0.1.0 evidence at source `3901cf17` and local app-source checks with compiler source `dfdcbdc` belong to the previous snapshot, not the current 0.2.0 manifest.

`wb build` can produce a separate executable. The tested 0.2.0 portable package uses its bundled linker/runtime to build WBasic app source on developer hosts. Building the compiler toolchain itself from Rust source still needs a native SDK/toolchain; fresh-host no-SDK acceptance is a separate gate. Try a new database or change the rate, checking the source and database before drawing conclusions about date, tax, currency, or rounding policy.

The download contains source only, not a prebuilt executable. Its current README and QuickStart explain how to build and run app source with the matched 0.2.0 compiler/runtime; do not expect an author's local EXE in the ZIP. In VS Code, select compiler 0.2.0 and use the Command Palette for **WBasic: Check Project**, **Run Project**, or **Build Project — Debug/Release (Development)**.
