# WBasic Extension Guide — Thai technical editorial review

## Scope

Technical editor: repository coordinator. Reviewed the Thai-first 12-chapter
**WBasic Extension Guide** against the verified R8B extension description,
command contributions, project skeleton, settings, examples catalog, and known
limitations at WBasic compiler repository revision
`1bba6f9fc1d081b7d3cc4052a93eb7774a457c33`.

The review covers installation of the development VSIX, compiler discovery,
Workspace Trust, project creation, source and manifest language features,
diagnostics, navigation and rename, local module dependencies, run/build/tasks,
Test Explorer, examples, TUI doctor, troubleshooting, and the daily workflow.
It also checks that the guide distinguishes Development Build from production
distribution and does not advertise DAP debugging, formatting, Marketplace
publication, or unverified platform acceptance.

## Editorial decisions

- Thai is the authoritative edition. An English translation is intentionally
  deferred until the user approves the Thai guide.
- `Given`, `When`, and `Then` are presented as organizing comments; assertions
  use the real `Test` API.
- There is no textual `Include` or global include path. The guide teaches direct
  local modules through `.wproj` and `*.wmod/module.toml`.
- Screenshot locations are complete teaching elements even before capture. Each
  slot names a stable PNG and explains the exact UI state to capture. Adding the
  PNG later replaces the placeholder without changing the chapter source.
- Thai prose favors short steps, explicit checkpoints, and restrained humor.
  API names, commands, settings, file names, and capability boundaries remain
  literal so readers can search for them in VS Code.

## Evidence boundary

This review validates documentation fidelity against the already verified R8B
implementation and its recorded evidence. It does not claim a new compiler or
extension native test run. The documentation build verifies all 13 guide pages
(introduction plus 12 chapters) and 10 replaceable screenshot slots in source
and generated HTML.
