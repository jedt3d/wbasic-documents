# Small WBasic Projects — draft expansion editorial review

Review status: **Passed — Thai technical review and English translation parity; no open editorial blocker**. This is an independent editorial and source-consistency review. No compiler, native runtime, Git, or publishing action was performed by this reviewer.

## Scope

- Product proposal `docs/proposals/small-projects-library-feature-requests.md` and the corresponding `AGENTS.md` addition in the Small Projects library requests worktree.
- Documents introduction/verification wording, 30 existing chapter command notes, and Thai draft chapters #08, #13 and #73 with their standalone downloads and plans.
- English translations were checked after the Thai source review passed.

## Proposal findings

The proposal keeps all five requests (`SWP-FR-01` through `SWP-FR-05`) explicitly **Proposed**, labels every API sketch as non-compilable, distinguishes calendar arithmetic from wall-clock reading and the existing TUI monotonic timer, and does not claim that audio output establishes speech support. The AGENTS addition preserves the same status boundary. The 29/47/5 roadmap counts agree with the Documents roadmap snapshot.

Milestone mapping corrections requested from and made by the coordinator:

1. `SWP-FR-02` cites M1 for generic calendar/clock work, though M1 is specifically the billing-time/WORM contract. Keep M1 only for a concrete dependency of that sample.
2. `SWP-FR-04` cites M4 for Sound Mimic, though M4 is the business browse/edit/save workflow. TUI timing is a prerequisite of the lesson, not evidence that the M4 workflow is served.
3. `SWP-FR-01` and `SWP-FR-03` cite PG-03, whose published evidence focuses on CRUD/query/projection/migration and SQL mapper work. Either show how the request serves that exact goal or omit the mapping.

## Thai chapters and source boundary

Read Thai #08, #13 and #73 in full with each `PLAN.md` and `draft.wbas.txt`. All three code fences match the corresponding download byte for byte after newline normalization. The #08 proleptic Gregorian leap/weekday arithmetic matches its 2000-02 and 2024-09 walkthroughs. The #13 blinker calculation reads the old grid and produces the stated vertical generation; outside cells are dead. The #73 validator checks 9×9 shape before indexed reads and checks rows, columns and 3×3 boxes while allowing repeated zeroes. Its `True` result means only “legal so far,” as the prose says. These are editorial/source observations, not native execution evidence.

The coordinator's `evidence/small-projects-drafts-source-check.json` records `wb check --json` accepted with no diagnostics for all three draft downloads at compiler `2614b37`; the report identifies source hashes and explicitly excludes native execution and lesson acceptance. I compared the draft text to the pages and inspected the status wording. Each page and plan now says source check passed while retaining the draft status, pending native/acceptance work and absence of `main.wbas`. The verification page distinguishes 49 plan-only chapters from these three plan-plus-draft chapters and leaves the runnable count at 29.

Editorial corrections made during review: #08's static code fence is described as showing the same text as its download, rather than dynamically pulling it; #73's compiler wording now reflects the passed source check; the verification page no longer describes all 52 plans as having no draft source. I checked all 15 existing `wb build` notes in each language: every note names the older pinned `2614b37` compiler evidence, acknowledges R8A/R8B development build with a native SDK, and withholds no-SDK distribution acceptance. The introduction and verification pages keep the same boundary. No other chapter advertises `wb build` as a current verified command for the older examples.

## English parity

Read the English #08, #13 and #73 chapters and their three `PLAN.en.md` downloads against the Thai originals. The calculation, hand traces, acceptance cases, remaining work, source-check boundary, attribution and `SWP-FR-01/02` references retain their meanings. The Game of Life lesson still separates one computed generation from a live TUI; the Sudoku lesson still separates legality from completion, solvability and uniqueness. English and Thai `basic` fences are identical to each other and to the draft downloads for all three chapters. The English introduction and verification page retain the 29 verified / 52 planned count, state that three plans include drafts, and distinguish the pinned source check from older Windows native evidence.

The authors report `node verify-source.mjs` passing for 431 Markdown files and 136 links. That command was not independently rerun by this reviewer. Translation review is editorial parity, not an additional compiler or platform gate.

Reviewer model/effort: gpt-6-sol / medium. Final build caught redundant English plan download buttons; the coordinator removed them because the shared PLAN.md shortcode already selects PLAN.en.md for English pages.
