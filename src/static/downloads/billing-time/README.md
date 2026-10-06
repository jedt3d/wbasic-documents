# Billing time

A runnable WBasic + WORM example for recording customer work and creating a draft invoice in SQLite. It uses the implemented [Billing module](modules/Billing.wmod/src/Domain.wbas) and [schema](schema.sql). It demonstrates mapped `Structure` values, an explicit migration, typed changes, queries and a short transaction. It is a developer walkthrough, not production invoicing software.

Start with [QuickStart](docs/QuickStart.md). The app writes a new customer, project and invoice each time it runs. The default database is `billing-time-demo.sqlite` in the current working directory; pass one path to use a different database. The project and local Billing module pin compiler/runtime **0.2.0**. On Windows ARM64, normal development builds use `build/aarch64-pc-windows-msvc/<profile>/BillingTime.exe` with runtime support files in that profile folder.

## Compile, run and build in VS Code

1. Use **File → Open Folder** to open this `billing-time` folder. Trust the workspace so the extension can invoke the compiler. Save source and manifest changes before using project commands.
2. Open the Command Palette (**Ctrl+Shift+P**) and run **WBasic: Show Toolchain Status**. Confirm the selected compiler is WBasic **0.2.0**, matching `billing-time.wproj`, and the installed extension is **0.3.0**. In Settings, `wbasic.compilerPath` selects the absolute path to `wb.exe`; keep its matched runtime and linker files together. For an extension-managed Windows installation, the compiler is under `%APPDATA%\Code\User\globalStorage\wbasic-dev.wbasic\bin\wb.exe`; confirm the selected path in Toolchain Status. Use the path shown by Toolchain Status on another machine. Reload the VS Code window after changing the toolchain if the old selection remains loaded.
3. If several projects are open, run **WBasic: Select Active Project** and choose `billing-time.wproj`.

Use these Command Palette commands:

| Action | Command | Result |
|---|---|---|
| Compile/check syntax and types | **WBasic: Check Project** | Checks the saved project and its module dependencies; reports diagnostics without producing an EXE. |
| Compile and run | **WBasic: Run Project** | Compiles and runs the application; view its output in the WBasic terminal. With no arguments, this app uses `billing-time-demo.sqlite`. |
| Build a reusable executable | **WBasic: Build Project — Debug (Development)** or **WBasic: Build Project — Release (Development)** | Uses the selected profile. On Windows ARM64, output is `build/aarch64-pc-windows-msvc/<profile>/BillingTime.exe`. |

This folder also supplies tasks in [.vscode/tasks.json](.vscode/tasks.json):

- **Ctrl+Shift+B** runs the default **Build Billing** debug task.
- **Terminal → Run Task → Check Billing** checks the project.
- **Terminal → Run Task → Run Billing** compiles and runs with the explicit database argument `billing-time-demo.sqlite`. To use another database, change the task's `arguments` entry.

After upgrading the compiler/runtime, an existing output folder may contain an older `wb_runtime.dll`. If Build reports `different DLL already exists`, preserve or move the previous profile output folder, then build again. Keep each EXE with the runtime files from its own build; the compiler deliberately rejects mixing versions. On this development installation, previous profile outputs were preserved under `.artifacts/build-before-020/`.

Run commands append a new customer, project and invoice each time; they do not clear the database. For a fresh database, the terminal shows **210 minutes**, **two invoice lines**, **18000 cents** and **two billed entries**. Keep `wb_runtime.dll` beside a built EXE when moving its output folder. The current Windows ARM64 0.2.0 CLI retry passed debug and release native execution, fresh and repeat SQLite checks, and default and explicit run arguments. Check Project, Release Build and Run Project also passed through typed Command Palette commands in the existing VS Code window with extension 0.3.0; Run created two invoice lines totaling 18000 cents. The earlier CLI timeout remains recorded as a failed attempt with an unproven cause. Native macOS ARM64 compiler 0.2.0 also passed the debug/release SQLite verification; final release-package and editor acceptance remain separate checks.

The example uses the implemented WORM API. It does not use proposed `[Worm.Table]` attributes, generated setters or entity tracking. Currency, tax, date validation and production invoice policies are outside its scope.
