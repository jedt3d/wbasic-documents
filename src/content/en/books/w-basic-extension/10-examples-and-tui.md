---
title: "10 · Examples and the TUI workflow"
description: "Open or copy verified examples and begin TUI or Jobs work from deterministic templates"
weight: 10
---

The extension includes the structurally verified example catalog whose hashes
match the repository. It currently contains 27 examples in 10 categories,
covering the language core, modules, tests, streams, JSON, Jobs, TUI, and a
complete SQLite showcase.

## Open and Copy serve different purposes

**WBasic: Open Example** opens an example for reading and for its declared action.
**WBasic: Copy Example** copies the teaching files into a new folder you own,
without editing the repository specimen.

Choose Copy when you want to refactor or add files. Choose Open when you want to
read source or check a feature quickly. An example with an expected diagnostic,
runtime error, or failed assertion is not broken; it teaches that boundary deliberately.

{{< guide-screenshot name="10-examples.png" alt="WBasic: Open Example Quick Pick showing category, name, level, and action without personal recent files" caption="Screenshot to capture: the example picker used to select lessons by topic" >}}

## Suggested learning path

1. `hello-wbasic` — run source and inspect Unicode output
2. `language-core` — declarations, control flow, and procedures
3. `local-module-project` — manifests, dependencies, and cross-file navigation
4. `native-test-basics` — Test Explorer
5. `memory-streams` and `json-values` — typed API help
6. `tui-counter` — deterministic model, update, and view
7. `sqlite-customer-showcase` — a larger project composed from several modules

## New TUI/Jobs Example

**WBasic: New TUI/Jobs Example** opens an unsaved template. Choose either a
terminal counter or a deterministic headless Jobs example, then save it before Run.

Start with the headless test to prove state transitions and virtual-clock
behavior. Then use the integrated terminal with Tui.Run. This catches most bugs
before terminal color and escape sequences join the discussion.

## TUI doctor

Inspect terminal and font capability in the terminal itself:

```console
wb tui doctor
```

Or save a non-interactive report:

```console
wb tui doctor --non-interactive --format json --output REPORT.json
```

The extension does not run the doctor automatically. Terminal profile, font,
and endpoint are properties of the real session and should not be guessed from the editor.

Continue to [Settings, Trust, and troubleshooting]({{< relref "/books/w-basic-extension/11-settings-trust-troubleshooting.md" >}}).

