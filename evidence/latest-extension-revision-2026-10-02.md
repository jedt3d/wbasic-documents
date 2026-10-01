# Latest development compiler and Extension documentation revision

User requested rechecking the newest updates, especially VS Code, and asked how
the compiler version relates to releases and which version to use.

The preceding documentation checkpoint `a5d57aa` followed merged `143be58`
and published private compiler/runtime 0.0.2. It did not include the later local
integration on `feature/vscode-toolchain-parity`. This revision corrects that
coverage gap without rewriting the earlier evidence.

## Source and version boundary

Reviewed local immutable source:
`6d704801c40a4727a0f2c1c5f7588383e0e156bc`. Product report:
`docs/rounds/VSCode-toolchain-parity-2026-10-02.md`; evidence:
`docs/evidence/vscode-toolchain-parity-2026-10-02.json`. These files are in the
language repository at that development revision, not in the earlier dirty
checkout. The integration has not been pushed, merged or released.

Latest development compiler/runtime: **0.1.0**; Extension:
**wbasic-dev.wbasic@0.2.1**; protocol package: **0.0.2**. Published tag **v0.0.2**
still contains the earlier compiler/runtime **0.0.2** and optional VSIX **0.1.0**.
Workspace Cargo version determines compiler/runtime version. Public editor
CLI/metadata capabilities justify this development minor bump under the recorded
release process. Extension/protocol/site versions are independent. A development
version does not create or change a release tag.

## Fresh read-only observations

Official Windows VS Code CLI lists `wbasic-dev.wbasic@0.2.1`. The managed installed
compiler reports `wb 0.1.0 (aarch64-pc-windows-msvc) R8B`, `editorProject: true`,
completion/rename/build enabled, production entitlement and no-SDK distribution
false. Installed compiler SHA-256 matches the integration record:
`4e1e8e3322df0cd8ebb03ef9801df7356e7171a974c2a33f5b83d6adc7f319ed`.
The 329573-byte VSIX SHA-256 matches:
`d2aa385b5ec035b278aadfcfea500093e23e98797d91b307902cf14413f6158f`.

Recorded integration results, not rerun here: Windows 519 Rust passed / 3 ignored,
Mac 507 passed / 2 ignored; protocol 71/71, editor 120/120 and actual installed
Extension Host 11/11 on each native ARM64 host. Developer Run/Build parity and
example/book gates are scoped in that source evidence. Four manual example
actions remain manual. No fresh-machine acceptance or new portable 0.1.0 package
is inferred from a local installation.

## Content changes and validation

Both editions now teach the current development pair in Extension chapters 1–12,
with dynamic New Project pins, live project snapshots, manifest key/path help,
compiler-owned binding/member visibility, cross-file navigation/validated rename,
Test Explorer and complete WORM M2/M3 example copies. Simple declared receivers
are supported; arbitrary expression chains, complete alias mapping and intrinsic
String/Array member completion remain outside the metadata contract.

Chapter 0 retains the old published package route. Root version guidance and
CLI/reference entry points distinguish the two pairs and instruct matching all
project/module pins to the selected compiler. Getting Started release examples
keep their 0.0.2 evidence; switching to the installed 0.1.0 pair requires explicit
pin changes and checks. No historical example result is promoted.

Author and independent Thai technical-editor/English parity roles were dispatched
with `gpt-6-sol / medium` and disjoint write paths. See
[author note](extension-021-sync-2026-10-02.md) and
[editor review](extension-021-editorial-2026-10-02.md). Hugo 0.167.0 and the existing
source, bilingual, generated-site, download-hash and guide validators are run on
the integrated documentation before commit. This change does not modify product
source, install another compiler, publish or merge either repository.
