---
title: "5 · SQLite に保存するモデル"
description: "データベース版 Billing Time の構造体、Null、マッピングを読みます。"
weight: 5
---

第1～4章では、読者自身が作る小さなプログラムを使いました。ここからは、独自の `Billing` モジュールとスキーマを持つ、別の[ダウンロード可能な SQLite 版 Billing Time アプリ](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip)を読みます。このソース一式はコンパイラの Git タグに含まれる例ではありません。

[Models.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Models.wbas) は、`Customer`、`Project`、`ServiceType`、`TimeEntry`、`Invoice`、`InvoiceLine` の6つの `Structure` を定義します。`DraftInvoice` は請求処理の結果をまとめます。モデルの一例を見ましょう。

```basic
Public Structure TimeEntry
  Id As Integer
  Version As Integer
  ProjectId As Integer
  ServiceTypeId As Integer
  WorkDate As String
  Minutes As Integer
  Note As String
  RateCentsPerHour As Integer
  InvoiceId As Integer?
EndStructure
```

`InvoiceId` は `Integer?` なので、未請求の項目には `Null` を保持できます。`RateCentsPerHour` は作業を記録した時点の料金を保存します。後からサービス料金を変更しても、過去の記録は変わりません。行の `Version` は更新の競合を検出します。マッピングは [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) で定義します。

```basic
Procedure TimeMap() As Worm.Mapping Of TimeEntry
  Return Worm.Mapping(Of TimeEntry)("billing.time_entry", 1, "time_entries", "Id", "Version")
EndProcedure
```

ここでの `1` はマッピング定義の版番号で、行の `Version` とは別です。コンパイラ 0.1.0 は、一つのプログラム内で同じ `modelId` と版番号の定義が矛盾すると WB301 を報告します。ただし、既存のデータベースのスキーマとマッピングを自動で照合しません。移行はアプリが管理します。

次へ: [スキーマと移行]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}})。
