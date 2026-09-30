---
title: "Terminal Lifecycle and Platform Limits"
weight: 60
---

Status: **R6 native lifecycle closed within the approved endpoint scope; positive Windows OSC52 read remains Deferred**

## Ownership and modes

`Tui.Run` acquires a terminal lease, negotiates capabilities, enters its mode, runs the loop, restores the terminal, and releases the lease in that order. A nested Run on the same terminal reports `Tui.AlreadyRunning`. Sequential sessions are possible after prior cleanup completes.

Fullscreen, inline, and static/noninteractive behavior are supported according to the endpoint. On a non-TTY, runtime reports `NotInteractive` without printing escape sequences. Restoration preserves input/output modes, code pages/termios, screen, and ownership; callback, worker, and cleanup errors retain a primary error plus `Suppressed` errors.

## Stall policy

If a host stalls ordinary output indefinitely, runtime returns a bounded error after restoring input under the approved policy and **retains terminal ownership** until the exact pending packet and ordered cleanup finish. A new session must not begin in the meantime.

Ctrl+C, suspend/resume, disconnect, and terminal child-process handoff are supported on the verified platforms. While a handed-off child runs, the parent does not paint over it; on return it performs a full redraw.

## Clipboard

- NativeLocal private clipboard tests passed on Windows.
- OSC52 read passed on the tested macOS endpoint.
- The tested Windows Terminal/conhost did not forward a positive OSC52 read reply; WBasic returns bounded `Tui.ClipboardTimeout` and correctly restores modes.
- Windows acceptance is therefore **endpoint-conditional**, not a guarantee that OSC52 read works on this endpoint or every Windows terminal.
- The ordinary desktop clipboard was not used in the isolated acceptance test.

Applications must handle Clipboard events with nullable `Text` and `Error` separately. Do not mistake failure for an empty clipboard.

## Current platform matrix

| Platform | Status |
|---|---|
| Native Windows 11 ARM64 | Compiler/runtime/TUI/R7 showcase passed in the recorded environment |
| Native macOS ARM64 | Compiler/runtime/TUI/R7 showcase passed; iTerm2 visual inspection passed |
| Linux ARM64 | No native endpoint verification yet |
| Native x86_64 | Acceptance matrix has not passed |
| Clean machine without SDK | R8 packaging gate; not ready yet |

Thus “build passed on two ARM64 hosts” is strong evidence within that scope, but not an automatic passport to every OS and terminal.
