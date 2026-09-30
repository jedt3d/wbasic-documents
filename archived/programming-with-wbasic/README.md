# Programming with WBasic

สถานะ: บท R1–R4 มีหลักฐาน native ตาม [ดัชนี R1](../r1-feature-index.md), [R2](../r2-feature-index.md), [R3](../r3-feature-index.md) และ [R4](../r4-feature-index.md) บท R5 stream/text, JSON และ curated data libraries ผ่าน developer native gates บน Windows/macOS ARM64 แล้ว ดู [ดัชนี R5](../r5-feature-index.md) บท R6 ครอบคลุม typed TUI/Jobs foundation ตาม [ดัชนี R6](../r6-feature-index.md)

## สารบัญ

1. [สิ่งที่รันได้ใน R1: native probe และขอบเขตของหลักฐาน](01-r1-native-foundation.md) — Verified R1
2. [Main และ PrintLn String literal](02-r2-main-println.md) — **Verified R2.1 subset**
3. [Let/primitives, Boolean/control flow, Procedure และ Main(args)](03-r2-language-core.md) — **Verified R2 core**
4. [Error, Finally, Using และไฟล์ข้อความ](04-r3-errors-resources.md) — **R3 example verified on Windows/macOS ARM64**
5. [Structure, Array/Map, nullable, ByRef และ source modules](05-r4-values-modules.md) — **R4 examples verified on Windows/macOS ARM64 at `7184490`**
6. [Binary/text streams และ dynamic Json.Value](06-r5-streams-json-values.md) — **R5 developer gate: Windows/macOS ARM64 verified**
7. [JSON codecs, Http, Sqlite และ Csv](07-r5-codecs-data-libraries.md) — **R5 developer gate: Windows/macOS ARM64 verified**
8. [TUI/Jobs typed foundation, fake clock และ terminal](08-r6-tui-jobs-foundation.md) — **R6 foundation; full widgets/showcase Planned R7**
9. [R7 layout, navigation และ forms](09-r7-layout-navigation-forms.md) — **Selected groups 1–3 behavior verified on both ARM64 hosts at `572b68b`; full R7 pending**
10. [R7 paged data, rich output และ terminal doctor](10-r7-data-rich-diagnostics.md) — **Groups 4–6 automated gates verified on Windows/macOS ARM64; font visual matrix Unknown**
11. [R7 SQLite showcase: Table, form, Jobs และ CSV](11-r7-sqlite-showcase.md) — **Groups 7–8 source lesson Draft; matched native showcase/acceptance Pending**

12. Packaging, release และ clean-machine no-SDK setup — **Planned R8**

สารบัญนี้ตามลำดับความสามารถใน [product plan](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-programming-tool-plan.md#10-หนังสือและเอกสารการเรียนรู้) และ [execution plan](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-development-execution-plan-draft-0.3.md) การยกตัวอย่าง syntax ในสเปกยังเป็นข้อกำหนดที่รอ implementation ไม่ใช่ผลการรัน
