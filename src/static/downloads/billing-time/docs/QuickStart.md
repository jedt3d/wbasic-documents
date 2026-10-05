# Billing time QuickStart

This walkthrough builds and runs a small WBasic program with the WORM SQLite API. It creates a customer, a project, two time entries and a draft invoice. It is a developer example, not a production invoicing system.

## Build and run

The release executable already delivered on this machine is `build/BillingTime.exe`. Run it from the `billing-time` folder with `& .\build\BillingTime.exe`. Its first verified run created invoice #1 with two lines and 18000 cents. Keep `wb_runtime.dll` beside the EXE.

Use the absolute compiler path shown by **WBasic: Show Toolchain Status**. Set `$wb` to that path in PowerShell, then start in the `billing-time` folder. The local compiler/runtime was freshly built from source `dfdcbdc` (WBasic 0.1.0):

```powershell
& $wb build .\billing-time.wproj --profile debug
```

The Windows ARM64 build output is `build/aarch64-pc-windows-msvc/debug/BillingTime.exe`, with runtime support files alongside it. Keep that folder together when moving the executable. The VS Code project provides **Check Billing**, **Run Billing** and **Build Billing** tasks; **Ctrl+Shift+B** selects the default debug build task. **Run Billing** supplies `billing-time-demo.sqlite` as its argument. The generic **Run Project** command also works without arguments because the program chooses that same default path, relative to its current working directory.

Recreate the delivered release path explicitly with `& $wb build .\billing-time.wproj --profile release --output .\build\BillingTime.exe`. macOS builds use `build/aarch64-apple-darwin/<profile>/BillingTime`; this verification also passed both native Mac profiles and the same SQLite oracle.

To run from PowerShell after building:

```powershell
& ".\build\aarch64-pc-windows-msvc\debug\BillingTime.exe"
```

To choose a database path, give exactly one non-empty path:

```powershell
& ".\build\aarch64-pc-windows-msvc\debug\BillingTime.exe" "billing-time-demo.sqlite"
```

The CLI equivalent is `& $wb run .\billing-time.wproj -- billing-time-demo.sqlite`. More than one argument or an explicitly empty path returns an error before opening SQLite.

## What the program does

`Main.wbas` imports the `Billing` module and opens SQLite at the chosen path. `Billing.ApplyMigration` explicitly applies migration `001_billing_time`; opening the connection alone does not change the schema. The migration stores and checks the exact schema text so a changed definition under the same migration name is reported.

The six plain `Structure` models and their mapping/domain procedures are defined in the local [Billing module](../modules/Billing.wmod/src/Domain.wbas). The program saves two entries at the rates captured when work is logged:

| Service | Minutes | Rate, cents/hour | Amount, cents |
|---|---:|---:|---:|
| Design | 120 | 6,000 | 12,000 |
| Development | 90 | 4,000 | 6,000 |
| **Total** | **210** | | **18,000** |

It creates one draft invoice with two lines. Invoice creation uses one transaction for the header, lines and links to billed entries. A failure rolls back the partial invoice. Amounts use integer cents and checked integer multiplication followed by `Div 60` truncation; these sample values divide evenly. The example does not define currency conversion, tax, date validation or a different rounding policy.

## Expected output

On a fresh database, the expected output is:

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

The program appends a new customer, project and invoice on every run. Repeating it against the same database produces invoice `#2` and another pair of billed entries. IDs depend on the database contents. Native Windows ARM64 debug/release builds, direct EXE execution, both CLI run paths, exact SQLite contents, repeat runs and invalid-argument checks passed with compiler source `dfdcbdc`. Repeat the checks with `python scripts/verify.py --wb <absolute-compiler-path>`.

For module and schema details, see the [domain implementation](../modules/Billing.wmod/src/Domain.wbas) and [schema](../schema.sql), including `Version` columns, generated IDs, transactions and explicit migration constraints.
