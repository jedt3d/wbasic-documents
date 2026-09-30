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
API surface through the current R7 implementation. The English edition translates
the reviewed Thai reference, design guide, and Small Wbasic Projects, alongside
the existing bilingual Getting Started. The bilingual **WBasic Extension Guide**
documents the verified R8B development preview after approval of its authoritative
Thai text. Corresponding pages use the same path and file name in `src/content/th`
and `src/content/en`. Planned and Deferred capabilities retain their status in
both languages.

The [English editorial review](evidence/english-editorial-review.md) records the
120 translated/replaced pages and 52 English project plans. Both build scripts
check complete Thai/English page and search parity, shared example hashes,
localized downloads, and same-chapter language switching.

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
