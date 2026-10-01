---
title: "7 · Modules and dependency paths"
description: "Add local modules through the manifest without Include or hidden search paths"
weight: 7
---

> **Version scope — private v0.1.0 prerelease.** These steps use the published private experimental compiler/runtime `0.1.0`, bundled extension `wbasic-dev.wbasic@0.2.1`, and protocol package `0.0.2` from sealed source `3901cf17`. Start with [the matched-package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

WBasic organizes code with Module, Import, and direct manifest dependencies.
The language has no textual `Include`, and the extension has no global include
path setting. A project's source origins remain visible in the project instead
of hiding in each developer's machine configuration.

## Local module layout

This example adds a module named `Acme`:

```text
MyFirstWBasic/
|-- App.wproj
|-- src/
`-- modules/
    `-- Acme.wmod/
        |-- module.toml
        `-- src/
            `-- Math/
                `-- Total.wbas
```

`module.toml` has this shape:

```toml
[module]
name = "Acme"
toolchain = "0.1.0"
```

## Add it through the extension

1. Create or copy the module inside the workspace.
2. Select the project in **WBasic Projects**.
3. Run **WBasic: Add Local Module Dependency**.
4. Select the folder whose name ends in `.wmod`.
5. Review the preview and select Apply.

The extension validates both project and module manifests. It rejects paths
outside the workspace, symlinks, duplicate names, and duplicate paths. It then
writes a forward-slash relative path while preserving unrelated comments,
ordering, and line endings.

{{< guide-screenshot name="07-module-dependency.png" alt="App.wproj at the dependencies section with a preview adding Acme from modules/Acme.wmod, while WBasic Projects shows the direct module" caption="Screenshot to capture: the local-module preview and resulting manifest" >}}

The result in `App.wproj` resembles:

```toml
[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

Use **Show Project Modules and Dependencies** to confirm that the compiler sees
the same dependency. Use **Remove Local Module Dependency** to remove the entry.
Removal edits only the manifest; it does not delete the module folder from disk.

## Import from source

```basic
Module MyFirstWBasic
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

Public declarations may cross a dependency boundary. Internal declarations are
shared within their defined package or module boundary, while Private follows
the module rules in the specification. Completion and navigation honor compiler visibility.

## Checkpoint

- [ ] The dependency appears once under `[dependencies]`.
- [ ] Projects view shows the module path.
- [ ] Go to Definition opens the module source file.
- [ ] Check Project passes after the Import.

Continue to [Run, Build, and Tasks]({{< relref "/books/w-basic-extension/08-run-build-and-tasks.md" >}}).

