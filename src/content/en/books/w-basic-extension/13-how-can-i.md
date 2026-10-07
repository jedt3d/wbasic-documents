---
title: "13 · How can I…?"
description: "Task-based recipes for Extension 0.4.0: create, edit, navigate, test, run, and diagnose"
weight: 13
---

> **Check the version first.** Extension `0.4.0` with bundled protocol `0.2.0` is a **locally verified, unpublished candidate**. It uses the existing compiler/runtime `0.2.0`. The published private experimental pair remains Extension `0.3.0` + protocol `0.1.0` + compiler/runtime `0.2.0`. Do not expect DX01–DX10 from the `0.3.0` VSIX or treat this chapter as a candidate download link. Check the installed extension with **WBasic: About and Credits** and the selected compiler with **WBasic: Show Toolchain Status**.

We start with a small application that does not use a database; database examples stay separate. Open the Command Palette and enter the bold command name in each recipe. If Vim or another keymap takes a shortcut, use the Palette. Compiler actions require a trusted workspace and the matched `0.2.0` compiler/runtime pair.

For fuller background, read [write with language intelligence]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}}), [navigation and refactoring]({{< relref "/books/w-basic-extension/06-navigation-and-refactoring.md" >}}), and [Test Explorer]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}}) alongside these quick recipes.

## Start and inspect a project

### 1. How can I create a working project? {#how-01}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Open a trusted workspace and check the compiler with **WBasic: Show Toolchain Status**.
2. Choose **WBasic: New Project**, select an empty directory, and name it `MyFirstWBasic`.
3. Open that directory and inspect `App.wproj` and `src/Main.wbas`.

**Check:** The four project, source, and test files exist, and the manifest pins the selected compiler's toolchain version. If anything is missing, verify that the target directory was empty and the compiler is available.

**Remember:** The name must satisfy the compiler's Unicode NFC rules. The command does not overwrite existing files.

### 2. How can I choose among several projects in a workspace? {#how-02}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Open **WBasic Projects** and choose **WBasic: Refresh Projects**.
2. Use **WBasic: Select Active Project** to select the intended manifest.
3. Run **WBasic: Show Project Modules and Dependencies** to inspect its entry and modules before working.

**Check:** The view shows the project and toolchain you intended. If the manifest is absent, check the workspace folder and refresh.

**Remember:** A sole project is selected automatically. Explicit selections are remembered separately per workspace folder.

### 3. How can I add or remove a local module? {#how-03}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Select the active project and prepare a local module with its own manifest.
2. Use **WBasic: Add Local Module Dependency** and select its path. To remove it, use **WBasic: Remove Local Module Dependency**.
3. Save the manifest and run **WBasic: Check Project**.

**Check:** The Projects view matches the manifest and Check passes. If an Import becomes unresolved, restore the dependency or update the source.

**Remember:** There is no textual Include or general include path. Check Project is the authority for manifest and Import validity.

### 4. How can I inspect an example without changing my project? {#how-04}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Choose **WBasic: Open Example** to read an example.
2. To edit one, use **WBasic: Copy Example** into a new directory.
3. Select the copied project, then Check and Build before deciding to Run.

**Check:** The original project is unchanged and the copy has its own manifest. If a database example cannot run, supply a database path separate from real data.

**Remember:** WORM M2/M3 include their own modules and SQLite schema and require an explicit database path to Run. The M4 billing UI reference can be opened, but there is no ready-to-copy project.

## Write code and inspect compiler knowledge

### 5. How can I insert code with linked names? {#how-05}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Open WBasic source and enter Vim Insert mode first if you use Vim.
2. Run **WBasic: Insert Template** and choose **Local value**.
3. Use Tab to visit placeholders, edit the name and type, and inspect every linked occurrence.

**Check:** The editable template starts as `Let value As Integer = 0`; Undo restores the previous text. If Vim takes Tab, return to Insert mode and invoke the command from the Palette again.

**Remember:** Some templates link repeated names. In the tested Vim window, paste appended to the selected default even though linked occurrences changed together; inspect the final names.

### 6. How can I start a file from a template without overwriting code? {#how-06}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Create or open an empty `.wbas` file in the intended project location.
2. Run **WBasic: Insert File Template** and choose the Application or Test template for that file.
3. Edit linked placeholders, save, then Check Project or Active Source as appropriate.

**Check:** The template appears in the empty file and existing code is untouched. If the command refuses the editor, create a new empty file.

**Remember:** Choose a file template for its actual context. The command refuses a buffer that already contains code.

### 7. How can I wrap statements in If or Try/Finally? {#how-07}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Select complete statement lines, from the start of the first through the end of the last.
2. Run **WBasic: Surround With** and choose `If` or `Try/Finally`.
3. Edit the condition or cleanup, save, and run **WBasic: Check Project**.

**Check:** The wrapper encloses the selected lines and Check passes. If the selection changed or covered part of an expression, select full lines again; Undo an unwanted result.

**Remember:** The wrapper is an editable text template. It is not a compiler-proved, behavior-preserving semantic refactor.

### 8. How can I find shortcuts and resolve key conflicts? {#how-08}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Run **WBasic: Shortcut Guide** to see the current profile.
2. If wanted, set `wbasic.shortcutProfile` to `intellij`.
3. Try a shortcut in a WBasic editor. If Vim or VS Code takes it, run the action by name in the Command Palette.

**Check:** The guide shows your profile and the chosen action opens. Use the Palette or change editor mappings when a key conflicts.

**Remember:** The default `standard` profile adds no alternate bindings. `intellij` adds Shift+F6, Ctrl+B (Cmd+B on Mac), Alt+Enter, Ctrl+Alt+Shift+T (Cmd+Alt+Shift+T on Mac), and Shift+F10 in eligible WBasic editors. Vim Normal mode took Ctrl+T and Visual Line mode took Ctrl+B in the tested window.

### 9. How can I see actions for the current editor context? {#how-09}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Open source with a diagnostic or symbol of interest.
2. Place the caret and run **WBasic: Actions at Caret**.
3. Choose an offered action, inspect the edit, and Check Project again.

**Check:** The chooser offers actions based on editor, capability, and selection. VS Code can still report that an action does not apply to the symbol at the caret. If it is empty or unavailable, read Problems and check project context.

**Remember:** The chooser cannot infer a semantic repair from the caret alone.

### 10. How can I rename after reviewing the impact? {#how-10}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Save source and place the caret on an identifier in the active project.
2. Run **WBasic: Refactor This** and choose Rename, or press F2.
3. Enter the new name, inspect every file in the rename preview, then Apply.

**Check:** The preview shows compiler-resolved code edits and leaves comments and strings alone. If Rename is unavailable, inspect the capability with Toolchain Doctor and Check Project.

**Remember:** The compiler validates the proposed project snapshot before Apply. Extract Method and semantic control-flow transforms are not provided.

### 11. How can I find definitions and uses across files? {#how-11}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Open and save a source file that belongs to the active project.
2. Place the caret on a name; use F12 for Definition or Shift+F12 for References.
3. Use Peek, Hover, or Call Hierarchy to inspect context before editing.

**Check:** The declaration or reference list opens in the intended project. If it does not, Check Project and verify the file is in project inventory.

**Remember:** Hover, completion, signature help, Peek, usage highlights, and Call Hierarchy help read context. A source outside the project is checked standalone.

### 12. How can I find a symbol in a file I have not opened? {#how-12}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Open a workspace with project manifests without opening every source file.
2. Run VS Code **Go to Symbol in Workspace** from the Command Palette.
3. Search for a name such as `Amount` and choose the result from the intended project.

**Check:** VS Code opens the found declaration. If results are empty or a project is rejected, save and Check Project, then inspect the search bounds before concluding the name is absent.

**Remember:** Search is bounded to 8 roots, 16 manifests, 512 directories, 8192 entries, depth 16, and 256 results. An empty result is not proof that no symbol exists.

### 13. How can I distinguish semantic color from syntax color? {#how-13}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Open source in the active project and Check Project.
2. Place the caret on a resolved function.
3. Run **Developer: Inspect Editor Tokens and Scopes** from the Palette to examine its semantic token and the active theme.

**Check:** A resolved identity has a semantic type such as `function`. If none appears, address diagnostics or identity resolution and Check again.

**Remember:** Semantic tokens come from compiler-resolved identities. Lexical coloring still works for incomplete source; the theme chooses the visible color.

### 14. How can I check an unsaved source against the whole project? {#how-14}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. With an unsaved edit open, run **WBasic: Check Active Source** for single-file diagnostics.
2. Save the file and any relevant manifest or module changes.
3. Run **WBasic: Check Project** for the actual project context.

**Check:** Problems reflects the current source, and project Check validates Imports and dependencies. If the two results differ, compare standalone versus project context.

**Remember:** Check Active Source includes unsaved edits but has no module/import context; `_spec.wbas` uses test mode. Late stale results are discarded.

## Run, build, and test

### 15. How can I run and build the selected project? {#how-15}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Select the active project and run **WBasic: Check Project**.
2. Run **WBasic: Run Project** and read the task terminal.
3. Choose **WBasic: Build Project — Debug (Development)** or **WBasic: Build Project — Release (Development)** for the intended profile.

**Check:** The task terminal retains output and exit status. If the wrong project ran, select the correct manifest before running or building again.

**Remember:** **WBasic: Build Project (Development)** uses the default profile. These are development builds, not evidence of no-SDK distribution.

### 16. How can I run one file or try TUI/Jobs? {#how-16}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Confirm the `r6-tui-jobs-foundation` capability and run **WBasic: New TUI/Jobs Example**.
2. Choose the terminal counter or headless Jobs example and save the template as `.wbas`.
3. Open that saved file and run **WBasic: Run Active Source in Terminal**.

**Check:** A VS Code terminal shows the result and can host interactive TUI. If the command is unavailable, check Workspace Trust, compiler, and saved file path.

**Remember:** Run Active Source uses the source directory as its working directory and a real terminal. A new TUI/Jobs template starts as an unsaved document.

### 17. How can I repeat a named run with arguments? {#how-17}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

Example workspace settings:

```json
{
  "wbasic.runConfigurations": [
    { "name": "daily", "manifest": "App.wproj", "profile": "debug", "arguments": [] }
  ]
}
```

1. Add a unique name, workspace-relative manifest, profile, and argument array in workspace settings as shown.
2. Run **WBasic: Select Run Configuration** and choose `daily`.
3. Read the task terminal; when ready to repeat, run **WBasic: Run Again**.

**Check:** The new task uses the current settings for that name. If the configuration is missing, check settings. If the program writes data, inspect those effects before Run Again.

**Remember:** Run Again stores the name and rereads current settings. Arguments are literal: there is no environment or working-directory expansion or secret store. Do not put secrets there or repeat a database-writing run without reviewing its effects.

### 18. How can I use VS Code Tasks or emit an object? {#how-18}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Create a `wbasic` task with `action` and `manifest`.
2. Run it through VS Code Tasks, or use **WBasic: Emit Project Object** with an absolute output path.
3. Read the terminal for exit status and inspect the object at the chosen path.

**Check:** The chosen project task finishes according to its action. If a capability is missing, open Toolchain Doctor and correct the compiler or task.

**Remember:** Task actions are `check`, `run`, `test`, `build`, and `emit-object`; run/build accept a profile, and run accepts literal arguments.

### 19. How can I move between source and tests? {#how-19}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Save project source and tests, then Check Project.
2. Run **WBasic: Go to Test or Source**.
3. Choose a candidate in the picker and read the target file to verify the behavior it tests.

**Check:** A file from compiler inventory or native test discovery opens. If the picker is empty, check native test discovery. This is not a coverage map.

**Remember:** Read the selected test before claiming it covers the behavior you care about.

### 20. How can I add a test without accidentally getting a green result? {#how-20}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Confirm the active project has a `tests` directory.
2. Run **WBasic: New Test Scaffold** and give the case a new name.
3. Open the file, write Given/When/Then, and replace the TODO assertion with the expected behavior.

**Check:** Native discovery sees the case, and before editing it fails at `Test.Check(False, "TODO: specify expected behavior")`. A duplicate name does not overwrite an existing file.

**Remember:** Do not change False to True merely to make the result green; specify a testable expected behavior.

### 21. How can I rerun only failed tests? {#how-21}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Save source and Run Test from Test Explorer or an inline **Run Test** action to create a VS Code Testing run.
2. Read Test Results to identify failed cases. Use **WBasic: Test Project** separately when you want the whole suite in WBasic Tests output.
3. Run **Test: Rerun Failed Tests from Last Run** and compare the new result with prior history.

**Check:** The native Testing flow reruns failed cases. If no tests were discovered, fix discovery rather than counting a pass.

**Remember:** Assertion failure, runtime error, crash, timeout, and cancellation are distinct. Zero discovered tests is an error.

## Diagnose the environment and find references

### 22. How can I tell which extension and compiler are active? {#how-22}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Run **WBasic: About and Credits** for the installed extension version.
2. Run **WBasic: Show Toolchain Status** for compiler path, version, and target.
3. Compare those values with the version scope at the start of this chapter.

**Check:** You can distinguish the 0.4.0 candidate extension from compiler 0.2.0. If the compiler is unknown or missing, set an absolute `wbasic.compilerPath` and reload.

**Remember:** About does not execute the compiler and may report it as unknown. Status reports executable, version, round, target, and source; Toolchain Doctor shows individual capabilities.

### 23. How can I diagnose an unavailable tool? {#how-23}

**Version:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0.

1. Run **WBasic: Toolchain Doctor** and read its output channel.
2. Correct path, trust, or capability issues it reports, then inspect Toolchain Status again.
3. If LSP trouble remains, run **WBasic: Show Language Server Output**.

**Check:** Doctor reports the compiler query and recovery options. Query timing is not proof that the editor or runtime is fully ready.

**Remember:** Doctor times one capability query, not editor latency, a matched runtime, or a fresh no-SDK host. Verbose trace may contain source text.

### 24. How can I read the language rules and inspect a native probe? {#how-24}

**Version:** Extension 0.3.0 release + protocol 0.1.0, or 0.4.0 candidate; compiler/runtime 0.2.0.

1. Run **WBasic: Open v0.3 Specification** for the bundled offline language rules.
2. To diagnose the native toolchain, set the probe path and run **WBasic: Inspect Native Probe**.
3. To inspect terminal or font behavior, run `wb tui doctor` yourself in a terminal.

**Check:** The specification opens offline and probe/CLI results come from the tool you invoked. If the probe is missing, check `wbasic.probePath` and Workspace Trust.

**Remember:** Inspect Native Probe uses `wbasic.probePath`; Toolchain Status reports the compiler path, not the probe path. The extension does not probe the terminal automatically.

The 0.4.0 candidate passed editor/protocol suites on Windows and macOS ARM64 and installed-window actions on Windows within the product report's scope. This does not claim the same UI actions on macOS/Linux or production/no-SDK distribution. With the published 0.3.0 VSIX, use chapters 1–12 for its verified capabilities and wait for new release evidence before treating these DX recipes as downloadable.
