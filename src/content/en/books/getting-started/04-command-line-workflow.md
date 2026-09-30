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
toolchain, and runs a temporary executable. Use `--runtime <path>` when the runtime
is outside its normal location.

To stop after object generation:

```console
wb emit-object billing-time/BillingTime.wproj --output BillingTime.obj
```

Use an `.o` name on macOS if you prefer platform conventions. Linking that object
is the caller's responsibility. The remaining chapters extend Billing Time toward
the planned database model and state clearly where runnable code ends.

Next: [Model the database records]({{< relref "/books/getting-started/05-billing-time-models.md" >}}).
