# Compiler and tools → bilingual documentation sync

Date: 2026-10-02 (Asia/Bangkok). User scope: inspect compiler/tool changes since
the previous book update and improve our content. Documentation-only integration;
no compiler implementation, product acceptance change or publication.

## Source boundary

Documents base: `63f6073` (`docs-v2026.10.01.2`), including the prior bilingual
extension guide and three source-checked project drafts. Authoring branch:
`feature/compiler-tooling-docs-sync`.

Product merged source: `143be583ce875629b430436ed4a4ffc9dac952bf`; available
read-only product checkout `e7edb1e` has the same tracked tree
`cfba7b7a095008f393281cdceaf6a889ec25a1f5`. Current private prerelease is compiler/
runtime `0.0.2`, sealed package source `b9c8ef99`. R8B guide source `1bba6f9` is
a separate unmerged branch, not the preview's packaged VSIX `0.1.0`.
Uncommitted edits in other product checkouts and untracked integration tests in
the product worktree were excluded from public capability claims and preserved.

Primary product records:

- [Release notes](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/releases/v0.0.2.md)
- [Publication audit](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/evidence/v0.0.2-release-2026-10-02.json)
- [Identity hardening](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/rounds/WORM-M2-M5-identity-hardening.md)
- [R6 integrated verification](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/rounds/R6-main-integration-verification.md)

## Changes and editorial outcome

- New bilingual implementation-status page distinguishes language draft, compiler,
  website and editor versions; links immutable evidence and private release access.
- Getting Started teaches `wb build`, profile selection and 0.0.2 manifests.
  Chapters 5–9 now walk through actual WORM billing source instead of proposed
  attributes/fluent setters. Explicit migration remains application code.
- WORM SQLite reference covers checked mapping identity/fields, three-state write
  intent, transaction state/Unknown outcomes, version guards and resource limits.
- Current extension workflow teaches the packaged 0.1.0 commands/settings and ZIP
  install path. All twelve older R8B chapters have a branch-specific notice.
- CSV documents exclusive create; terminal lifecycle records positive pinned
  Windows OSC52 evidence and the exceptional pending input/output cleanup policy.
- Current comparison notes in 15 Small Projects chapters per language changed;
  source/output hashes, 29 historical native results and 52 Planned statuses did
  not change. No historical raw results or versioned reviews were rewritten.
- AGENTS and README reflect current measured scope and the editor branch boundary.

Three author lanes and an independent Thai technical-editor/English parity lane
used `gpt-6-sol / medium` dispatch settings. Each had separate allowed write paths
and made no Git mutations. Review corrected the invoice lesson's transaction/read
order, qualified rollback versus dispatched-commit Unknown, and separated billing
fixture proof from M5 outcome hooks. Final source editorial result: **Approved**.
See [independent review](compiler-tooling-sync-editorial-2026-10-02.md) and the
three lane notes alongside it.

## Fresh checks in this documentation task

- Product protocol: `npm test --prefix tools/protocol` — **56 passed, 0 skipped**,
  using the current local compiler/probe through the adapter's normal discovery.
- VS Code source suite: first default run **54 passed / 15 skipped** because no
  executable was supplied. Final run with `WB_TEST_EXECUTABLE` set to the actual
  `target/debug/wb.exe` (`wb 0.0.2`, native Windows ARM64) — **69 passed, 0 skipped**.
  This suite is not a real VS Code Extension Host/install acceptance test.
- Reader-created Getting Started chapter 2: extracted exact manifest and source
  fences; packaged 0.0.2 `check --json` accepted without diagnostics; `run` produced
  the lesson's four expected lines; release `build --output` produced a native
  executable. PE machine inspected as `0xAA64`; separate bounded direct launch
  returned exit **0**, exact output and no stderr. Source SHA-256
  `2e50c9797a1d65b4a4d5501ddf91f62b50417250e63b5c56077e6cccc1d2a52b`;
  manifest SHA-256 `bfc882f1067cc880d95109d1811a506c36f8ef6256b38a58ace84bd80d34aad8`;
  executable SHA-256 `4cc7f485ba7186e628c7fc2b86e5d1e97a3abeebca7035cadbd47756eb6680d2`.
  Build record reports `release`, compiler `0.0.2`, ABI `v1`, internal-development.
  This is a Windows developer-host lesson check; no new Mac native run is claimed.
- Pinned Hugo `0.167.0` and all build verifiers — **Passed**: 437 UTF-8 Markdown
  files / 138 valid local links; 297 HTML pages; 146 paired pages; 136 translation
  checks; 14 paired extension-guide pages and 10 screenshot slots per language;
  all 29 historical source/output hashes and three draft/download pairs intact.
- Independent editor additionally checked identical fences in 40 bilingual page
  pairs, including Getting Started, which the general verifier exempts.
- Local preview routes for both implementation-status translations, current
  extension workflow and invoice lesson — HTTP **200** with expected page titles.
- `git diff --check` — Passed at integration.

## Remaining boundaries

The source catalog is 72 Passed / 23 Planned / 0 Deferred, not full v0.3 or WORM
roadmap acceptance. The positive Windows clipboard result is endpoint-scoped.
Existing dual-ARM64 product records support the WORM/R6 descriptions; they are
not newly executed Mac gates in this task. Fresh-host/no-SDK acceptance,
production, signing/notarization, redistribution review, real editor-host
acceptance, Linux/native x86_64 and comparative human/AI cost results remain open.
No push, merge or new publication tag was made. The last published website
version is unchanged; this branch and generated HTML are ready for local review.
