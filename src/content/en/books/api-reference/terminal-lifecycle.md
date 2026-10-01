---
title: "Terminal Lifecycle and Platform Limits"
weight: 60
---

Status: **R6 native lifecycle and positive Windows OSC52 read passed within the tested endpoint scope**

## Ownership and modes

`Tui.Run` acquires a terminal lease, negotiates capabilities, enters its mode, runs the loop, restores the terminal, and releases the lease in that order. A nested Run on the same terminal reports `Tui.AlreadyRunning`. Sequential sessions are possible after prior cleanup completes.

Fullscreen, inline, and static/noninteractive behavior are supported according to the endpoint. On a non-TTY, runtime reports `NotInteractive` without printing escape sequences. Restoration preserves input/output modes, code pages/termios, screen, and ownership; callback, worker, and cleanup errors retain a primary error plus `Suppressed` errors.

## Stall policy

If a host stalls ordinary output indefinitely, runtime returns a bounded error after restoring input under the approved policy and **retains terminal ownership** until the exact pending packet and ordered cleanup finish. A new session must not begin in the meantime.

In the exceptional Windows case where the host blocks input restoration itself,
a bounded error may return with input and output cleanup pending. Ownership stays
held until all cleanup finishes. During a clipboard output stall, runtime leaves
native input in the OS FIFO to avoid an OS read that could also block; event
delivery can be delayed. A bounded return does not mean full terminal restoration,
and mouse replay across exceptional shutdown is not guaranteed.

Ctrl+C, suspend/resume, disconnect, and terminal child-process handoff are supported on the verified platforms. While a handed-off child runs, the parent does not paint over it; on return it performs a full redraw.

## Clipboard

- NativeLocal private clipboard tests passed on Windows.
- OSC52 read passed on the tested macOS endpoint.
- A pinned isolated Microsoft ConPTY `1.24.260710001` passed a real query with Unicode and empty replies, distinct malformed/timeout errors, and mode restoration. The older inbox/default host did not forward a positive reply; WBasic returned bounded `Tui.ClipboardTimeout` and restored modes there.
- Windows evidence is **scoped to the tested endpoint**; these tests do not establish forwarding on every terminal or desktop clipboard-manager policy.
- The ordinary desktop clipboard was not used in the isolated acceptance test.

Applications must handle Clipboard events with nullable `Text` and `Error` separately. Do not mistake failure for an empty clipboard.

## Current platform matrix

| Platform | Status |
|---|---|
| Native Windows 11 ARM64 | Compiler/runtime/TUI/R7 showcase passed in the recorded environment |
| Native macOS ARM64 | Compiler/runtime/TUI/R7 showcase passed; iTerm2 visual inspection passed |
| Linux ARM64 | No native endpoint verification yet |
| Native x86_64 | Acceptance matrix has not passed |
| Fresh host without SDK | Private `0.0.2` ZIP passed extracted developer-host checks; independent fresh-host acceptance remains open |

Thus “build passed on two ARM64 hosts” is strong evidence within that scope, but not an automatic passport to every OS and terminal.
