# English editorial review — 2026-09-30

## Scope and role

Independent English editor: `gpt-6-sol / medium` (coordinator dispatch). Reviewed the 120 newly translated English Hugo pages against the Thai source edition and implementation boundaries: home/books/design identity (7), Small WBasic Projects (81 chapters plus introduction, roadmap, and verification, 84), language reference (14), standard library (8), and API reference (7). The existing ten Getting Started pages were outside this translation round. Also reviewed all 52 `PLAN.en.md` downloads.

The review read all 29 runnable lesson narratives and expected results, all 52 planned lessons' project method, acceptance check, and remaining gap, and the language, library, and API pages' behavior and status claims. For planned chapters, compared the English page's goal, method, acceptance, and gap with its English download; all 52 match, with only initial capitalization differing in the data phrase. Checked all five Missing API plans separately. The planned pages plainly say they have no runnable source, and the verification page keeps the Windows-only lesson evidence distinct from product-wide native acceptance.

## Findings and edits

- Edited English prose only in language-reference chapters 01 and 07: removed an unnatural literal translation of a Thai joke about compiler hints, and changed “object-initiation ceremony” to “object setup ceremony.” No API names, code examples, statuses, or Thai content were changed by the editor.
- The Thai roadmap initially described project 03 as using multiline strings, conflicting with language-reference chapter 02. The coordinator clarified Thai and English roadmap wording to say the bitmap stores one row per `Array Of String` member. The shared program and native evidence were unchanged.
- The Thai project 18 plan initially included a `2d6+3` acceptance case but named only an `NdM` parser. The coordinator clarified the signed modifier in Thai and English page, plan, and roadmap. No runnable source exists for this project.
- Project 65's shorter final tile line is present in the tested output. The coordinator clarified both editions that this starter pattern demonstrates repetition and does not claim a seamless rectangle; equal-width tiles remain an exercise. Program and output stayed unchanged.

No unresolved English editorial or translation-fidelity issue remained after those clarifications. The broad original-project goals in the roadmap remain distinct from deliberately reduced runnable lessons, including scripted games, fixed inputs, bounded algorithms, and simplified artwork.

## Checks and evidence boundary

- `node verify-source.mjs` — passed: 404 Markdown files, balanced fences, 133 local links.
- `node verify-english-edition.mjs` — passed: 130 paired pages, 120 translated page code/weight/prose checks, 52 English plans, 29 prior native-evidence source/output hashes, and same-chapter language switching. The check also validates generated English links and downloads, including `PLAN.en.md`.
- Manually checked the language-aware plan-download shortcode, the 52 planned acceptance cases, all 29 runnable lesson explanations and expected-output sections, and the English reference chapters' API names and Planned/Deferred boundaries.

This is an editorial/source and generated-site review. It did **not** rebuild or execute WBasic programs. The 29 Windows ARM64 native runs and compiler revision `2614b37d681631542de25ffac1d6e6b08d41fcb8` are prior evidence in `evidence/small-projects-windows.json`; their source and expected-output hashes remain unchanged. No macOS, Linux, native x86_64, or no-SDK result is claimed for these 29 lessons.
