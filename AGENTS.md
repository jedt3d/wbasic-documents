# WBasic documents working agreement

## Repository role

- This repository owns the public WBasic reference website and the archived
  Programming with WBasic / TDD with WBasic manuscripts.
- Product source, specifications, behavior evidence, examples and development
  plans live in [jedt3d/wbasic-language](https://github.com/jedt3d/wbasic-language).
  Public documentation must describe merged, verified behavior from that
  repository. Planned or Deferred behavior must remain labelled as such.
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

- Current public reference follows merged language revision `143be58` and the
  private experimental compiler/runtime 0.0.2 preview. The v0.3 behavior catalog
  records 72 Passed / 23 Planned / 0 Deferred; it is not complete v0.3 acceptance
  and does not count the separate experimental WORM milestones.
- R6 D1–D5 passed within their recorded endpoint scope. Positive Windows OSC52
  replies passed on a pinned private Microsoft ConPTY endpoint; the inbox host
  limitation and clipboard-manager policy remain distinct from that result.
- Selected WORM SQLite M2–M5 contracts and developer-host portable-package tests
  are verified. Fresh-machine/no-SDK acceptance, production entitlement,
  signing/notarization, Linux ARM64 and native x86_64 remain unaccepted.
- The R8B productivity extension guide describes separate development branch
  `1bba6f9`, not the 0.1.0 VSIX bundled with compiler 0.0.2. Mark that boundary
  at entry points and in each branch-specific exercise; do not imply that the
  preview package includes New Project, Projects view or Test Explorer.
- A documentation change does not promote product acceptance by itself.

## Git workflow

- Use focused branches and coherent `docs:`, `fix:`, `feat:` or `chore:` commits.
- Keep generated `html/` in the same commit as its source change so local review
  and the deployed artifact remain reproducible.
- Do not commit secrets, caches, installers or personal machine paths.
