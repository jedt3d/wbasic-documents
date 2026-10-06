---
title: "6 · Navigation and refactoring"
description: "Use definitions, references, workspace symbols, and compiler-validated rename across files"
weight: 6
---

> **Version scope — locally verified extension 0.2.3.** The 0.2.3 VSIX was verified locally with a matched development compiler/runtime; the published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. The published ARM64 ZIPs immutably bundle extension `0.2.1`; extension `0.2.3` has no public release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

As a project grows, finding declarations by eye politely loses to tooling. The
extension uses compiler identities and spans for cross-file navigation.

## Core commands

- **Go to Definition** opens a procedure or symbol declaration.
- **Find All References** lists its uses in the project.
- **Go to Symbol in Workspace** searches public and project symbols.
- **Rename Symbol** prepares multi-file edits and asks the compiler to validate the complete snapshot.

Right-click `Greeting` in `Main`, select Go to Definition, and then Find All
References. The results should not include the same text inside comments or strings.

## Rename without guessing

Select Rename Symbol and change `Greeting` to `WelcomeMessage`. The extension
uses compiler identity to bind the declaration and references, then validates
the complete edited source set before returning a WorkspaceEdit. A failed
validation never leaves half a project renamed.

{{< guide-screenshot name="06-navigation-rename.png" alt="VS Code Rename preview showing the WelcomeMessage declaration and references in two source files, excluding comments and strings" caption="Screenshot to capture: compiler-validated cross-file rename before applying the edit" >}}

Rename requires compiler capability `rename` and an overlay inside the supported
bounds. The current project overlay allows 32 open documents, 1 MiB per file,
and 4 MiB total. Beyond those limits, the operation fails closed instead of guessing.

## What not to expect yet

- Complete local-variable indexing in every scope is not available.
- Rename does not cross unrelated projects that are not dependencies.
- String-based reflection is not considered a reference.
- The language has no textual Include or global include path.

For modules and visibility, read
[Modules, packages, and visibility]({{< relref "/books/language-reference/12-modules-packages-visibility.md" >}}).

## Practice task

1. Create `src/Messages.wbas`.
2. Move `Greeting` into that file while keeping `Module MyFirstWBasic`.
3. Use Go to Definition from `Main.wbas`.
4. Rename it through the extension.
5. Save and run Check Project.

Continue to [Manage modules and dependency paths]({{< relref "/books/w-basic-extension/07-modules-and-dependency-paths.md" >}}).

