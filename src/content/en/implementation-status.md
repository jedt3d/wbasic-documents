---
title: "Compiler and tooling versions covered by this reference"
description: "Distinguish compiler 0.0.2, its packaged VSIX, and the R8B branch with measured verification boundaries"
---

Updated on **2 October 2026**, using source merged into `main` at
[`143be58`](https://github.com/jedt3d/wbasic-language/tree/143be583ce875629b430436ed4a4ffc9dac952bf)
and publication evidence for the **0.0.2 private experimental preview**.
The compiler version differs from the language design's **draft v0.3** and
from the website version. Before trying an example, identify your toolchain.
The compiler cannot read minds, but it can report its version.

## Choose a workflow that matches your tools

| Component | Current scope |
|---|---|
| Compiler/runtime | Matched 0.0.2 pair; Windows ARM64 and macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor` |
| Build | Accepts a `.wproj` project; `debug` and `release` profiles; production entitlement remains `false` |
| WORM | Experimental SQLite: typed mapping, changes, query, transaction and optimistic version guard |
| Packaged VSIX | 0.1.0; VS Code `^1.139.0`; check/run/build/test commands and capability-gated help |
| LSP/MCP | Compiler-backed diagnostics/help and saved-project checking; no application execution through the protocol |
| R8B guide | Separate branch `1bba6f9`; New Project, Projects view and Test Explorer are absent from the VSIX above |

Read [Getting Started]({{< relref "/books/getting-started/_index.md" >}}) for CLI use,
[WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}) for databases,
and the [Extension Guide]({{< relref "/books/w-basic-extension/_index.md" >}})
for an editor workflow that matches your version.

## Experimental ZIP and distribution limits

Users with repository access can obtain the package from the
[private v0.0.2 prerelease](https://github.com/jedt3d/wbasic-language/releases/tag/v0.0.2).
Compare the ZIP's SHA-256 with its sidecar before extraction, then use
`Install-And-Test` and the package's PATH helper. The package supplies a runtime
and prepared linking tools; Node is needed only for the protocol adapters and
VS Code only for editor use. Trying the ZIP and building the compiler from Rust
source require different machine preparation.

Extracted packages passed developer-host checks on Windows 11 Pro 25H2 ARM64
(PowerShell 5.1 and 7) and macOS 26.6.2 ARM64. Core checks, Unicode, native Hello,
test discovery and billing passed. These results **do not prove acceptance on a
fresh machine without an SDK**. An operator report of compiler success does not
replace a fresh-machine inventory. Signing/notarization, redistribution review
and production acceptance remain open. See the
[release notes](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/releases/v0.0.2.md)
and [publication evidence](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/evidence/v0.0.2-release-2026-10-02.json).

## What the test results establish

The normative v0.3 catalog currently records **72 Passed / 23 Planned / 0 Deferred**.
This is not complete v0.3 compiler acceptance, and the counts exclude the separate
WORM milestones. R6 D1–D5 native acceptance is complete within its recorded scope.
Positive Windows OSC52 reads passed on a pinned private Microsoft ConPTY endpoint;
some inbox Windows hosts can still time out. NativeLocal and OSC52 are distinct
clipboard routes.

Linux ARM64 and native x86_64 lack acceptance evidence. Comparative human learning
and review time, and AI cost advantages, are not established. See the
[integrated R6 report](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/rounds/R6-main-integration-verification.md)
for the actual profiles and endpoints.

## Older example evidence remains pinned

Small WBasic Projects retains 29 native-verified examples and 52 Planned lessons
at their recorded revisions. This documentation update does not rerun every
example under 0.0.2 or automatically promote Planned lessons. R8B examples retain
their branch's evidence; they do not establish acceptance of VSIX 0.1.0.
