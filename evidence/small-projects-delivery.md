# Small Wbasic Projects — Thai documentation delivery

Date: 2026-09-30 (Asia/Bangkok). Scope: documentation only, explicitly requested by the user. Thai edition and editorial review now; English deferred at the user's choice. No compiler/runtime changes, product acceptance promotion, push or release.

## Result

- Second ebook after Getting Started, with original Thai explanations and WBasic examples inspired by Al Sweigart's The Big Book of Small Python Projects. Introduction thanks the author and links directly to https://inventwithpython.com/bigbookpython/; each project also links to its original chapter.
- 81 numbered project pages: 29 scoped runnable teaching adaptations and 52 explicit placeholders with standalone plans. The latter comprise 47 needing implementation/verification and 5 depending on absent public APIs; these are not 52 claims of language impossibility.
- Every project opens with a download. Runnable chapters embed their canonical downloadable source through a shortcode. Placeholders download PLAN.md and explicitly say no runnable source exists yet.
- Product compiler source: `2614b37d681631542de25ffac1d6e6b08d41fcb8`. Documentation branch begins at `06066d9`; the concurrent Getting Started card-order fix `a9d3b90` was integrated before this book's commit. The coordinator owns integration; author/editor agents made no Git mutations.

## Evidence and checks

- `cargo build --workspace --locked` rebuilt the matching compiler/runtime pair on Windows ARM64.
- `node verify-small-projects.mjs <compiler-checkout>`: 29/29 accepted by source checker, emitted/linked as ARM64 PE machine 0xAA64, executed successfully, and matched independently authored stdout. A focused #72 Kelvin-sign boundary regression also passed. Source/compiler/runtime hashes are in [native evidence](small-projects-windows.json).
- `node verify-source.mjs`: passed UTF-8, fences and local-source links.
- Pinned Hugo 0.167.0 via `build.ps1`: passed; `verify-site.mjs` checked the generated site.
- `node verify-small-projects-site.mjs`: passed 81 numbered chapters, 29 source/52 PLAN links, matching generated downloads, attribution and second-book ordering.
- Browser inspection: introduction, Thai typography, navigation order and a runnable chapter's top download inspected. Downloaded #49 main.wbas matched canonical source SHA-256.
- Exact bitmap/seven-segment output intentionally contains right-edge spaces. Six scoped `.gitattributes` entries preserve those spaces without loosening native output equality or global whitespace checks.
- [Independent editorial report](small-projects-editorial-review.md): all 81 chapters reviewed, no open blockers. Actual author/editor dispatch model: gpt-6-sol, medium. The editor observed coordinator test evidence and did not claim separate native runs.

## Findings fixed

The native comparison and editor independently caught a missing grain in #36's printed expected initial state; the expected output was corrected after checking conservation of three grains. #72's original case-conversion membership test admitted the Kelvin sign despite its ASCII scope; direct ASCII membership and a native regression fixed that. Placeholder boilerplate and ambiguous random API claims were removed. #14 was reclassified from missing API to TUI verification because a relative countdown does not require wall-clock access. Clock, audio, speech and mathematical lookup-table alternatives now state their actual limits.

## Boundaries

The new examples were not run on macOS, Linux or native x86_64 in this documentation batch. Developer-toolchain success does not establish clean-machine/no-SDK distribution. Replay games, fixed-input lessons and static output explicitly state what they omit. English translation and the 52 planned implementations are not complete. No public deployment was performed by this task.
