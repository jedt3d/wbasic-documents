# Billing time

A runnable WBasic + WORM example for recording customer work and creating a draft invoice in SQLite. It uses the implemented [Billing module](modules/Billing.wmod/src/Domain.wbas) and [schema](schema.sql). It demonstrates mapped `Structure` values, an explicit migration, typed changes, queries and a short transaction. It is a developer walkthrough, not production invoicing software.

Start with [QuickStart](docs/QuickStart.md). The app writes a new customer, project and invoice each time it runs. The default database is `billing-time-demo.sqlite` in the current working directory; pass one path to use a different database. Windows ARM64 builds from this folder produce `build/aarch64-pc-windows-msvc/debug/BillingTime.exe` and runtime support files. Both debug and release were built and executed with compiler source `dfdcbdc`.

## Compile, run and build in VS Code

1. Use **File → Open Folder** to open this `billing-time` folder. Trust the workspace so the extension can invoke the compiler. Save source and manifest changes before using project commands.
2. Open the Command Palette (**Ctrl+Shift+P**) and run **WBasic: Show Toolchain Status**. Confirm the selected compiler is WBasic **0.1.0**, matching `billing-time.wproj`. In Settings, `wbasic.compilerPath` selects the absolute path to `wb.exe`; keep its matched runtime and linker files together. This machine is configured for the freshly built `dfdcbdc` toolchain. The empty default uses auto-discovery; an explicit path pins the selected build. Use **Developer: Reload Window** after changing the toolchain if the old selection remains loaded.
3. If several projects are open, run **WBasic: Select Active Project** and choose `billing-time.wproj`.

Use these Command Palette commands:

| Action | Command | Result |
|---|---|---|
| Compile/check syntax and types | **WBasic: Check Project** | Checks the saved project and its module dependencies; reports diagnostics without producing an EXE. |
| Compile and run | **WBasic: Run Project** | Compiles and runs the application; view its output in the WBasic terminal. With no arguments, this app uses `billing-time-demo.sqlite`. |
| Build a reusable executable | **WBasic: Build Project (Development)** | Choose **debug** or **release**. On Windows ARM64, output is `build/aarch64-pc-windows-msvc/<profile>/BillingTime.exe`. |

This folder also supplies tasks in [.vscode/tasks.json](.vscode/tasks.json):

- **Ctrl+Shift+B** runs the default **Build Billing** debug task.
- **Terminal → Run Task → Check Billing** checks the project.
- **Terminal → Run Task → Run Billing** compiles and runs with the explicit database argument `billing-time-demo.sqlite`. To use another database, change the task's `arguments` entry.

Run commands append a new customer, project and invoice each time; they do not clear the database. For a fresh database, the terminal shows **210 minutes**, **two invoice lines**, **18000 cents** and **two billed entries**. Keep `wb_runtime.dll` beside a built EXE when moving its output folder.

The delivered release executable at `build/BillingTime.exe` was built with an explicit output path; the extension's normal Build command uses the profile-specific path above. See [QuickStart](docs/QuickStart.md) for PowerShell commands and the repeatable verification script.

The example uses the implemented WORM API. It does not use proposed `[Worm.Table]` attributes, generated setters or entity tracking. Currency, tax, date validation and production invoice policies are outside its scope.

The delivered Windows release executable is `build/BillingTime.exe`, with `wb_runtime.dll` beside it. From this folder, run `& .\build\BillingTime.exe` in PowerShell. Repeated runs append demonstration data rather than resetting the database.
