---
title: "WBasic Extension Guide"
description: "Start with the task: How can I…? and the new development experience in the Extension 0.4.0 candidate"
weight: -4
---

This book takes **WBasic in VS Code from an idea to a checked result**: start a project, find the code to change, write with templates, inspect errors, run, and return to tests. The new **Extension 0.4.0** highlights reduce steps between these tasks while keeping the compiler responsible for deciding whether a program is valid.

**Start with your question:** open [How can I…? — walk through each feature]({{< relref "/books/w-basic-extension/13-how-can-i.md" >}}), choose a task, and follow its steps and checkpoints. If you do not have a toolchain yet, begin with [the package guide]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

## 0.4.0 highlights: write, change, run, and check

| What you want to do | Tools to try |
|---|---|
| Find commands without memorizing shortcuts | Shortcut Guide with the default `standard` profile and optional `intellij` profile (DX01) |
| Choose an action for the code at the caret | Context/capability-aware Actions at Caret and Refactor This (DX02) |
| Start without retyping familiar structures | Insert Template with linked placeholders and Insert File Template in an empty editor (DX03) |
| Wrap statements, check, and undo | Surround With using If or Try/Finally, followed by Check and Undo (DX04) |
| Choose arguments and repeat a run | Select Run Configuration and Run Again, which resolves current settings again (DX05) |
| Move between source and tests | Go to Test or Source and New Test Scaffold with a deliberately failing assertion (DX06) |
| Repair a failing test and focus the next run | Testing: Rerun Failed Tests from Last Run, using native runner results and identities (DX07) |
| Find a declaration before opening its file | Workspace Symbols from compiler reports within defined search bounds (DX08) |
| Read names by their meaning | Semantic colors for compiler-resolved identities (DX09) |
| Diagnose the toolchain with useful evidence | Toolchain Doctor with capabilities and configuration recovery hints (DX10) |

Surround With is a text template that you must read and check, not a refactoring proven to preserve meaning. Run Again executes the real program again, so it can repeat effects such as database writes. We will practice with projects and test data you choose explicitly.

## Match the tools to the lesson

| Status | Extension | Protocol | Compiler/runtime |
|---|---|---|---|
| Downloadable private experimental release | 0.3.0 | 0.1.0 | 0.2.0 |
| Verified development candidate for DX01–DX10 | 0.4.0 | 0.2.0 | Existing 0.2.0 |

**0.4.0 has not been published as a release or on Marketplace** at this checkpoint. The source reference is `5907381`. Installing the release package still gives you Extension 0.3.0 and does not automatically add the new DX commands. Each How can I…? recipe identifies its required version. Before starting, check the Extensions view and **WBasic: Show Toolchain Status**. Do not change a project's toolchain pin to 0.4.0: that is the Extension version.

Chapters 1–12 teach the published foundation and label the candidate additions. The small `MyFirstWBasic` project provides a running example, with steps and checkpoints. Once familiar, use How can I…? to return directly to a task.

## Evidence behind the steps

The candidate passed 98/98 protocol checks on both Windows and macOS ARM64. Editor checks passed 154 cases with one Mac-alias case skipped on Windows; macOS passed 155/155. The repaired isolated Windows host passed 16/16. Recorded DX actions passed in the installed Windows window, including Vim interactions, Check/Undo, failed-test rerun, and navigation with an unowned Template open. See the [task evidence and boundaries](https://github.com/jedt3d/wbasic-language/blob/5907381/docs/rounds/VSCode-current-compiler-DX-2026-10-06.md).

These UI results do not establish real-window acceptance on macOS or Linux, fresh no-SDK host acceptance, or production distribution. Release 0.3.0 retains its own E01–E10 evidence; adding candidate lessons does not retroactively change those results.
