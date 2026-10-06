---
title: "モジュール、パッケージ、可視性"
description: ".wproj/.wmodの構成、名前空間、Import、Public/Internal/Privateの範囲"
weight: 12
---

WBasicはディレクトリをパッケージの単位にします。`.wmod`はソースの読み込みファイルではありません。ファイルを連結して順序がうまくいくことに期待せず、コンパイラが実際の依存関係を把握できます。

## プロジェクトの構成

```text
App.wproj
src/Main.wbas
modules/Acme.wmod/module.toml
modules/Acme.wmod/src/Math/Total.wbas
```

このマニフェストはコンパイラ／ランタイム0.2.0を対象とします。プロジェクトとモジュールの`toolchain`
指定は、CLIとエディターが選ぶコンパイラに一致しなければなりません。

```toml
[project]
name = "Example"
module = "App"
entry = "src/Main.wbas"
toolchain = "0.2.0"

[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

プロジェクトのソースでは、ルートとパスに一致するモジュールを宣言します。

```basic
Module App
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

依存先のソースは次のようになります。

```basic
Module Acme.Math

Public Procedure Total(value As Integer) As Integer
  Return value + 12
EndProcedure
```

名前空間の名前はマニフェストのルートと`src`以下のディレクトリから決まり、ファイル名は名前空間に加わりません。Importは宣言より前に置き、テキストをそのまま挿入するものではありません。別名は修飾名を短くしますが、すべてのメンバーをローカルの名前空間に持ち込むものではありません。

## 3つの可視性レベル

- `Public`：インポートするパッケージからアクセスできます。
- `Internal`：同じ`.wmod`またはメインプロジェクト内のすべての名前空間からアクセスできます。
- `Private`：既定値です。複数ファイルにまたがっても、まったく同じモジュール名前空間からだけアクセスできます。

したがって`Acme.Data`の`Private`は、名前が近くても`Acme.Data.Migrations`からはアクセスできません。両方が同じパッケージ識別子を共有する場合は`Internal`を使えます。名前空間の接頭辞が一致しても、パッケージをまたぐアクセス権は得られません。

可視性はProcedures、Structures、Enums、Flags、Consts、付属手続きに適用されます。継承がないので`Protected`はありません。PublicのシグネチャはInternalまたはPrivateの型を公開できず、InternalのシグネチャはPrivateの型を公開できません。

Importの別名や生成されたJSONマッパーはアクセス権を広げません。モジュール依存の循環はコンパイルエラーです。大文字・小文字を区別しないファイルシステムでも、モジュール名の綴りと大文字・小文字はパスと一致しなければなりません。

## コンパイル時のプラットフォーム分岐

```basic
CompileIf Compiler.OS = OS.Windows Then
  Import WindowsTools
Else
  Import PosixTools
EndCompileIf
```

`Compiler.OS`、`Compiler.Arch`、`Compiler.Debug`はコンパイル時定数です。コンパイラは未使用の分岐内の名前を解決する前に分岐を選ぶので、別のOS向けのImportを隠せます。ただし両方の分岐で区切り記号の対応は必要です。通常の`If`では両分岐の型検査が必要なので、同じことはできません。

`Module`のない単独の`.wbas`はApp名前空間を使えますが、ローカルの`.wmod`には`.wproj`が必要です。コンパイラは作業ディレクトリからライブラリを推測しません。この版には公開DLLの読み込み、Cの宣言、中央のパッケージマネージャーがありません。
