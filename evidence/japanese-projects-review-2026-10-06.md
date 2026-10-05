# Japanese edition independent review — Small Projects and site wiring

Scope: Japanese Small Projects chapters 44–81, book index, roadmap, verification page, their planned download documents, and Japanese Hugo/UI/search/download wiring. English content was the comparison source. This review made no content changes and did not build or publish the site.

## Findings and resolution

1. **Resolved — Japanese plan download wording.** The roadmap now says its planned pages download `PLAN.ja.md` (`src/content/ja/books/small-wbasic-projects/project-roadmap.md:101`), matching the Japanese `project-download` shortcode (`src/themes/wbasic/layouts/shortcodes/project-download.html:4`).
2. **Resolved — Japanese documentary verification scope.** The verification page now says Japanese pages share the same code and expected output and that translation checks cover every chapter's code blocks and download references (`src/content/ja/books/small-wbasic-projects/verification.md:10`). It still correctly attributes the 29 native runs to the earlier pinned compiler and excludes the three drafts.
3. **Resolved for the requested status/prose guard.** `verify-japanese-edition.mjs:24–30` checks long prose paragraphs in pages and plans for Japanese text; lines 83–89 compare every one of the 81 Japanese roadmap status cells with English and require the exact 29/47/5 distribution. The guard also retains 52-plan and generated download checks. This is a regression guard, not an automated judgment of every sentence's translation quality; the independent source review below supplies separate semantic sampling and status checks.

No actionable issue remains in this bounded review. The coordinator received the original findings before correcting them.

## Checks performed

- All 38 English chapters numbered 44–81 have a Japanese counterpart with the same physical line count, frontmatter weight, shortcode arguments, source URLs, and inline code/API tokens. All 33 fenced source/output blocks in these chapters match byte for byte after CRLF-to-LF normalization. Japanese titles, descriptions, headings, and non-code paragraphs were checked for English-only leftovers; none were found.
- All 22 `PLAN.en.md` files for chapters 44–81 have `PLAN.ja.md`, Japanese prose, Al Sweigart attribution, and identical original-idea URLs. No untranslated English labels or English-only plan lines were found. Automated plan flags retained every English mention of `Missing API`, `draft.wbas.txt`, missing `main.wbas`, and PRNG in the corresponding Japanese plan. Critical cases involving random-number gaps, TUI timing, absent trigonometry, sound/TTS APIs, and the Sudoku draft were read against English; their Planned/Missing API/source-check-only boundaries were retained.
- The Japanese roadmap has 81 project rows and exactly the English per-row status mapping: 29 `Core language` → `言語の基本機能`, 47 `Verification needed` → `検証待ち`, and 5 `Missing API` → `不足しているAPI`. Its 29 native / 52 planned counts agree with the English book. The index and verification page preserve their 44/101/60 physical-line counts respectively, source URLs, shortcode references, and inline API identifiers.
- Japanese Hugo configuration declares `ja-JP`, a Japanese content directory, and a localized site title. The header chooses same-page translations; the project download shortcode selects `PLAN.ja.md`; localized search UI strings and the same-language search-index request are present. The checker compares generated routes, switcher destinations, search coverage, plan downloads, and code blocks after a build.

## Imported final build evidence

The coordinator ran the final build; this reviewer did not rerun it. I read `.artifacts/billing-ja-build-final.log` (SHA-256 `d6699d9673de3c80aea7682d972b73e85f8784b4dbce7b7c3dd1685721bfab47`). Its completed output reports 445 generated HTML pages, 146 Japanese pages, 184 unchanged code/output blocks, 52 translated plans, same-chapter TH/EN/JA navigation and search coverage, all three language selectors, and all ten Billing Time snapshot source/config files matching the recorded native evidence. `evidence/billing-time-snapshot-2026-10-06.json` records Windows and macOS ARM64 debug/release results for that separate Billing Time snapshot. These imported results do not mean this review performed a native run or certify fresh no-SDK distribution.

## Separate self-review of my authored lanes

For Small Projects 01–43, 43/43 chapters and 30/30 available Japanese plan files were present. Frontmatter keys/weights, shortcodes, original URLs and fenced code matched English; no English-only non-code prose remained. For Language Reference, 14/14 pages were present; all 60 fenced blocks, weights, shortcodes, URLs, physical-line counts, and English inline API tokens were retained. This is a source comparison, not a native WBasic run or a Japanese site build.
