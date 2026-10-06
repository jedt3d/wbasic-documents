---
title: "6 · Navigation and refactoring"
description: "Use definitions, references, highlights, rename, and direct-call hierarchy from the compiler"
weight: 6
---

> **Version scope — matched private experimental 0.2.0.** This guide uses compiler/runtime `0.2.0`, protocol `0.1.0`, and VS Code extension `0.3.0` on Windows/macOS ARM64. Older `0.1.0`/extension `0.2.1` and the local `0.2.3` correction are separate historical evidence; installing a newer extension alone does not add E01–E10. Check the version and capabilities with **WBasic: Show Toolchain Status** first.

As a project grows, finding declarations by eye politely loses to tooling. The
extension uses compiler identities and spans for cross-file navigation.

## Core commands

- **Go to Definition** opens a procedure or symbol declaration.
- **Find All References** lists uses in the app, modules, and discovered tests.
- **Peek Definition** shows a declaration without leaving the call site.
- **Usage highlights** mark same-identity uses in the current document.
- **Go to Symbol in Workspace** searches public and project symbols.
- **Rename Symbol** prepares multi-file edits and asks the compiler to validate the complete snapshot.
- **Show Call Hierarchy** shows compiler-resolved direct callers and callees.

Right-click `Greeting` in `Main`, select Go to Definition, and then Find All
References. The results should not include the same text inside comments or strings.

Use **F12** for the declaration, **Alt+F12** for Peek, and **Shift+F12** for
references. If two procedures each have a Thai local with the same spelling,
highlights and references follow only the binding chosen by the compiler.

## Rename without guessing

Select Rename Symbol and change `Greeting` to `WelcomeMessage`. The extension
uses compiler identity to bind the declaration and references, then validates
the complete edited source set before returning a WorkspaceEdit. A failed
validation never leaves half a project renamed.

{{< guide-screenshot name="06-navigation-rename.png" alt="VS Code Rename preview showing the WelcomeMessage declaration and references in two source files, excluding comments and strings" caption="Screenshot to capture: compiler-validated cross-file rename before applying the edit" >}}

Rename requires compiler capability `rename` and an overlay inside the supported
bounds. The current project overlay allows 32 open documents, 1 MiB per file,
and 4 MiB total. Beyond those limits, the operation fails closed instead of guessing.

The 0.2.0 compiler graph covers resolved procedures, locals, parameters,
constants, nominal types, and fields/enum members. It also links named-argument
labels to their actual parameter. Renaming a parameter therefore edits its
declaration, body uses, and call labels in the app and tests, without touching
a same-named parameter on another method. References and incoming calls inspect
discovered test files as separate contexts so a rename started in the app does
not leave test calls stale. If a saved test file has no discoverable case or a
snapshot changes during validation, the action returns unavailable instead of
partial edits. Renaming a test-entry procedure is not supported because it can
change catalog identity.

Call Hierarchy reports only direct calls with compiler-resolved callers, callees,
and call-site name spans, including recursion and calls from discovered tests.
An indirect call through a procedure value has no invented target. Go to
Implementation is outside this update.

## What not to expect yet

- Tokens without complete compiler semantic identities and references are not edited by text search.
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


## Action chooser in the 0.4.0 candidate

**WBasic: Actions at Caret** and **WBasic: Refactor This** collect actions applicable at the cursor under current capabilities; unsupported structural changes are not presented as proved refactorings. **WBasic: Surround With** wraps a selection in an explicit If or Try/Finally shape. Review the condition and cleanup, then Check Project. See the [candidate scope]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); Actions at Caret, Refactor This, rename preview and Surround With with Check/Undo passed in the installed Windows candidate.

### When Vim claims a key

In the tested Windows window, Vim Visual Line mode claimed **Ctrl+B** before Definition. Use **Go to Definition** in the Command Palette or **F12**. **Alt+Enter** invokes **WBasic: Actions at Caret** when its binding is available. After the protocol repair, F12 reached Amount in an owned project source while an unowned Template was open.
