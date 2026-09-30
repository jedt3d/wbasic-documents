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
API surface through the current R7 implementation. English has a navigable
placeholder and will be translated only after the Thai source is approved.
When translation begins, corresponding pages use the same path and file name
in `src/content/th` and `src/content/en`.

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
the generated-site verifier. To use a portable Hugo binary on Windows, pass its
path with `-Hugo`. Run `node verify-source.mjs` to validate Markdown sources and
their local links.

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
