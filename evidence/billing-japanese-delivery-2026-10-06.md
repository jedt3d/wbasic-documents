# Billing Time refresh and Japanese edition — 2026-10-06

The user requested rereading the updated local Billing Time application,
updating the Thai and English website content, and translating all current
documents into Japanese. This checkpoint covers the current website and its
downloadable project plans. Historical `archived/` manuscripts remain unchanged.
The base is `586b0002` on `feature/billing-refresh-japanese-edition`.

## Delivered content

- Thai/English Getting Started chapters 5–9 describe the updated SQLite application,
  its actual manifest, default or explicit database path, explicit migration,
  saved rates, integer cents, transaction limits and repeat append behavior.
  Chapters 1–4 retain their separate reader-created CLI exercise.
- A deterministic source ZIP contains ten source/configuration files, including
  the original portable VS Code tasks. Text is normalized to LF; original files
  are untouched. No generated executable or database is published. The original
  README/QuickStart also discuss the author's local EXE; the book explicitly
  distinguishes that delivery from this source-only download.
- All 146 current pages and 52 downloadable plans have Japanese translations.
  All 184 fenced code/output blocks remain identical to their English counterparts.
  UI labels, search, screenshot placeholders and same-chapter language switching
  support Thai, English and Japanese. Japanese uses system font fallback;
  Thai paragraphs retain IBM Plex Sans Thai Looped.
- `AGENTS.md`, build scripts and the publisher maintain all three editions.
  The new verification guards preserve metadata keys, API tokens, source blocks,
  downloads, per-project acceptance states and the Billing source inventory.

## Measured verification

| Check | Result |
|---|---|
| Source UTF-8, fences and local links | 637 Markdown files, 161 links Passed |
| Pinned Hugo 0.167.0 and complete build gates | 445 generated HTML files Passed |
| Japanese edition | 146 pages, 184 unchanged blocks, 52 plans Passed |
| Search | 137 indexed pages in each language, corresponding routes Passed |
| Same-chapter language switching | TH/EN/JA selectors on all current pages Passed |
| Release/guide checks | 444 version/copyright footers; 14 guide pages and 10 screenshot slots per language Passed |
| Existing examples | Original 29 native-evidence hashes retained; 52 Planned lessons and three drafts not promoted |
| Roadmap | Exact 81 per-row states: 29 core / 47 verification needed / 5 missing API |
| Billing Windows ARM64 | Published 0.1.0: debug/release PE ARM64, SQLite contents, 18,000 cents, repeat invoice #2, argument rejection and both Run routes Passed |
| Billing macOS ARM64 | Same published source: debug/release Mach-O ARM64 and the same checks Passed |
| Snapshot integrity | Ten expanded files and source ZIP match the recorded hashes; no generated binaries |
| Negative controls | Missing page, altered code, renamed metadata key, untranslated English paragraph and promoted roadmap row rejected at the expected guard |
| Browser | Japanese search for `請求`, chapter navigation and JA→TH same-chapter switch Passed; Japanese glyphs visible in captured preview |

Native verification uses the sealed published compiler/runtime 0.1.0 at
`3901cf17ce971dd0c7f591b424d73b086610fc46`, not the example README's separate
local compiler-source claim `dfdcbdc`. See [snapshot evidence](billing-time-snapshot-2026-10-06.json)
and [content comparison](billing-refresh-2026-10-06.md).

Initial checks caught untranslated headings, accidentally translated frontmatter
keys during an editorial attempt, a stale download filename and the Thai rate
capture title. These were corrected before acceptance. The first Mac SSH attempt
appended CR to a path and failed before compiler execution. Two isolated negative
control attempts had fixture newline/target mistakes; corrected controls Passed.
Their earlier failures remain in ignored local artifacts rather than being counted
as passing product tests.

## Editorial and coordination evidence

Bounded authoring and review agents used `gpt-6-sol` / `medium`; coordinator
settings are inherited / not independently verified. Agents did not perform Git
mutations or edit shared governance files. Separate source lanes avoided concurrent
file ownership. [Thai/Japanese technical review](japanese-edition-review-2026-10-06.md)
and [independent Small Projects review](japanese-projects-review-2026-10-06.md)
report no remaining actionable findings in their reviewed scopes. Source checks
are not a claim of exhaustive literary proofreading or a second native execution
by the reviewers.

## Publication identity and limits

The documentation publication is `docs-v2026.10.06.1`. Its exact publishing SHA
and successful deployment are recorded by the annotated tag, GitHub Pages Action
and live `deployment.json`. The coordinator verifies the live metadata and all
three edition footers after publication.

Compiler/runtime remains 0.1.0; Extension 0.2.1 and protocol 0.0.2 keep independent
versions. Published compiler tags/assets, the original dirty compiler checkout
and the local Billing sources are unchanged. No new compiler capability, full
v0.3 acceptance, fresh no-SDK acceptance, production readiness, Linux/x86_64
execution, Marketplace or signing claim is made by this documentation update.
