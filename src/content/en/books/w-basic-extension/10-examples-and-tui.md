---
title: "10 · Examples and the TUI workflow"
description: "Open or copy verified examples and begin TUI or Jobs work from deterministic templates"
weight: 10
---

> **Version scope — locally verified extension 0.2.3.** The 0.2.3 VSIX was verified locally with a matched development compiler/runtime; the published private experimental compiler/runtime is `0.1.0` with protocol package `0.0.2`. The published ARM64 ZIPs immutably bundle extension `0.2.1`; extension `0.2.3` has no public release or Marketplace listing. Start with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}). The older private compiler `0.0.2` bundles extension `0.1.0` and lacks these project editor workflows.

The 0.2.3 correction was verified through Windows ARM64 project commands. Interactive TUI input and the macOS/Linux editor workflow were not rerun for this extension version.

The extension includes the structurally verified example catalog whose hashes
match the repository. It currently contains 31 examples in 10 categories, with 61 teaching files,
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

`worm-m2-sqlite` and `worm-m3-billing` can be copied as complete projects, including modules and SQLite schema where needed. Their automated actions Check and Build. To run a database example, pass an explicit SQLite path as a program argument after `--`; the generic Run Project command does not ask for that path. `worm-m4-ui-reference` opens a repository reference only. It is excluded from Copy Example because its Billing module must first be staged at the local dependency path.

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

