---
title: "07 · シーザー暗号の鍵をすべて試す"
description: "26個の鍵すべてで復号し、意味のある文を読み手が見つける"
weight: 7
---

{{< project-download "07-caesar-hacker" >}}

## 目的と範囲

シーザー暗号の鍵が分からなくても、当てずっぽうに選ぶ必要はありません。A–Zには異なるずらし方が26通りしかないため、鍵0から25まで試せます。この章では前のプロジェクトの固定暗号文`PHHW DW QRRQ!`を使い、人間が判断できるようすべての候補を表示します。言語を自動判定するわけではありません。ここでいう「ハッキング」は、小さな鍵の空間を総当たりすることです。

## 準備と実行

`main.wbas`をダウンロードし、そのフォルダーで端末を開きます。開発用マシンで、対応するネイティブSDKとランタイムとともに`wb`を使います。

```console
wb check main.wbas --json
wb run main.wbas
```

`run`は実行前にコンパイルとリンクを行います。ツールを自分でビルドした場合は、まず製品リポジトリのルートで`cargo build --workspace --locked`を実行します。記録済みの例ではコンパイラ`2614b37`を使用しています。統合済みのコンパイラ0.0.2の`wb build`はデバッグ／リリース構成の`.wproj`プロジェクト向けであり、単独の`.wbas`ファイル向けではありません。実験用パッケージにはリンク用ツールが含まれます。SDKのない新しいマシンでの受け入れは未完了です。プログラムは鍵の順に26行出力します。

```text
key 0: PHHW DW QRRQ!
key 1: OGGV CV PQQP!
key 2: NFFU BU OPPO!
key 3: MEET AT NOON!
key 4: LDDS ZS MNNM!
key 5: KCCR YR LMML!
key 6: JBBQ XQ KLLK!
key 7: IAAP WP JKKJ!
key 8: HZZO VO IJJI!
key 9: GYYN UN HIIH!
key 10: FXXM TM GHHG!
key 11: EWWL SL FGGF!
key 12: DVVK RK EFFE!
key 13: CUUJ QJ DEED!
key 14: BTTI PI CDDC!
key 15: ASSH OH BCCB!
key 16: ZRRG NG ABBA!
key 17: YQQF MF ZAAZ!
key 18: XPPE LE YZZY!
key 19: WOOD KD XYYX!
key 20: VNNC JC WXXW!
key 21: UMMB IB VWWV!
key 22: TLLA HA UVVU!
key 23: SKKZ GZ TUUT!
key 24: RJJY FY STTS!
key 25: QIIX EX RSSR!
```

上の各行は、単語に見えない候補も含めて、すべて期待される出力です。

{{< project-source "07-caesar-hacker" >}}

## 1つの鍵からすべての鍵へ

`Decode`は`alphabet`で文字を探し、`(position + 26 - key) Mod 26`を選びます。最初に26を足すと、許可された鍵について剰余の入力が負になりません。空白と句読点はそのまま通します。`For key = 0 To 25`が同じ関数をすべてのずらし方で呼び、この鍵の空間を漏れなく調べます。

プログラム自身は鍵3が正しいと「知っている」わけではありません。英語の文を読み手が認識します。暗号文が短すぎるともっともらしい候補が複数生じることがあり、別の言語やアルゴリズムでは候補がないこともあります。ここで総当たりが実用的なのは鍵が26個だけだからです。ほかの暗号方式にも総当たりが通用するという意味ではありません。

## 次に試すこと

1. 暗号文を`ABC`に替え、26個の候補の模様を見てみましょう。
2. `MEET`を含む候補だけを表示しましょう。この絞り込みは言語について事前知識を使うことにも注意してください。
3. 鍵0と25を比較し、アルファベットの折り返しを説明しましょう。

全鍵を試す着想は、Al Sweigartによる[『Big Book of Small Python Projects』のプロジェクト7「Caesar Hacker」](https://inventwithpython.com/bigbookpython/project7.html)から得ました。WBasicのコードと説明は新たに作成しました。
