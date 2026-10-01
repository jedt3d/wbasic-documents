# Extension 0.2.1 guide: Thai and English editorial review

Date: 2026-10-02  
Status: Approved for the reviewed local development guide; release wording must follow separately verified publication

I reviewed the paired Thai and English WBasic Extension Guide source in `src/content/{th,en}/books/w-basic-extension/` against the read-only language source `6d704801c40a4727a0f2c1c5f7588383e0e156bc`, its VS Code parity round report, and `docs/evidence/vscode-toolchain-parity-2026-10-02.json`. This is an editorial/source-evidence review, not a new native or installed-host test run.

## Corrections resolved

1. Thai chapter 4 now calls `๑๐ + 25` a numeric **expression**, matching the English edition.
2. Both editions now give the receiver-completion boundary once, retaining compiler-approved visible fields and methods on simple declared Structure/imported nominal bindings and the private/internal/unimported exclusions. They do not promise arbitrary expression chains, complete import-alias type mapping, all intrinsic String/Array members, or local-variable navigation.

## Verified editorial boundaries

- Chapter 0 preserves the published compiler `0.0.2` and optional legacy VSIX `0.1.0` route, including its `wbasic.buildProfile` setting. Chapters 1–12 consistently identify the unmerged, unreleased local development pairing: compiler/runtime `0.1.0`, `wbasic-dev.wbasic@0.2.1`, protocol `0.0.2`. The exact `6d704801` source is plain text, with no GitHub link to an unpushed commit.
- New Project dynamically writes the selected compiler-reported version; `0.1.0` is the value for this guide's matched pair. The newer setting is `wbasic.defaultProfile`.
- The live project snapshot, compiler-backed cross-file navigation and validated rename, and Test Explorer descriptions remain bounded. Older compiler capability records without `editorProject` are handled as unsupported, not implicitly upgraded by the extension.
- The catalog description matches 31 examples, 10 categories, and 61 teaching files. WORM M2/M3 are copyable complete Check/Build projects; database Run needs an explicit SQLite path after `--`. M4 is a repository-only reference requiring local Billing module staging and is excluded from Copy Example. Four manual example actions are not promoted to passes.
- The chapters describe the recorded 11/11 installed VS Code checks on each ARM64 host as historical evidence. They do not claim a new run in this review, a Marketplace release, clean-machine no-SDK distribution, or production acceptance.

All fenced code blocks in paired Thai/English guide pages matched byte-for-byte. `node verify-source.mjs` passed: 437 UTF-8 Markdown files with balanced fences and 138 valid local links. No source checkout or Git file was modified by this review.

I rechecked the corrected chapter 4 and reran the paired-fence comparison and `node verify-source.mjs`; both passed. The reviewed guide is approved as a description of the recorded, locally verified development build. Later compiler release authorization is outside this evidence boundary until publication is actually verified; this review does not certify a release or change historical installation/test results.
