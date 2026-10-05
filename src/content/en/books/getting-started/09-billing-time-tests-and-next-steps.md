---
title: "9 · Run, check, and continue"
description: "Try the SQLite app and separate local evidence from the published release"
weight: 9
---

Download and extract the [Billing Time source snapshot](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip). From its `billing-time` folder, use `wb` with its matching static runtime. The manifest pins toolchain 0.1.0:

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

This snapshot passed Windows ARM64 and macOS ARM64 checks with the published 0.1.0 CLI sealed from source `3901cf17`: debug and release, 18,000 cents, a repeat run producing invoice `#2`, default and explicit paths, and invalid arguments rejected before the database opens. The local app source separately reports checks with compiler source `dfdcbdc`. These results do not establish production or every-host acceptance.

`wb build` can produce a separate executable. Developer-host source builds still need a native toolchain/SDK; fresh-host no-SDK acceptance is a separate gate. Try a new database or change the rate, checking the source and database before drawing conclusions about date, tax, currency, or rounding policy.

The download contains source only, not a prebuilt executable. Its original README and QuickStart describe the author’s local delivery as well; build your own copy with the commands in this book rather than assuming that local EXE is included.
