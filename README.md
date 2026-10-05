# WBasic online reference

Published site: <https://jedt3d.github.io/wbasic-documents/>

The WBasic compiler, runtime, specifications and verification evidence live in
[jedt3d/wbasic-language](https://github.com/jedt3d/wbasic-language). This
repository owns the public reference source, generated website and archived
book manuscripts.

`src/` is the canonical Hugo source for the WBasic language, library, and API
reference. `html/` is the generated static website committed for review
and publication. The earlier draft books remain read-only historical material in
`archived/` and are not included in the generated site.

The site uses Hugo `0.167.0`. Thai is the authoritative edition for the first
editorial round. It covers the verified language, standard-library and public
API surface in the verified compiler/runtime **0.1.0** private experimental release
at sealed source `3901cf17`, including selected WORM SQLite contracts. CLI,
portable ZIP and the compiler selected in VS Code share this version; optional
Extension **0.2.1** and protocol **0.0.2** retain their own versions. The TH/EN/JA
Getting Started, reference and Extension Guide follow this release cohort.
Historical evidence and Small Projects fixtures keep their original revisions.
`src/static/compiler-release.json` binds release source and ZIP hashes;
`verify-compiler-release.mjs` checks current three-language pins and the site version
metadata before publishing. Native package tests are developer-host evidence,
separate from fresh no-SDK/production acceptance.
Thai, English and Japanese editions retain the same scope. Corresponding pages
use the same path and filename in `src/content/th`, `src/content/en` and
`src/content/ja`. Planned and Deferred capabilities retain their status in all
three languages. Japanese uses the system's Japanese font fallback without
changing the Thai paragraph font or the shared IBM Plex/code families.

The updated Billing Time SQLite source is downloadable from
`src/static/downloads/billing-time-source.zip`. Getting Started keeps its simple
reader-created CLI exercise separate from this full application. The source
snapshot passed debug/release native execution and SQLite checks against the
published 0.1.0 compiler on Windows and macOS ARM64; see the
[update record](evidence/billing-refresh-2026-10-06.md).

The [English editorial review](evidence/english-editorial-review.md) records the
120 translated/replaced pages and 52 English project plans. Both build scripts
check complete Thai/English/Japanese page and search parity, shared example
hashes, localized downloads, and same-chapter language switching.

`src/themes/wbasic/` is the default theme. Its palette, typography, spacing,
component rules, local IBM Plex fonts, and syntax colors are derived from the
versioned sources in `design-system/`. WBasic fenced code blocks are highlighted
in the generated HTML; inline `code`, `kbd`, and `samp` use the same Mono-based
design language.

## Build

Windows PowerShell, from this repository root:

```powershell
./build.ps1
```

macOS or Linux, from this repository root:

```sh
./build.sh
```

Both scripts require the pinned Hugo version on `PATH`, rebuild `html/`, and run
the generated-site verifiers, including the Thai extension guide's chapter and
replaceable-screenshot contract. To use a portable Hugo binary on Windows, pass
its path with `-Hugo`. Run `node verify-source.mjs` to validate Markdown sources
and their local links.

For local authoring, run:

```sh
hugo server --source src --disableFastRender
```

Edit only `src/` by hand. Regenerate `html/` after every source change. Public
reference content describes merged, verified behavior; planned APIs remain in
the developer documents of `wbasic-language` until they are implemented and
accepted.

Every push to `main` runs `.github/workflows/pages.yml`: it verifies Markdown,
builds the pinned Hugo source, verifies the generated site, and deploys `html/`
through GitHub Pages.

## Draft lessons and library requests

Small Projects chapters 8, 13 and 73 include source-checked draft programs in
`draft.wbas.txt`; they remain outside the 29 native-verified examples. The
[draft source-check record](evidence/small-projects-drafts-source-check.json)
and [editorial review](evidence/small-projects-drafts-editorial-review.md)
state the limits. The companion library proposal and AGENTS discovery rules are
recorded in the language repository at commit `2188ca6`; all five `SWP-FR-*`
requests remain Proposed. No language implementation is included in this work.

## Versioned publication

Each publication uses a new `docs-vYYYY.MM.DD.N` version (daily sequence starting
at 1), independent of the language/compiler version. Update `src/static/version.json`,
run the pinned build, and commit the source and generated HTML. Then run:

```console
node publish-docs.mjs
```

The publisher requires a clean checkout, verifies the documentation remote and
site, creates an annotated version tag, and pushes main and that tag atomically.
It never pushes the compiler repository, unrelated branches, or other tags.
Published tags must not be moved or reused. An ordinary untagged push cannot
publish: CI requires the declared tag to identify its exact commit. A manual
workflow run is also limited to a tagged main commit.

The footer displays the version in both languages. `version.json` provides the
same identifier; CI adds `deployment.json` with the deployed commit and workflow
run. After a successful workflow, check those live files and both footers before
reporting success. Local preview builds are not evidence of deployment.

## Ownership

Copyright © 2026 Worajedt Sitthidumrong. All rights reserved.
WBasic, its language specification, compiler, and documentation are proprietary
and are not open-source software. Third-party materials retain their respective
licenses, including the bundled font licenses and credited source materials.
