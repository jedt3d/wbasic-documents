---
title: "HTTP"
weight: 50
---

Status: **Synchronous GET passed R5 on Windows/macOS ARM64**

```basic
Import Http

Http.Get(url As String) As Http.Response
response.StatusCode As Integer
response.Text() As String
response.EnsureSuccess()
```

```basic
Let response As Http.Response = Http.Get("https://example.invalid/data")
response.EnsureSuccess()
PrintLn(response.Text())
```

The URL above illustrates the signature; it is not a runnable success fixture. Real tests use a deterministic loopback server.

- Transport, TLS, DNS, and redirect failures report `ErrorKind.Network`.
- `EnsureSuccess` rejects non-success status; `Http.Get` itself can return a response such as 404.
- `Text()` strictly decodes UTF-8 and reports `Conversion` for an invalid body.
- Redirects and response size are bounded; exceeding a limit reports an explicit error.
- Only HTTP(S) is supported; a scheme such as `file:` reports `Validation`.
- The engine pools connections, but this version's public API is synchronous.

Windows uses Schannel, and macOS uses Security Framework. Both validate certificates through their platform. Calling HTTP in a TUI callback is prohibited; use `Jobs.Start` to keep the UI responsive.
