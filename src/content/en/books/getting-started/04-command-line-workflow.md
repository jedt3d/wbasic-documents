---
title: "4 · Check, compile, and run"
description: "Use project-info, check, run, and emit-object on the project."
weight: 4
---

Inspect the resolved project:

```console
wb project-info billing-time/BillingTime.wproj --json
```

Check the source without running it:

```console
wb check billing-time/BillingTime.wproj --json
```

Compile, link, and run it, passing one application argument after `--`:

```console
wb run billing-time/BillingTime.wproj -- "Website refresh"
```

The program prints:

```text
Billing Time
project: Website refresh
time logged: 210 minutes
draft total: 18000 cents
```

`wb run` creates an object, links the matching WBasic runtime through the native
toolchain, and runs a temporary executable. A source-built developer CLI can use `--runtime <path>` when its matching runtime
is outside the normal location.

To stop after object generation:

```console
wb emit-object billing-time/BillingTime.wproj --output BillingTime.obj
```

Use an `.o` name on macOS if you prefer platform conventions. Linking that object
is the caller's responsibility. For a separate binary, `wb build billing-time/BillingTime.wproj --output BillingTime`
accepts this project manifest; use an `.exe` output name on Windows. The next
chapters read the separately runnable WORM/SQLite project.

Next: [Read the database models]({{< relref "/books/getting-started/05-billing-time-models.md" >}}).
