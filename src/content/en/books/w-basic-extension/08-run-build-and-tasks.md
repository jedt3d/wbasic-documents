---
title: "8 · Run, Build, and Tasks"
description: "Run source or projects, create Debug and Release development artifacts, and use problem matching"
weight: 8
---

> **Version scope — locally verified extension 0.2.3.** The 0.2.3 VSIX was verified locally with a matched development compiler/runtime; the published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. The published ARM64 ZIPs immutably bundle extension `0.2.1`; extension `0.2.3` has no public release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

The extension separates commands by intent. Pressing Run should not quietly
become a distributable build, and Check should not open the program's network
or database connections.

## Run Active Source

With a saved `.wbas` file open, run **WBasic: Run Active Source in Terminal**.
This executes one source file with its directory as the working directory. It is
best for small examples that do not need project imports.

A TUI needs real terminal input, so this separate command uses an integrated
terminal. The 0.2.3 project-task change did not rerun interactive TUI input.

## Run Project

Use **WBasic: Run Project** for an `App.wproj` with modules and dependencies. The
command uses the profile from `wbasic.defaultProfile` and passes the manifest
path as a literal argument. Spaces, Thai characters, and emoji in a path are
never assembled into a shell string. In locally verified 0.2.3, Run launches a
dedicated VS Code `ProcessExecution` task scoped to the selected project. Its
output stays open after completion, and a later run clears and reuses that task
terminal. Run can change project data; the BillingTime example appends records.

## Development Build

Three commands are available:

- **Build Project (Development)** asks for a profile advertised by the compiler.
- **Build Project — Debug (Development)** selects Debug directly.
- **Build Project — Release (Development)** selects Release directly.

The compiler creates a native executable and a `.wb-build.json` record. The
0.2.3 Build commands use the same dedicated process-task output, literal
arguments, selected profile, project scope, and `$wbasic` problem matcher as
Run. Their task terminal stays visible after the process exits. Workspace Trust
and live compiler capability checks still apply before execution. With the
published ZIP's bundled compiler, runtime assets, and linker, debug and release
Run/Build passed without using a host SDK. Building the compiler from source
still needs native development tools. This remains a Development Build, without
production entitlement or fresh no-SDK host acceptance.

## VS Code Tasks

Open **Terminal: Run Task** to see `wbasic` tasks for each manifest:

- Check
- Run
- Test
- Build Development Debug
- Build Development Release

Debug is the default build task and Test is the default test task. The `$wbasic`
problem matcher links compiler errors back to their source.

{{< guide-screenshot name="08-run-build-tasks.png" alt="Run Task showing WBasic Check, Run, Test, Development Debug, and Development Release beside an integrated terminal without personal history" caption="Screenshot to capture: WBasic tasks and Run output in the integrated terminal" >}}

## Emit Object

Use **WBasic: Emit Project Object** when you need a native object for the current
host. The extension asks for an absolute output path. This is a contributor and
development workflow; most beginners should use Build Project.

## Practice task

1. Run Check Project.
2. Run Project and verify the Thai output.
3. Build Debug and open the build record.
4. Build Release and compare the profile in its record.
5. Add one type error and confirm that its task link opens the right source.

Continue to [Test with Test Explorer]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}}).

