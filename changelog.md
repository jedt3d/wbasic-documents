## 2026-10-02 — Documentation aligned to compiler release v0.1.0

- Current installation routes, Getting Started project pins, reference and Extension Guide now share compiler/runtime 0.1.0; optional Extension 0.2.1 and protocol 0.0.2 remain independently versioned.
- Published release identities and both ZIP hashes are recorded in `compiler-release.json`, with matching metadata in the website version. A new build/publish check rejects mismatched current bilingual manifest pins. Old evidence/example hashes remain historical and unchanged.
- Native packaged debug/release run/build parity passed on Windows/macOS ARM64. The exact reader-created Billing Time lesson also passed check/run/build/direct on both with 210 minutes /18000 cents. Prior compiler/editor counts are cited rather than relabelled as new tests.
- Publication tag: docs-v2026.10.02.1. Independent Thai/English review, site checks, Pages and live identity verification are required before closeout; production/no-SDK acceptance remains separate.

# Documentation changelog

## 2026-10-02 — latest installed Extension integration

Revised both editions to include the verified local compiler/runtime 0.1.0 and
Extension 0.2.1 at `6d70480`, which the earlier main-only sync did not cover.
Extension chapters 1–12 now teach that pair, including live project metadata,
receiver completion, navigation, Test Explorer and WORM examples. Chapter 0
retains the published compiler 0.0.2 / VSIX 0.1.0 workflow. Version guidance
explains the relationship to compiler releases and matching manifest pins.

Read-only checks confirmed installed Windows extension/compiler versions and
artifact hashes. Existing dual-ARM64 integration evidence remains attributed to
its original run. New review and document checks are recorded in
[latest revision evidence](evidence/latest-extension-revision-2026-10-02.md).
This is local documentation integration; no new release or publication.

## 2026-10-02 — compiler and tooling sync

Updated both language editions against merged compiler source `143be58` and the
private experimental 0.0.2 preview. Added current-version guidance, a WORM SQLite
reference and the packaged VSIX 0.1.0 workflow. Replaced proposed Billing Time
WORM syntax with the implemented example, and labelled R8B exercises as belonging
to a separate unmerged development branch.

Independent Thai/English review approved the corrected transaction explanations.
Protocol 56/56 and extension 69/69 checks passed; the reader-created starter passed
Windows ARM64 check/run/release-build/direct-run. Hugo and bilingual/site checks
passed. Earlier Mac product evidence remains pinned; this is documentation work,
not a new product acceptance or publication. Details and limitations:
[sync evidence](evidence/compiler-tooling-sync-2026-10-02.md).
