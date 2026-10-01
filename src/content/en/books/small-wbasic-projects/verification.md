---
title: "Evidence and Edition Boundaries"
weight: 100
---

This page separates the book's status from the product's acceptance status. Adding a lesson does not turn a Planned or Deferred compiler/runtime capability into Passed.

## October 1, 2026 draft expansion

Chapters 8, 13, and 73 add `draft.wbas.txt` sketches with data, algorithms, and expected acceptance cases. They are not native execution evidence or Passed lessons. Documentation checks compare displayed drafts with their downloads and keep English code identical to Thai. The 29 native results below remain the original run using compiler `2614b37`; they do not apply to these three drafts.

Merged compiler 0.0.2 offers `wb build` for `.wproj` projects with debug/release profiles. Its experimental package includes linking tools, while fresh-machine/no-SDK acceptance remains open. The 29 lesson results remain pinned to `2614b37`; this prose update is not a rerun. See [compiler and tooling status]({{< relref "/implementation-status.md" >}}) to distinguish the installed compiler from the version that verified each lesson.

## How examples are checked

All three drafts passed `wb check --json` using compiler `2614b37`, whose hash matches the compiler in the earlier evidence: accepted true, no diagnostics, and exit code 0 for each file. This establishes source acceptance only, not linking, native execution, or the chapter's acceptance cases.

{{< project-download "_evidence" "drafts-source-check.json" >}}

The documentation repository's `verify-small-projects.mjs` checks downloadable source with `wb check --json`, emits an object, and links it with the matching static runtime. It reads the PE machine field to confirm ARM64, then executes the program and compares standard output with the author's expected result. Spaces and line order must match exactly; only system newline conventions may differ.

The check has a timeout and treats an incorrect exit code as failure. Merely creating a file is not evidence that the program works. It does not cover every value a reader might try in an exercise; those exercises need additional tests of their own.

## Platform evidence

The Thai edition's run on September 30, 2026 passed **29/29 examples**: source checks, PE machine `0xAA64`, native execution, and exact lesson stdout. An additional regression for chapter 72 confirmed that the Kelvin sign `K` remains unchanged and does not advance the ASCII case alternation.

The compiler and runtime were built together using `cargo build --workspace --locked` from source revision `2614b37d681631542de25ffac1d6e6b08d41fcb8`. The JSON evidence records hashes of the compiler, runtime, each chapter's source, and expected output for traceability.

{{< project-download "_evidence" "windows.json" >}}

That edition built with Hugo `0.167.0`. Its book validator confirmed 81 chapters, 29 source downloads, 52 plan downloads, source credits, and placement as the second book after Getting Started.

These examples were tested on Windows ARM64 with a developer toolchain. This was not a clean-machine/no-SDK distribution test. This lesson collection has not yet been run on macOS, Linux, or native x86_64; earlier product evidence does not establish those results for these lessons.

## Chapters that remain planned

Of the 52 planned chapters, 49 have only plans and three also have a `draft.wbas.txt` sketch. None has passed lesson execution gates, so all remain outside the verified-example count. Missing API lists refer to the public surface at the recorded revision. Alternatives such as a handwritten PRNG or sine lookup table need their own evidence before a chapter can become runnable.

TUI work additionally needs tests of events, terminal-mode restoration, and behavior on real hosts. A static picture printed to stdout does not verify animation, and a safe timeout does not establish a capability that remains Deferred.

## Thai editorial review

An editor separate from the authors read all 81 chapters, including the source for all 29 examples, checking APIs, agreement between prose and code, reduced scope relative to the originals, and Thai writing. Authors and editor used `gpt-6-sol / medium`; the coordinator ran the native gates separately.

That review corrected the hourglass's initial output to match its sand count, clarified the alternating-case chapter's Unicode boundary, and replaced generic placeholder caveats with project-specific limitations. Countdown moved to the group awaiting TUI verification because the available timer is sufficient for its design; it does not require a wall clock.

The user first requested completion of the Thai edition and then authorized English translation in a later round. The review linked below records the Thai edition, not an English review or a new native run.

The final Thai editorial result was **Passed, with no open issues**. The report distinguishes the editor's own checks from native results run by the coordinator.

{{< project-download "_evidence" "editorial-review.md" >}}

## English translation

The English edition preserves the shared WBasic source and expected output. Translation checks cover page coverage, code parity, links, downloads, and the generated site; translation alone does not extend the native evidence above.

An independent English editor reviewed all 120 newly translated website pages and all 52 English project plans. The final result was **Passed, with no open editorial issues**. The report records the three source clarifications made in both languages and distinguishes translation checks from the earlier native runs.

{{< project-download "_evidence" "english-editorial-review.md" >}}
