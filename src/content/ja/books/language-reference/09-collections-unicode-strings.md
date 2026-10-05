---
title: "コレクションとUnicode文字列"
description: "配列、マップ、添字、スライス、値セマンティクス、文字列の規則"
weight: 9
---

WBasicは主な可変長コレクションとして`Array Of T`を使います。言語によってArrayListと呼ぶ役割を、別の型名なしで担います。キーと値のコレクションには`Map Of K To V`を使い、Dictionaryは別名ではありません。

## Array型

```basic
Let values As Array Of Integer = [10, 20, 30]
values.Append(40)
values.Insert(1, 15)
PrintLn(values[-1].ToString())
PrintLn(values[1:3].Length.ToString())
```

Arrayには1種類の型の要素が入ります。配列リテラルには、宣言、引数、戻り値、または外側のコレクションから期待される型が必要です。したがって文脈で型が分かるなら、`[]`で空の配列を作れます。

添字は0から始まります。負の添字は末尾から数え、`-1`は最後の要素です。範囲外の添字はデバッグでもリリースでも`ErrorKind.Bounds`になります。スライス`[start:stop]`はstartを含みstopを含みません。startの省略は0、stopの省略はLengthを意味します。負の境界は正規化してから範囲内に収めます。stopがstartより前ならエラーではなく空の配列を返します。

スライスは変更可能なビューではなく新しいコレクションを返します。刻み幅付きスライスとスライスへの代入はまだ対応していません。入れ子の配列は不揃いの配列です。

```basic
Let grid As Array Of (Array Of Integer) = [[1, 2], [3]]
grid[0][1] = 9
```

`Append`、`Insert`、`RemoveAt`のようにArrayを変更するメソッドは値を返しません。`Filter`、`Sorted`、`Reversed`のように新しい値を返すメソッドは連鎖できます。`Contains`はBooleanを返し、`IndexOf`は最初の添字をNull許容値で返します。`Insert`は0からLengthまでの位置を受け入れますが、負の添字は受け入れません。

## Map型

```basic
Let scores As Map Of String To Integer = {}
scores["Alice"] = 100
scores["Length"] = 200
PrintLn(scores["Alice"].ToString())
PrintLn(scores.Length.ToString())
```

この版のキーにはString、Integer、Enumを使えます。値はNull許容にできません。存在しないキーの`map[key]`を読むと`MissingKey`を投げます。`Get(key)`はNull許容値を返し、`ContainsKey`はBooleanを返します。`{}`には期待されるMap型が必要です。空でないMapリテラルはまだありません。

Mapは挿入順を保ちます。キーの値を置き換えても位置は変わらず、削除してから追加すると末尾に移ります。`Keys()`と`Values()`はその順序でArrayを返します。値セマンティクスにより、Mapのコピーを変更しても元のMapは変わりません。

キーには`[]`を使います。`scores.Alice`はコンパイルエラーです。ドットによるアクセスは実際のメンバー用なので、`Length`というキーを`Length`プロパティと取り違えることはありません。

## 文字列はUnicodeスカラー値の列

```basic
Let text As String = "ก้😀"
PrintLn(text.Length.ToString())
PrintLn(text[0])
PrintLn(text[-1])
PrintLn(text[0:2])
```

Lengthは3です。数えるのはUnicodeスカラー値であり、UTF-8のバイト数、UTF-16のコード単位、書記素クラスタの数ではありません。添字ではスカラー値1つのStringを返し、スライスはArrayの規則に従います。文字列は不変なので`text[0] = ...`は無効です。

WBasicはテキストを自動的に正規化しません。見た目が似てもスカラー値の列が異なる文字列は、等しくない場合があります。`.Trim()`はツールチェーンとともに固定されたUnicode White_Spaceの版を使います。`.Split(separator)`は正確に一致する部分文字列で分割し、空のフィールドを残します。バイトI/Oには`Array Of Byte`を使い、不正なUTF-8はU+FFFDへ黙って置き換えずConversionエラーになります。

TUIの表示幅を測るのに`String.Length`を使ってはいけません。スカラー値1つが端末のセルを0個、1個、または2個占めることがあります。幅プロファイルを指定してTuiのテキスト計測APIを使います。
