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

## Publishing

- `.github/workflows/pages.yml` builds and verifies the site on every push to
  `main`, then publishes the generated `html/` artifact to GitHub Pages.
- The production base URL is
  `https://jedt3d.github.io/wbasic-documents/`.
- Do not bypass the workflow with a manually maintained `gh-pages` branch.

## Current evidence boundary

- Current public reference coverage follows the verified implementation through
  R7: 71 Passed, 23 Planned and 1 Deferred behavior in the source catalog.
- Positive Windows OSC52 read remains Deferred and endpoint-dependent. Linux
  ARM64, native x86_64 and R8 clean-machine/no-SDK distribution are not accepted.
- A documentation change does not promote product acceptance by itself.

## Git workflow

- Use focused branches and coherent `docs:`, `fix:`, `feat:` or `chore:` commits.
- Keep generated `html/` in the same commit as its source change so local review
  and the deployed artifact remain reproducible.
- Do not commit secrets, caches, installers or personal machine paths.
