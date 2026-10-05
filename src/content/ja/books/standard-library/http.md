---
title: "HTTP：同期 GET"
weight: 50
---

状態: **同期 GET は Windows と macOS の ARM64 環境で R5 の検証に合格**

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

上の URL はシグネチャを示すためのもので、成功する実行例ではありません。実際のテストでは、結果が決まっているローカルのループバックサーバーを使います。

- 通信、TLS、DNS、リダイレクトの失敗は `ErrorKind.Network` を報告します。
- `EnsureSuccess` は成功以外の状態コードを拒否します。`Http.Get` 自体は 404 などの応答を返せます。
- `Text()` は UTF-8 を厳密に復号し、不正な本文は `Conversion` を報告します。
- リダイレクト回数と応答の大きさには上限があり、超えると明示的なエラーを報告します。
- HTTP(S) のみ対応します。`file:` などの方式は `Validation` を報告します。
- 内部処理は接続を再利用しますが、このバージョンの公開 API は同期式です。

Windows は Schannel、macOS は Security Framework を使います。どちらもプラットフォームの証明書検証を利用します。TUI のコールバックから HTTP を呼ぶことは禁止されています。UI の応答を保つには `Jobs.Start` を使ってください。
