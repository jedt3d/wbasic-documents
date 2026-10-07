# Extension 0.4.0 How can I editorial review

## Scope and source pins

- Documentation baseline: `4f0059280b2e19baacb47a1ac7568e145a7958d5` in WBasic Documents.
- Read-only product source: `59073810ad7c713837861345c3dcdef0db91813d` in WBasic Language, including `editors/vscode/package.json`, the editor README, command implementations, and `docs/rounds/VSCode-current-compiler-DX-2026-10-06.md`.
- Reviewed the Thai Extension book overview and chapter 13 before translation, then the English and Japanese chapter 13 and cross-links. Final integrated validation remains pending below.

## Editorial and technical findings

The Thai chapter has 24 stable `how-01`–`how-24` recipes. Each identifies its Extension/protocol/compiler version, gives concrete steps, a visible checkpoint with recovery, and a bounded caveat. The one JSON settings example parses as JSON. The chapter covers all 34 command titles in the pinned Extension manifest; the separate command inventory maps every ID and title to a recipe. I compared titles to the product manifest independently and found no omission. Provider-only actions such as Workspace Symbols and semantic coloring are explained separately from manifest commands.

Review corrections applied before English/Japanese translation:

- **Toolchain status versus Doctor:** Show Toolchain Status reports selected compiler path/version/round/target/source; Doctor provides the individual capability report. Probe path is the separate `wbasic.probePath` setting.
- **Testing history:** `WBasic: Test Project` writes a suite report to WBasic Tests output. VS Code's **Test: Rerun Failed Tests from Last Run** needs a Testing run from Test Explorer or inline **Run Test**. Zero discovered tests remains an error.
- **Action chooser:** Actions at Caret filters the editor, trust/capability and selection; delegated VS Code actions determine whether a particular caret symbol supports the action. The chooser does not prove a semantic refactoring is available.
- **Usability:** Condensed repeated prose into numbered steps, checkpoints and short unique caveats. Version cues distinguish the published 0.3.0/protocol 0.1.0 pair from the unpublished 0.4.0/protocol 0.2.0 candidate, both with compiler/runtime 0.2.0.

The recipes preserve literal named-run arguments, current-setting lookup and repeated application effects; file and surround templates remain editable text rather than semantic proof. The test scaffold requires an existing `tests` directory and starts with `Test.Check(False, "TODO: specify expected behavior")`. Test/source navigation is a discovery candidate, not coverage. Cold Workspace Symbols retain the 8-root, 16-manifest, 512-directory, 8192-entry, depth-16 and 256-result limits; semantic color is restricted to compiler-resolved identities. Vim interactions are scoped to the tested Windows window. Windows installed-window results and macOS automated suites are attributed to the pinned product report, not claimed as tests rerun by this documentation review.

The English and Japanese chapters each retain all 24 anchors and version cues, exact command names, the JSON example, steps, checkpoints and limits from Thai. The Japanese How13 also names **Developer: Inspect Editor Tokens and Scopes**. The three book overviews label 0.4.0 as an unpublished candidate and leave the downloadable 0.3.0 release distinct. Chapter 12 and the Small Projects index link readers into the task recipes without promoting Planned lesson status.

## Validation status

- Thai source review: **Passed** before translation.
- English chapter technical parity: **Passed** by editorial reading.
- Japanese chapter technical parity: **Passed** by bounded editorial reading and comparison of 24 anchors/version cues, all 34 titles, JSON fence and key semantic caveats.
- First integrated build checkpoint: source validation passed for 640 files and 161 local links; Hugo 0.167 generated 448 HTML pages; Small Projects validated 81 entries (29 downloads, 52 plans); English validation passed 147 paired pages/137 checks; footer 447, Extension guide 15 pages/24 recipes/34 commands, three drafts and release identities passed. Japanese validation found an inline-token parity mismatch for `standard`. This first build was **Failed at Japanese parity**, so later checks were not reached. The translator corrected inline code formatting for `standard`, `_spec.wbas`, task action tokens and `probePath` without changing semantics.
- Repaired integrated build, reported by the documentation coordinator: **Passed, exit 0**. Source validation checked 640 Markdown files/161 local links; pinned Hugo 0.167.0 on Windows ARM64 built 448 HTML pages. Small Projects checked 81 entries/29 source downloads/52 plans. English passed 147 paired pages/137 checks; Japanese passed 147 pages/186 unchanged blocks/52 plans. Footer validation checked 447 pages against website version `docs-v2026.10.06.4`; Extension guide validation checked 15 pages, 24 recipes and 34 command titles; three draft fixtures, compiler 0.2/Extension 0.3 release identities, and Billing's ten files plus exact ZIP check also passed. The coordinator additionally inspected 24 rendered ordered recipe lists in each language, excluding the sidebar chapter list. These are documentation checks, not new product native or UI tests.
- Product native/UI tests: **Not rerun**. The 98/98 protocol checks on each ARM64 host, Windows 154 passed/one Mac-only skip and macOS 155/155 editor checks, 16/16 isolated Windows host checks, and installed Windows window actions are source-reported results at the product pin above.

No publication or package release is asserted by this review.
