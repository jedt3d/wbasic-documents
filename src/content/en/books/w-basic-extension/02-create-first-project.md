---
title: "2 · Create the first project"
description: "Use New Project to create the manifest, source, and test skeleton without arranging files by hand"
weight: 2
---

We will create `MyFirstWBasic` with the extension so its layout matches what the
compiler and Test Explorer expect.

## Create it from the Command Palette

1. Open the Command Palette.
2. Select **WBasic: New Project**.
3. Choose an empty folder as the project root.
4. Name the project `MyFirstWBasic`.
5. Open that folder as a workspace when VS Code offers.

{{< guide-screenshot name="02-new-project.png" alt="VS Code Command Palette selecting WBasic: New Project and an empty destination folder, with personal recent projects hidden" caption="Screenshot to capture: starting New Project and choosing the destination folder" >}}

The project name must be an NFC Unicode identifier accepted by the compiler.
Thai names are valid, but avoid names that differ only by Unicode normalization:
people see the same word while tools must compare it like handwriting evidence.

The command never overwrites existing files, so the destination must be empty.
It creates this layout:

```text
MyFirstWBasic/
|-- App.wproj
|-- src/
|   `-- Main.wbas
`-- tests/
    |-- main_spec.wbas
    `-- test-catalog.json
```

## Meet the four files

`App.wproj` is the manifest. It declares the project name, module, entry source,
toolchain, and direct dependencies. `src/Main.wbas` is the starter program.

`tests/main_spec.wbas` contains test source, while `tests/test-catalog.json`
holds test rows used by the native runner. The extension reads case identities
from the compiler; it does not invent test names.

## Select the active project

When a workspace has one `.wproj`, the extension selects it automatically. With
several manifests, use **WBasic: Select Active Project**. Selection is stored per
workspace folder, so a multi-root workspace will not quietly build the project
on the left when you meant the one on the right.

Open **WBasic Projects** and refresh if the manifest is not yet visible. The view
shows the selected project's entry source, namespace, dependencies, profile,
and toolchain.

{{< guide-screenshot name="03-projects-view.png" alt="Explorer showing App.wproj, src, and tests beside the WBasic Projects view with the active project, entry, profile, and toolchain" caption="Screenshot to capture: the generated project tree and WBasic Projects view" >}}

## Practice task

Open `App.wproj` and start a new line under `[project]`. Observe key completion,
then undo the edit. A completion list is useful, but it is not a collection you
must acquire in full.

## Checkpoint

- [ ] All four files exist in the shown layout.
- [ ] `App.wproj` uses the `WBasic Manifest` language mode.
- [ ] `Main.wbas` uses the `WBasic` language mode.
- [ ] WBasic Projects shows the correct project and entry.

Continue to [Tour the workspace and manifest]({{< relref "/books/w-basic-extension/03-workspace-and-manifest.md" >}}).

