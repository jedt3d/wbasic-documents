# WBasic documents working agreement

## Repository role

- This repository owns the public WBasic reference website and the archived
  Programming with WBasic / TDD with WBasic manuscripts.
- Product source, specifications, behavior evidence, examples and development
  plans live in [jedt3d/wbasic-language](https://github.com/jedt3d/wbasic-language).
  Public documentation must describe verified, published release behavior
  or merged behavior with its explicit development scope from that repository. Planned or Deferred behavior must remain labelled as such.
- Thai is the authoritative edition until the user explicitly requests an
  English translation. A Thai technical editor reviews correctness, logical
  flow, readable professor-like prose and restrained humor before translation.

## Authoring and generated output

- `src/` is the canonical Hugo source. Never hand-edit `html/`.
- `src/themes/wbasic/` is the default theme. Preserve the committed design
  tokens, local IBM Plex font files and OFL notices.
- Thai glyphs in reading leads and paragraphs use IBM Plex Sans Thai Looped.
  Keep headings, UI, tables, Latin glyphs and code on their existing families;
  preserve the Thai-only Unicode range when editing font declarations.
- `archived/` is historical material. Do not silently promote it into the
  normative reference.
- Hugo is pinned by `src/.hugo-version`. Run `build.ps1` on Windows or
  `build.sh` on macOS/Linux; both rebuild `html/` and run `verify-site.mjs`.
- Run `node verify-source.mjs` before committing to validate UTF-8, Markdown
  fences and local links.
- Small Projects may contain `draft.wbas.txt` sketches inside Planned lessons.
  Keep source-check evidence separate from native execution and lesson acceptance;
  do not rename a draft to `main.wbas` or increase verified counts on source
  acceptance alone. Preserve Thai/English code and download parity.
- Library requests use stable `SWP-FR-*` IDs in the language repository's
  `docs/proposals/small-projects-library-feature-requests.md`. Consult the relevant
  entry before expanding an affected lesson; Proposed API sketches are not
  supported WBasic or implementation approval.

## Publishing

- Every publishing push must have a new `docs-vYYYY.MM.DD.N` version in
  `src/static/version.json`. Build and commit source plus generated HTML, then
  use `node publish-docs.mjs`. It creates an annotated tag and atomically pushes
  only this repository's main and that tag. Never reuse or force-move a published
  version. The Pages workflow rejects a missing tag or a tag for a different SHA.
- Verify the completed Pages run and live `version.json`, `deployment.json`,
  and both language footers before reporting publication success.
- WBasic is proprietary, not open-source. Keep the copyright notice naming
  Worajedt Sitthidumrong and preserve all third-party license notices.

- `.github/workflows/pages.yml` builds and verifies the site on every push to
  `main`, then publishes the generated `html/` artifact to GitHub Pages.
- The production base URL is
  `https://jedt3d.github.io/wbasic-documents/`.
- Do not bypass the workflow with a manually maintained `gh-pages` branch.

## Current evidence boundary

- Current public reference follows the verified private experimental compiler/runtime
  **0.1.0** release, sealed source `3901cf17ce971dd0c7f591b424d73b086610fc46`.
  Extension **0.2.1** and protocol **0.0.2** retain independent versions. CLI,
  portable ZIP and the compiler selected by VS Code share the current compiler
  version. Old releases are immutable historical downloads.
- The v0.3 catalog is 72 Passed / 23 Planned / 0 Deferred; this is not full v0.3
  acceptance and excludes separate experimental WORM milestones. R6 D1–D5
  passed within the recorded scope; inbox OSC52 limitations remain distinct.
- Both native ARM64 release ZIPs passed package/extraction/run/build checks on
  developer hosts. Fresh no-SDK, production entitlement, notice/redistribution,
  signing/notarization, Linux/native x86_64 remain unaccepted.
- Extension 0.2.1's prior verified integration records 11 real VS Code host,
  120 editor and 71 protocol checks per ARM64 host. Preserve simple-receiver
  completion limits and four manual example actions; do not relabel old tests.
- Every current compiler release update must synchronize
  `src/static/compiler-release.json`, compiler/runtime/source metadata in
  `src/static/version.json`, installation instructions and current project/module
  example pins. Run `verify-compiler-release.mjs` through both build scripts and
  the publishing script. Publish only after compiler asset audit/publication;
  website tags stay separate from compiler release tags. Never claim an internal
  development compiler is the current external release.
- A documentation change does not promote product acceptance by itself.

## Git workflow

- Use focused branches and coherent `docs:`, `fix:`, `feat:` or `chore:` commits.
- Keep generated `html/` in the same commit as its source change so local review
  and the deployed artifact remain reproducible.
- Do not commit secrets, caches, installers or personal machine paths.
