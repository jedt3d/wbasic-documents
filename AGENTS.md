# WBasic documents working agreement

## Repository role

- This repository owns the public WBasic reference website and the archived
  Programming with WBasic / TDD with WBasic manuscripts.
- Product source, specifications, behavior evidence, examples and development
  plans live in [jedt3d/wbasic-language](https://github.com/jedt3d/wbasic-language).
  Public documentation must describe verified, published release behavior
  or merged behavior with its explicit development scope from that repository. Planned or Deferred behavior must remain labelled as such.
- Thai is the authoritative edition. English and Japanese translations are
  user-approved. A Thai technical editor reviews correctness, logical flow,
  readable professor-like prose and restrained humor before translation.
  Maintain matching page paths, code/output blocks, API identifiers, status limits
  and chapter order across all three editions. Translate prose and UI labels;
  keep executable examples shared. Run `verify-japanese-edition.mjs` with the
  existing build gates. Archived manuscripts remain historical and untranslated.

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
  and all three language footers before reporting publication success.
- WBasic is proprietary, not open-source. Keep the copyright notice naming
  Worajedt Sitthidumrong and preserve all third-party license notices.

- `.github/workflows/pages.yml` builds and verifies the site on every push to
  `main`, then publishes the generated `html/` artifact to GitHub Pages.
- The production base URL is
  `https://jedt3d.github.io/wbasic-documents/`.
- Do not bypass the workflow with a manually maintained `gh-pages` branch.

## Current evidence boundary

- Before changing installation guidance, manifest pins or publication metadata,
  read `src/static/compiler-release.json`, `src/static/extension-update.json` and
  `src/static/version.json`. These are the current delivery identities; the
  compiler, Extension, protocol and website have separate versions.
- The current daily-editor release evidence is
  [editor-daily-release-2026-10-06](evidence/editor-daily-release-2026-10-06.md).
  It binds the private v0.2.0 ARM64 packages and direct VSIX to the sealed product
  source. Keep earlier v0.1.0 and local Extension0.2.3 evidence historical.
- Native package tests are developer-host evidence. Fresh no-SDK, production
  entitlement, remaining redistribution/notices and signing/notarization stay
  unaccepted. Consult the release record before making a platform or real-window
  claim; Windows editor actions do not establish macOS/Linux UI acceptance.
- Synchronize current release metadata, installation guidance and project/module
  pins in Thai/English/Japanese. `verify-compiler-release.mjs` must pass in both
  build and publishing workflows. Publish the website after asset publication;
  preserve immutable compiler and website tags as separate identities.
- Historical catalog and example results keep their original source pins.
  Documentation changes do not promote language or production acceptance.

## Git workflow

- Use focused branches and coherent `docs:`, `fix:`, `feat:` or `chore:` commits.
- Keep generated `html/` in the same commit as its source change so local review
  and the deployed artifact remain reproducible.
- Do not commit secrets, caches, installers or personal machine paths.
