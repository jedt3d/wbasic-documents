---
title: "13 · How can I…? — 操作ガイド"
description: "Extension 0.4.0 で作成、編集、移動、テスト、実行、ツールの確認を進めるレシピ"
weight: 13
---

> **操作前にバージョンを確認してください。** この章の Extension `0.4.0` と同梱 protocol `0.2.0` は、**ローカルで検証した未公開の candidate** です。compiler/runtime は従来と同じ `0.2.0` を使います。公開済みの private experimental 版は、Extension `0.3.0` + protocol `0.1.0` + compiler/runtime `0.2.0` です。VSIX `0.3.0` に DX01–DX10 のコマンドがあると考えたり、この章を candidate のダウンロード先として使ったりしないでください。新しいレシピを試す前に、インストール済みの版を **WBasic: About and Credits**、選択中の compiler を **WBasic: Show Toolchain Status** で確認してください。

まずデータベースに触れない小さなプログラムから始め、データベースの例は分けて扱います。**Ctrl+Shift+P**（お使いの環境で対応する操作）で Command Palette を開き、各項目の太字のコマンド名を入力してください。Vim や別のキーバインドがショートカットを受け取る場合も Palette を使えます。compiler を使う操作には trusted workspace と、対応する compiler/runtime `0.2.0` が必要です。

基本を詳しく学ぶときは、[language intelligence で書く]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}})、[移動と refactor]({{< relref "/books/w-basic-extension/06-navigation-and-refactoring.md" >}})、[Test Explorer]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}})を、この章の短い手順と併せて読んでください。

## project を始めて確認する

### 1. How can I 作業を始められる project を作るには？ {#how-01}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. trusted workspace を開き、**WBasic: Show Toolchain Status** で compiler を確認します。
2. **WBasic: New Project** を実行し、空のフォルダーを選んで `MyFirstWBasic` と名付けます。
3. 作成したフォルダーを開き、`App.wproj` と `src/Main.wbas` を確認します。

**確認点：** project/source/test の計 4 ファイルがあり、manifest の toolchain が選択した compiler に合っていること。足りない場合は、フォルダーが空だったか、compiler が使えるかを確認してからやり直します。

**注意：** project 名は compiler が受け付ける Unicode NFC にする必要があります。このコマンドは既存ファイルを上書きしません。

### 2. How can I 複数の project がある workspace で一つを選ぶには？ {#how-02}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. **WBasic Projects** view を開き、**WBasic: Refresh Projects** を使います。
2. **WBasic: Select Active Project** で目的の manifest を選びます。
3. 作業前に **WBasic: Show Project Modules and Dependencies** で entry/module を確認します。

**確認点：** view に目的の project と toolchain が表示されること。manifest が見つからなければ workspace folder を確認し、再度 Refresh します。

**注意：** project が一つなら自動で選択されます。複数 project の選択は workspace folder ごとに記憶されます。

### 3. How can I local module を追加・削除するには？ {#how-03}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. active project を選び、独自の manifest を持つ local module を用意します。
2. **WBasic: Add Local Module Dependency** で path を選びます。削除するときは **WBasic: Remove Local Module Dependency** を使います。
3. manifest を Save し、**WBasic: Check Project** を実行します。

**確認点：** Projects view の dependency が manifest と一致し、Check が通ること。Import が見つからない場合は dependency を戻すか、参照中の Import を直します。

**注意：** textual Include や汎用の include path はありません。manifest と Import の妥当性は Check Project が判断します。

### 4. How can I 自分の project を変えずに example の source を見るには？ {#how-04}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. **WBasic: Open Example** で例を読みます。
2. 編集して試す場合は、**WBasic: Copy Example** で新しいフォルダーにコピーします。
3. コピーした project を選び、Run するか決める前に Check/Build します。

**確認点：** 元の project が変わらず、コピーに独自の manifest があること。データベースの例を Run できなければ、実データと分けた database path を指定します。

**注意：** WORM M2/M3 には SQLite schema があり、Run の前に自分で database path を指定する必要があります。M4 billing UI は開いて読めますが、すぐ使える project のコピーはありません。

### 5. How can I 名前を一度直して code のひな形を挿入するには？ {#how-05}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. WBasic source を開き、Vim を使う場合は Insert mode に入ります。
2. **WBasic: Insert Template** を実行し、**Local value** を選びます。
3. Tab で placeholder を移動し、名前や型を直して、連動する各箇所を確認します。

**確認点：** `Let value As Integer = 0` が挿入され、名前を編集できること。Undo で挿入前のテキストに戻せます。Tab を Vim が受け取ったら、Insert mode に戻り、Palette からコマンドを再実行します。

**注意：** template によっては複数箇所の名前が連動します。検証した Vim では、連動する名前が同時に変わっても paste が default の末尾に追加されたことがありました。すべての箇所を読んで確かめてください。

### 6. How can I 既存の code を上書きせず template からファイルを始めるには？ {#how-06}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. project 内の目的の場所に、空の `.wbas` ファイルを作るか開きます。
2. **WBasic: Insert File Template** を実行し、そのファイルに合う Application または Test を選びます。
3. linked placeholders を直して Save し、状況に応じて Check Project/Active Source します。

**確認点：** template が空のファイルに入り、既存の code は上書きされないこと。コマンドが拒否されたら、新しい空のファイルを作ります。

**注意：** ファイルの用途に合う種類を選んでください。code の入った buffer に file template は挿入できません。

### 7. How can I 複数行を If または Try/Finally で囲むには？ {#how-07}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. statement を行頭から行末まで、行全体で選択します。
2. **WBasic: Surround With** を実行し、`If` または `Try/Finally` を選びます。
3. 意図に合わせて条件や cleanup を直し、Save して **WBasic: Check Project** を実行します。

**確認点：** 選択範囲が wrapper で囲まれ、Check が通ること。範囲が変わったり expression の一部だけを選んでいたりした場合は、行全体を選び直します。結果が意図と違えば Undo できます。

**注意：** wrapper は condition/cleanup を自分で編集し、結果を確認するための text template です。意味の等価性が証明された semantic refactor ではありません。

### 8. How can I ショートカットを調べ、キーの競合を解決するには？ {#how-08}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. **WBasic: Shortcut Guide** で現在の profile を確認します。
2. IntelliJ の組み合わせを使うなら、`wbasic.shortcutProfile` を `intellij` に設定します。
3. WBasic editor でキーを試します。Vim/VS Code が受け取る場合は、Command Palette で action 名を実行します。

**確認点：** guide に profile が表示され、意図した action が動くこと。キーが競合するなら Palette を使うか editor 側の mapping を調整します。

**注意：** `standard` profile はキーを追加しません。`intellij` は、条件を満たす WBasic editor でのみ Shift+F6、Ctrl+B（Mac Cmd+B）、Alt+Enter、Ctrl+Alt+Shift+T（Mac Cmd+Alt+Shift+T）、Shift+F10 を追加します。検証時には Vim Normal が Ctrl+T、Visual Line が Ctrl+B を受け取ったことがあります。

### 9. How can I cursor の位置で使える action を見るには？ {#how-09}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. diagnostic または目的の symbol がある source を開きます。
2. cursor を置いて **WBasic: Actions at Caret** を実行します。
3. 提案された action を選び、変更結果を見て Check Project を再実行します。

**確認点：** chooser が editor、capability、selection に応じた action を表示すること。VS Code が cursor の symbol に使えない action と判断する場合もあります。候補が空、または使えないときは Problems と project context を確認します。

**注意：** 提案は editor、capability、selection に基づきます。提案後に VS Code が詳しく確認すると、cursor の symbol に適用できない action もあります。

### 10. How can I 影響を確認してから名前を変えるには？ {#how-10}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. source を Save し、active project 内の identifier に cursor を置きます。
2. **WBasic: Refactor This** から Rename を選ぶか、F2 を使います。
3. 新しい名前を入力し、全ファイルの rename preview を確認してから Apply します。

**確認点：** preview に compiler が resolve した code の変更が表示され、comment/string は変更されないこと。Rename が出なければ capability を確認し、Check Project を実行します。

**注意：** compiler は Apply 前に project snapshot を調べます。comment/string は rename されず、extract method や semantic control-flow transform はまだありません。

### 11. How can I 別ファイルの definition と使用箇所を探すには？ {#how-11}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. active project に属する source を開いて Save します。
2. 名前に cursor を置き、F12 で definition へ移動するか、Shift+F12 で references を見ます。
3. 変更前に Peek、Hover、Call Hierarchy で前後の文脈を読みます。

**確認点：** 正しい project の declaration または参照一覧が開くこと。見つからなければ Check Project を実行し、そのファイルが project inventory にあるか確認します。

**注意：** Hover/completion/signature help/Peek/usage highlights/Call Hierarchy でも文脈を読めます。project 外の source は standalone として確認されます。

### 12. How can I まだ開いていないファイルの symbol を探すには？ {#how-12}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. project manifest のある workspace を開きます。すべての source を開く必要はありません。
2. Command Palette から **Go to Symbol in Workspace** を実行します。
3. `Amount` などの名前を入力し、目的の project の結果を選びます。

**確認点：** VS Code が見つかった declaration を開くこと。結果が空、または project が拒否された場合は、symbol がないと判断する前に Save/Check Project とファイル数の検索上限を確認します。

**注意：** 検索は 8 roots、16 manifests、512 directories、8192 entries、depth 16、256 results までです。結果が空でも symbol が存在しない証明にはなりません。

### 13. How can I compiler が識別した色と通常の syntax 色を区別するには？ {#how-13}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. active project の source を開き、Check Project を実行します。
2. resolve できる function に cursor を置きます。
3. Palette から **Developer: Inspect Editor Tokens and Scopes** を実行し、semantic token を調べて theme と比較します。

**確認点：** resolve された token に `function` などの意味上の種類があること。まだ表示されなければ diagnostic/identity を直し、再度 Check します。

**注意：** semantic token は compiler が resolve した identity に基づきます。不完全な source には lexical coloring が引き続き働き、実際の色は theme が決めます。

### 14. How can I 編集中の source と project 全体をそれぞれ確認するには？ {#how-14}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. unsaved edit がある状態で **WBasic: Check Active Source** を実行し、単一ファイルの diagnostic を見ます。
2. ファイルと関連する manifest/module を Save します。
3. **WBasic: Check Project** で実際の project を compiler に確認させます。

**確認点：** Problems が現在の source を反映し、project Check で Import/dependency を確認できること。二つの結果が違えば、standalone と project の context の差を調べます。

**注意：** Check Active Source は unsaved edits を含み、module/import context はありません。`_spec.wbas` には test mode を使います。遅れて届いた古い結果は破棄されます。

### 15. How can I 選んだ project を実行・build するには？ {#how-15}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. active project を選び、**WBasic: Check Project** を実行します。
2. **WBasic: Run Project** を実行し、task terminal の結果を読みます。
3. 用途に応じて **WBasic: Build Project — Debug (Development)** または **WBasic: Build Project — Release (Development)** を実行します。

**確認点：** 終了後も terminal に output と exit status が残ること。違う project を使っていたら、Run/Build の前に manifest を選び直します。

**注意：** Build Project (Development) は default profile を使います。Debug/Release は直接選べます。結果は development build であり、no-SDK distribution の完成品ではありません。

Palette の default コマンドは **WBasic: Build Project (Development)** です。

### 16. How can I 単一ファイルを実行し、TUI/Jobs を試すには？ {#how-16}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. capability `r6-tui-jobs-foundation` を確認し、**WBasic: New TUI/Jobs Example** を実行します。
2. terminal counter または headless Jobs を選び、template を `.wbas` として Save します。
3. 保存したファイルを開き、**WBasic: Run Active Source in Terminal** を実行します。

**確認点：** VS Code terminal にプログラムの結果が表示され、interactive TUI を操作できること。コマンドが使えない場合は、Workspace Trust、compiler、Save path を確認します。

**注意：** Run Active Source はそのファイルの directory を working directory とし、実際の terminal を使います。TUI/Jobs template は最初、未保存の文書として開きます。

### 17. How can I 名前を付けた argument の組を再実行するには？ {#how-17}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

workspace settings の例：

```json
{
  "wbasic.runConfigurations": [
    { "name": "daily", "manifest": "App.wproj", "profile": "debug", "arguments": [] }
  ]
}
```

1. 例に従い、workspace settings に name/manifest/profile/arguments を設定します。
2. **WBasic: Select Run Configuration** を実行し、`daily` を選びます。
3. task terminal を読み、もう一度実行するときは **WBasic: Run Again** を使います。

**確認点：** 次の task が同じ名前の現在の設定を使うこと。config が見つからなければ settings を確認します。プログラムがデータを書き込む場合は、Run Again の前に副作用を調べます。

**注意：** Run Again は名前を保持し、現在の settings を読み直します。arguments は literal で、environment/working-directory expansion や secret store はありません。secret を入れず、副作用を確認せずにデータベースを再実行しないでください。

### 18. How can I VS Code Tasks から操作し、object を後で使うには？ {#how-18}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. `action` と `manifest` を指定した type `wbasic` の task を作ります。
2. VS Code Tasks から task を選ぶか、**WBasic: Emit Project Object** を実行して absolute output path を指定します。
3. terminal で exit status を確認し、指定した path の object ファイルを調べます。

**確認点：** 選んだ project の task が指定した action に従って終了すること。capability が足りなければ Toolchain Doctor を開き、compiler/task を直します。

**注意：** Task action は `check`、`run`、`test`、`build`、`emit-object` に対応します。run/build には profile、run には literal arguments を指定できます。

### 19. How can I source から test へ、test から source へ移動するには？ {#how-19}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. project の source/test ファイルを Save し、Check Project を実行します。
2. **WBasic: Go to Test or Source** を実行します。
3. picker で candidate を選び、移動先のファイルが本当にその動作をテストしているか読みます。

**確認点：** compiler が把握する inventory/discovery にあるファイルが開くこと。候補がなければ native test discovery を確認します。この一覧は coverage map ではありません。

**注意：** candidate は project inventory と native test discovery から得ます。目的の動作をカバーすると主張する前に、自分で test を読んでください。

### 20. How can I 誤って成功扱いにせず新しい test を作るには？ {#how-20}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. active project に `tests` directory があることを確認します。
2. **WBasic: New Test Scaffold** を実行し、重複しない test 名を付けます。
3. 作成されたファイルを開き、Given/When/Then を書き、TODO assertion を期待する動作に合わせて直します。

**確認点：** native discovery に新しい case が現れ、修正前は `Test.Check(False, "TODO: specify expected behavior")` で失敗すること。名前が重複すると、コマンドは既存ファイルを上書きしません。

**注意：** 成功表示のためだけに False を True に変えないでください。先に、検証できる expected behavior を明確にします。

### 21. How can I 失敗した test だけを再実行するには？ {#how-21}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. source を Save し、Test Explorer または inline の **Run Test** から実行して VS Code Testing run を作ります。
2. Test Results で failed case を確認します。suite 全体の結果を WBasic Tests output で見るときは、別途 **WBasic: Test Project** を使います。
3. **Test: Rerun Failed Tests from Last Run** を実行し、新しい結果を前回の履歴と比べます。

**確認点：** native Testing が選んだ failed case だけが再実行されること。discovered tests がなければ、成功と数えず discovery を直します。

**注意：** assertion failure、runtime error、crash、timeout、cancellation は区別されます。zero discovered tests は error です。

### 22. How can I 使用中の compiler/extension を確かめるには？ {#how-22}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. **WBasic: About and Credits** でインストール済み extension の版を見ます。
2. **WBasic: Show Toolchain Status** で compiler path/version/target を見ます。
3. DX レシピを試す前に、章の冒頭にあるバージョン範囲と照合します。

**確認点：** Extension `0.4.0` candidate と compiler `0.2.0` を区別できること。compiler が unknown/missing なら absolute `wbasic.compilerPath` を設定して reload します。

**注意：** About は compiler を実行しないので unknown と表示する場合があります。Status は executable/version/round/target/source を示します。個別の capability は Toolchain Doctor で確認します。

### 23. How can I toolchain が使えない理由を調べるには？ {#how-23}

**バージョン：** Extension 0.4.0 candidate + protocol 0.2.0。compiler/runtime 0.2.0

1. **WBasic: Toolchain Doctor** を実行し、output channel を読みます。
2. 表示に従って path/trust/capability を直し、Toolchain Status を再確認します。
3. LSP の問題が続けば、**WBasic: Show Language Server Output** を実行します。

**確認点：** Doctor に compiler への問い合わせ状況と実行できる recovery が表示されること。query 時間だけでは、editor や runtime がすべて使える証拠にはなりません。

**注意：** Doctor が測る時間は単一の capability query であり、editor latency、runtime-pair、fresh no-SDK の証拠ではありません。verbose trace に source text が含まれる場合があります。

### 24. How can I 言語仕様を読み、native probe を調べるには？ {#how-24}

**バージョン：** Extension 0.3.0 release + protocol 0.1.0、または 0.4.0 candidate。compiler/runtime 0.2.0

1. **WBasic: Open v0.3 Specification** で同梱の言語仕様を読みます。
2. native toolchain を診断するときは probe path を設定し、**WBasic: Inspect Native Probe** を使います。
3. terminal/font を確認するときは、自分で terminal から `wb tui doctor` を実行します。

**確認点：** spec が offline で開き、probe/CLI の結果が実際に呼び出したツールから得られること。probe が見つからなければ `wbasic.probePath` と Workspace Trust を確認します。

**注意：** Inspect Native Probe は `wbasic.probePath` を使います。Toolchain Status が示すのは compiler path で、probe path ではありません。Extension は terminal を自動診断しません。

この candidate `0.4.0` は Windows/macOS ARM64 の editor/protocol テストと、product の報告にある、インストール済み Windows ウィンドウでの action を通過しています。同じ UI 操作が macOS/Linux の実ウィンドウで通った、あるいは production/no-SDK 配布が通ったという証拠はまだありません。公開済み VSIX `0.3.0` を使う場合は、その版で検証された機能を 1〜12 章で確認し、この章の DX レシピをダウンロード可能な機能と見なす前に新しい release evidence を待ってください。
