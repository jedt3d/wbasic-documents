# Compiler v0.1.0 documentation alignment

Date: 2026-10-02. User requested publishing compiler v0.1.0 and keeping externally supplied current compilers at one version with a synchronized docs update.

Private experimental [v0.1.0 release](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0), sealed source `3901cf17ce971dd0c7f591b424d73b086610fc46`, is published and independently re-downloaded/rehashed. Compiler/runtime are 0.1.0; optional Extension 0.2.1 and protocol 0.0.2 keep independent versions. Both native ZIPs match their source/inventories and reviewed VSIX. Windows managed compiler now uses the exact sealed ZIP payload, with previous toolchain preserved in backup. Main merge is separate.

## Current documentation and evidence boundaries

- Paired Getting Started, reference entry points, Extension Guide and implementation status follow the current release; `compiler-release.json` and website metadata bind source and both ZIP hashes. Old example/evidence hashes remain unchanged.
- Windows 15 / Mac 14 package probes and 71 protocol tests per host passed. Windows extracted PowerShell 5.1/7 each 9 probes, Mac 26.6.2 ten steps, tamper rejection and packaged debug/release run/build/diagnostic/atomic-output controls passed.
- Exact reader-created Getting Started 02 source with 0.1.0 pin passed check/run/build/direct on both. Native PE AA64/Mach-O ARM64 inspected; four output lines include 210 minutes /18000 cents. Source SHA 2e50c9797a1d65b4a4d5501ddf91f62b50417250e63b5c56077e6cccc1d2a52b and project SHA a477426f65514ced4bb814cb9680e5404ecff1a625807c8207c537c9496e63e6.
- Prior 519 Windows /507 Mac Rust,71 protocol/120 editor/11 actual VS Code-host checks per host are cited from the reviewed integration, not rerun for this docs update.
- Normative catalog remains 72 Passed /23 Planned /0 Deferred; Small Projects remains 29 native examples/52 Planned lessons. Production/no-SDK/signing/notices/Linux/x64 remain unaccepted.

## Review and validation

Book author gpt-6-sol/medium: changed paired guide to current release. Independent Thai technical editor gpt-6-sol/medium: [Approved source](v0.1.0-editorial-review-2026-10-02.md), readable Thai and English parity. Independent compiler/artifact verifier gpt-6-sol/high checked published identities and source/generated manifests; actual package scripts independently check metadata/source versions. MCP/LSP gpt-6-luna/medium reported no content change,18 protocol files/schema exact across packages; separate VSCode gpt-6-sol/medium checked exact 0.2.1 VSIX identity/path.

`verify-source.mjs`:437 Markdown/138 links Passed. Hugo 0.167.0:154 Thai/152 English pages;297 HTML passed,146 paired pages/136 translation checks,14 paired guide pages/10 screenshot slots per language,29 native fixture hashes unchanged. New `verify-compiler-release.mjs` passes current identities/pins and is wired into both build scripts/publisher. Isolated-copy negative controls reject stale manifest pin, runtime-version mismatch and website/source mismatch; current source files were not changed by controls.

Initial new guard mistakenly required a literal pin on New Project chapter 02, whose content correctly describes dynamic pinning. Its assertion now targets chapter 03's actual manifest snippet; strict current-version comparison is preserved. Thai leading-space and source-repository wording corrections were reviewed. Compiler managed-install trial initially expected exit 42 from shipped Hello, which correctly returns 0; corrected exact exit/stdout passed without product changes.

Website tag `docs-v2026.10.02.1`; Pages/live version+deployment+both-language footers must be verified after push before closeout. Historical initial sync [note](latest-extension-revision-2026-10-02.md) remains as its original pre-release checkpoint.
