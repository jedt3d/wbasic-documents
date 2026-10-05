---
title: "実験的 WORM SQLite"
weight: 80
---

**状態:** WBasic `0.0.2` で提供する範囲限定の API です。[記録された証拠](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/evidence/worm-m5-m7-2026-10-02.json)では、Windows と macOS の ARM64 環境で M5 までのネイティブ検証に合格しています。検証済みのプロバイダーは SQLite だけです。汎用 ORM API でも、本番運用の受け入れ結果でもありません。

## マッピングと書き込み意図

`Worm.OpenSqlite(path As String) As Worm.Database` はデータベースを開きますが、アプリのスキーマ作成や移行は行いません。`Worm.Mapping(Of T)(modelId As String, version As Integer, table As String, key As String, versionField As String)` は、公開された平坦な `Structure` をテーブルに対応付けます。完全修飾されたモデル ID、版番号、テーブル名、キーとバージョンの列名はリテラルで指定します。対応するフィールドは `Integer`、`Byte`、`Boolean`、`Float`、`String` と、それぞれの Null 許容型です。メタデータの上限はフィールド 256 個、行 100,000 件、パラメーター 999 個です。

一つのプログラムに含まれるすべてのソースモジュールで、同じ `(modelId, version)` は同じ Structure、フィールド構成、テーブル、キーとバージョンの方針を示さなければなりません。同一の宣言は繰り返せますが、矛盾するとデータベース I/O の **前に**、モデル ID のリテラル位置で `WB301` を報告します。マッピングの版を上げても、既存スキーマの検証やデータ移行は行いません。マッピングの版番号と、行の楽観的な競合検出に使う `Version` は別です。

`Worm.NewChanges(Of T)()` は、すべてのフィールドを省略した要求を作ります。`Worm.Set(Of T)(changes, "Field", value)` は新しい要求を返すので、返り値を保持してください。コンパイラはリテラルのフィールド名と型を検査します。挿入時に省略したフィールドはデータベースの既定値を使います。明示的な `Null` は、Null を許容するフィールドにだけ SQL NULL を書き込みます。`Structure` の既定値や `String?` だけでは、書き込み意図を表せません。

## クエリとトランザクション

`Worm.Select(Of T)()` は I/O を行わず、クエリの記述を作ります。`Equal`、`GreaterThan`、`IsNull`、`IsNotNull`、`OrderBy`、`Limit` は、検査されるリテラルのフィールド名と束縛値を追加します。`Worm.All` はクエリを実行して完全なモデルを返し、`Worm.Project` は別の射影用 Structure を返します。`Worm.RawAll` は同じトランザクション内で値を束縛した SQL を実行し、結果の列名、順序、単純型を検査します。

`db.BeginTransaction()` は SQLite の DEFERRED トランザクションを開始し、最初の書き込みで書き込みロックを取得します。通常の下書き編集と業務ルールの確認を先に済ませてから開き、一つの `Worm.Transaction` をすべての保存手順に渡してください。`Worm.Insert`、`InsertReturning`、`Update` はそのトランザクション内で実行します。`InsertReturning` は実際に生成された値を返しますが、`Commit()` が成功するまでは永続化の証明になりません。コミットせず `Using` を抜けるとロールバックを試みます。暗黙のコミットはありません。

`Worm.Update(tx, mapping, changes, key, expectedVersion)` は版を原子的に確認して増やします。一致する行がなければ `Worm.Conflict` を報告し、トランザクションは `Failed` となってコミットできません。`Busy` は別の状態です。再試行を判断する前に新しいトランザクションで読み直してください。コミットが明確に拒否された状態は `Failed`、送信したコミットの結果が不確かな状態は `Unknown` です。ロールバックを断定したり、書き込みを無条件に再試行したりしないでください。終了前の `tx.State()` は `Active`、`Failed`、`Committed`、`RolledBack`、`Unknown` のいずれかを返します。終了後はすべての別名が `Worm.ResourceClosed` を報告します。

WORM のデータベースとトランザクションのハンドルはリソースであり、Jobs の境界を越えられません。ワーカー内で開閉し、UI からは通常の下書き・要求・結果の値を渡せます。R5 の `Sqlite.Connection` は、同じデータベースファイルを使う場合でも別のリソースです。この版には、リレーション、セーブポイント、移行 API、PostgreSQL と MariaDB、永続的なスキーマ ID の検査はありません。[コンパイラのメタデータ](https://github.com/jedt3d/wbasic-language/blob/143be58/crates/wb-compiler/src/worm_metadata.rs)と[実行可能な例](https://github.com/jedt3d/wbasic-language/tree/143be58/examples/worm)も参照してください。
