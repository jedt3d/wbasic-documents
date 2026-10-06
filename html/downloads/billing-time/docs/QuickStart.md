# Billing time QuickStart

This walkthrough builds and runs a small WBasic program with the WORM SQLite API. It creates a customer, a project, two time entries and a draft invoice. It is a developer example, not a production invoicing system.

## Build and run

Open the `billing-time` folder in VS Code with extension **0.3.0**. Use **WBasic: Show Toolchain Status** to confirm compiler/runtime **0.2.0**, the version pinned by `billing-time.wproj` and `modules/Billing.wmod/module.toml`. Set `$wb` in PowerShell to the absolute compiler path shown there, then start in the `billing-time` folder. For the extension-managed Windows installation, that path is `%APPDATA%\Code\User\globalStorage\wbasic-dev.wbasic\bin\wb.exe`; confirm it in Toolchain Status. In PowerShell, set it with `$wb = Join-Path $env:APPDATA 'Code\User\globalStorage\wbasic-dev.wbasic\bin\wb.exe'`, or substitute the path from Toolchain Status on another machine.

Check and build the saved project:

```powershell
& $wb --version
& $wb check .\billing-time.wproj --json
& $wb build .\billing-time.wproj --profile debug
```

The Windows ARM64 build output is `build/aarch64-pc-windows-msvc/debug/BillingTime.exe`, with runtime support files alongside it. Keep that folder together when moving the executable. In VS Code, **Ctrl+Shift+P** opens **WBasic: Check Project**, **WBasic: Run Project**, **WBasic: Build Project โ€” Debug (Development)** and **WBasic: Build Project โ€” Release (Development)**. The folder also provides **Check Billing**, **Run Billing** and **Build Billing** tasks; **Ctrl+Shift+B** selects the default debug build task. **Run Billing** supplies `billing-time-demo.sqlite` explicitly. The generic **Run Project** command works without arguments because the program chooses that same default path, relative to its current working directory. Save source changes before running project commands.

To build the release profile, run `& $wb build .\billing-time.wproj --profile release`. Its canonical Windows ARM64 output is `build/aarch64-pc-windows-msvc/release/BillingTime.exe`. macOS uses `build/aarch64-apple-darwin/<profile>/BillingTime`. Native macOS ARM64 compiler 0.2.0 passed both profiles and the same SQLite checks. Final release-package and editor acceptance remain separate checks.

If an upgrade reports `different DLL already exists`, move or preserve the old profile output folder before rebuilding. Each executable requires the matched runtime from its build. The compiler refuses to overwrite a different runtime DLL, preventing an old/new pair from being mixed.

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

The program appends a new customer, project and invoice on every run. Repeating it against the same database produces invoice `#2` and another pair of billed entries. IDs depend on the database contents. The current compiler 0.2.0 Windows ARM64 retry passed native debug/release builds and execution, exact SQLite totals of **18000 cents fresh / 36000 cents after repeat**, invalid and empty arguments before database creation, and CLI runs with default and explicit database paths. The first candidate attempt timed out and remains a separate Failed record; its cause is unproven. Repeat the CLI and SQLite checks with `python scripts/verify.py --wb <absolute-compiler-path>` in a native developer environment. In the existing VS Code window, typed Command Palette Check Project, Release Build and Run Project commands passed with extension 0.3.0 and compiler 0.2.0. The built release EXE was inspected as native ARM64 and executed directly against a fresh database with two invoice lines totaling 18000 cents. New-feature editor acceptance remains in progress.

For module and schema details, see the [domain implementation](../modules/Billing.wmod/src/Domain.wbas) and [schema](../schema.sql), including `Version` columns, generated IDs, transactions and explicit migration constraints.
