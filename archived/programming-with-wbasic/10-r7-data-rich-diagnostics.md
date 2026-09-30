# 10. R7 paged data, rich output และ terminal doctor

**สถานะ:** automated gates ของบทนี้ **Verified** ที่ integrated SHA `16c4ce1be7a46f981ee6457ffa18c12f50b8bde8`: [checker](https://github.com/jedt3d/wbasic-language/blob/main/examples/r7-data/run-lessons.mjs) ผ่าน source 6/6 และ exact native output 6/6 บน Windows/macOS ARM64 ด้วย compiler/static runtime ที่ matched การทดสอบ ConPTY/PTY และ doctor เป็น transport/diagnostic gates แยกจากการตรวจคุณภาพ font ด้วยสายตา ซึ่งยัง **Unknown** ดู [ดัชนีหลักฐาน](../r7-groups-4-6-feature-index.md) และ [TUI spec v0.3](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-tui-spec-draft-0.3.md) §§6–7, 9.2, 12.3

## โหลด page แล้วให้แอปตัดสินใจ

List/Table/Tree รับ snapshot ของแถว ไม่รับ callback ที่ไปอ่านฐานข้อมูลระหว่าง `View` หนึ่ง page มีได้สูงสุด 4,096 แถวและ 8 MiB; `TreeIndex` มีได้สูงสุด 100,000 โหนด ตรวจ parent ที่ไม่มีอยู่, ID ซ้ำ และวงจรก่อนสร้าง TreeState จำนวน `Total` ของ List/Table อาจมากกว่าแถวที่โหลดไว้ แอปต้องส่ง page ที่ครอบคลุม viewport และ overscan ที่ร้องขอ; renderer วาดเฉพาะแถวที่มองเห็นใน clip ไม่สร้างหนึ่ง Node ต่อทุกแถวของข้อมูลใหญ่

```wbas
Let page As Tui.ListPage = Tui.ListPage.Create(0, 100000, [Tui.ListItem.Create("row-a", "Alpha")])
Let state As Tui.ListState = Tui.ListState.Create(0, Null, 1).WithOverscan(2)
Let view As Tui.View = Tui.View.Create(Tui.List.View("list", page, state))
```

`FirstRow`, `SelectedId` และ page snapshot เป็นค่าใน model ที่แอปต้องอัปเดตเอง กด PageDown ส่ง `Tui.DataEvent` ชนิด `Page` พร้อม `ProposedFirstRow`; แนะนำให้แอปส่ง Jobs request เพื่อโหลด page ถัดไป แล้วแทน `ListPage`/`ListState` ด้วยค่าที่คืนมา การ sort/filter ก็เป็น request ให้แอปหรือ Jobs ทำ ไม่ใช่ renderer sort dataset เอง [paged-data.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/paged-data.wbas) สร้าง List/Table/Tree snapshots; [data-interaction.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/data-interaction.wbas) แยก `Select`, `Page`, `Sort`, `Filter` และ `Toggle` ออกจากการเปลี่ยน model จริง ตัวอย่างนี้ใช้ `Tui.Test` ไม่แตะฐานข้อมูลหรือ terminal จริง

## Rich output เป็นข้อมูล ไม่ใช่คำสั่ง terminal

`Tui.TextSpan.Create(text, style).WithLink(uri)` รับ structured URI ที่ตรวจ scheme และ control bytes; renderer เปิดลิงก์ด้วย OSC8 เฉพาะเมื่อ terminal capability รองรับ และไม่เปิด browser เอง ข้อความธรรมดา, Markdown และ log ไม่ถูกส่งเป็น raw ANSI Markdown รองรับ heading, unordered bullet และ fenced code เท่านั้น; inline emphasis กับ Markdown link ยังคงเป็นตัวอักษรตามที่ป้อน HTML เป็นข้อความที่มองเห็น ไม่ถูก execute `Tui.LogBuffer.Create(maxLines, maxBytes).Append(line)` คืนค่าใหม่ทุกครั้งและเก็บบรรทัดใหม่ล่าสุดภายในวงแหวนที่กำหนด ข้อความหนึ่งบรรทัดที่ใหญ่กว่า budget เป็น error แทนการตัดกลาง grapheme

```wbas
Let accent As Tui.Style = Tui.Style.Create().WithBold(True)
Let linked As Tui.TextSpan = Tui.TextSpan.Create("Open", accent).WithLink("https://example.com")
Let log As Tui.LogBuffer = Tui.LogBuffer.Create(3, 256).Append("one").Append("two")
Let output As Tui.Node = Tui.Column([Tui.RichText([linked]), Tui.LogViewer("log", log, 0)])
```

`Progress(id, current, total)` ใช้ `Null` ใน `total` สำหรับ indeterminate; `Spinner`, `StatusBar` และ `Notification` เป็น nodes ใน view แอปใช้ Button ส่งคำสั่งยกเลิกผ่าน `Tui.Context.CancelJob(id)` และ worker ตรวจด้วย `Jobs.Context.CheckCancelled()` [cancel-composition-headless.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/cancel-composition-headless.wbas) ทดสอบการกด Enter กับ virtual queued job จนได้ผล `Jobs.Cancelled` หนึ่งครั้งและไม่เหลืองานค้าง; ตัวอย่างนี้ไม่รัน OS worker จริง การลดการเคลื่อนไหวตั้งด้วย `Tui.Options().WithReducedMotion(True)`: spinner/indeterminate progress แสดงสถานะคงที่แต่ Jobs ยังทำงาน [rich-motion-headless.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/rich-motion-headless.wbas) ใช้นาฬิกาเสมือนพิสูจน์ว่าภาพเคลื่อนไหวเปลี่ยนตามเวลาและ ReducedMotion คงภาพเดิม ส่วน Sparkline และ BarChart รับ snapshot ตัวเลขที่มีขอบเขต ไม่รัน expression หรือ script จากข้อมูล [rich-canvas.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/rich-canvas.wbas) แสดง API เหล่านี้และกรณี URI `javascript:` ที่ต้องคืน `Tui.InvalidLink`

Canvas เป็น **mutable local resource** ภายใน `Using` เท่านั้น `Fill`, `WriteText` และ `Line` clip ลงในขนาดเซลล์ที่สร้าง; `Snapshot()` คืน immutable `Tui.Node` ซึ่งยัง render ได้หลัง `Close()` ห้ามเก็บ Canvas handle ใน model หรือส่งเข้า worker; เก็บ Node snapshot แทน ความกว้าง ambiguous ที่ terminal profile ต่างจากตอนสร้าง Canvas ใช้ replacement หนึ่งเซลล์เพื่อรักษาตำแหน่งของเซลล์ถัดไป และไม่อ้างว่าเป็น exact glyph rendering ทุก font การเรียก resource หลังปิดคืน `Tui.ResourceClosed`

## วัดข้อความก่อนวาด และบันทึกสิ่งที่เห็นจริง

[text-metrics.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/text-metrics.wbas) ใช้ `GraphemeCount`, `CellWidth`, `Measure`, `Truncate` และ `ScalarOffset` กับ `ก้`, emoji ZWJ และ width profile Unicode 17 narrow/wide `String` indexing ของภาษายังนับ scalar; caret และการตัดแสดงผลใน TUI ใช้ grapheme/cell จึงไม่ตัดกลางกลุ่ม ตัวอย่าง `Measure("🙂", 1, narrow)` ต้องคืน `Tui.GraphemeTooWide` แทนการพิมพ์ครึ่ง emoji `Measure` จำกัดผลไว้ 16,384 บรรทัดและ 4 MiB ของ display text; ถ้าเกินคืน `Tui.TextLimit`

`wb tui doctor --non-interactive --format json` แยก `detected` (OS/architecture, terminal hints, protocol และ width ที่ตรวจได้), `manual` (ชื่อ font/fallback/version/size ที่ผู้ใช้ให้เอง) และ `visual` ผล non-interactive ต้องเป็น `Unknown` เพราะไม่มีผู้ตรวจภาพจริง หากใช้ interactive JSON ให้ `--output report.json` เพื่อแยกไฟล์รายงานออกจากจอ terminal; `--output` ต้องใช้คู่กับ `--format json` ไม่เดา font จาก `TERM`; terminal ผ่าน SSH ใช้ font ฝั่ง client การตรวจ Thai/CJK/emoji และเส้นกรอบจริงต้องทำ visual pass บน host/terminal ที่จะใช้

ใช้ `node examples/r7-data/run-lessons.mjs` เพื่อตรวจ source ทั้งหก fixture ด้วย CLI ที่รายงาน feature IDs; `--native-metrics` ตรวจเฉพาะ metrics และ `--native` ตรวจ exact stdout ทั้งหกกับ matched native `wb`/runtime [manifest](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/cases.json) ผ่านการทบทวนผลที่คาดและเทียบกับผล native จริง Checker แยก source acceptance จาก native output ชัดเจน [terminal fixture](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r7-data/data-rich-terminal.wbas) เป็น gate แบบ interactive แยกต่างหาก ConPTY/PTY transport, doctor และสามกรณี terminal (data-rich, style และ forms) ผ่านบนทั้งสอง host; ผลนี้ไม่พิสูจน์ว่า font แสดง Thai/CJK/emoji ได้ถูกต้องบนจอผู้ใช้ การตรวจ TlwgMono ทั้งสี่ variant ยังต้องระบุ terminal, version, font size, scaling และผู้ตรวจภาพก่อนให้ visual Pass/Fail
