---
title: "Jobs：バックグラウンド処理"
weight: 40
---

状態: **R6 で Jobs の基盤が検証済み。進捗値と実例は R7 で検証済み**

## ジョブを開始する

```basic
Jobs.Start(Of M, I, O)(
  context As Tui.Context Of M,
  key As String,
  input As I,
  work As Procedure(input As I, job As Jobs.Context) As O,
  done As Procedure(ByRef model As M, id As Jobs.Id, output As O,
                    context As Tui.Context Of M),
  failed As Procedure(ByRef model As M, id As Jobs.Id, error As Error,
                      context As Tui.Context Of M),
  progress As Procedure(ByRef model As M, id As Jobs.Id,
                        value As Jobs.Progress,
                        context As Tui.Context Of M)
) As Jobs.Id
```

スレッドをまたぐ前に、入力値と出力値は値の意味論とコピーオンライトに従ってスナップショット化されます。転送できないリソースのハンドルや不透明な TUI 値は、該当するフィールドのパスを示してコンパイラが拒否します。

```basic
Procedure Work(input As Integer, job As Jobs.Context) As String
  job.CheckCancelled()
  job.Report(Jobs.Progress(Completed := 1, Total := 1,
                           Message := "เสร็จแล้ว"))
  Return input.ToString()
EndProcedure
```

`Jobs.Context` は `IsCancellationRequested`、`CheckCancelled()`、`Delay(...)`、`Report(progress)` を提供します。`Jobs.Progress` は `Completed`、Null を許容する `Total`、`Message` を公開します。

## キュー、世代、キャンセル

- キューとデータの大きさには上限があり、満杯なら `Jobs.QueueFull` または `PayloadLimit` を報告します。
- 進捗報告が大量に発生しても、上限内にまとめられます。ただし、ジョブの終了結果は失われません。
- キーと世代により、古い結果が新しい要求を上書きするのを防ぎます。セッション終了後にコールバックは呼ばれません。
- `context.CancelJob(id)` は協調的なキャンセルを要求します。
- File・HTTP・SQLite の待機には、キャンセルを有限時間で伝える仕組みがあります。ただし、コミット済みの副作用は巻き戻せません。Jobs にタイムマシンはありません。
- キャンセルに協力しないワーカーは `ShutdownTimeout` に至ることがあります。ランタイムは猶予期間を待つ前に端末を復元し、所有権が安全な状態になるまで次のセッションを開始しません。

このバージョンでは TUI が `Jobs` を所有します。汎用の画面なしジョブスケジューラー API ではありません。
