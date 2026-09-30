# TDD with WBasic

สถานะ: บท R1–R4 สอน independent harness, native `wb test` และ typed matchers บท R5 stream/text, data I/O และ nested matcher ผ่าน developer native gates บน Windows/macOS ARM64 แล้ว ดู [testing plan](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-testing-development-plan-draft-0.3.md) และ [ดัชนี R5](../r5-feature-index.md) บท R6 เพิ่ม fake clock/cell และ Jobs completion ตาม [ดัชนี R6](../r6-feature-index.md)

## สารบัญ

1. [Given–When–Then กับ independent harness และ Red/Green ที่ตรวจได้](01-r1-harness-and-red-green.md) — Verified R1
2. [Red/Green แบบ exact stdout กับโปรแกรม WBasic](02-r2-stdout-red-green.md) — **Verified R2.1 subset**
3. [Red/Green ของ typed core, diagnostic และ runtime error](03-r2-typed-red-green.md) — **Verified R2 core**
4. [`wb test` รุ่นเล็ก, Test.Check/Fail, cleanup และ failure location](04-r3-native-wb-test.md) — **R3 example verified on Windows/macOS ARM64**
5. [Typed rows, reports และ Array/Map matchers](05-r4-data-matchers.md) — **R4 examples verified on Windows/macOS ARM64 at `7184490`**
6. [ทดสอบ stream ที่ขอบ I/O และ failure class](06-r5-stream-tests.md) — **R5 developer gate: Windows/macOS ARM64 verified**
7. [ทดสอบ codec, data I/O และ nested matcher](07-r5-data-boundaries-matchers.md) — **R5 developer gate: Windows/macOS ARM64 verified**
8. [Deterministic TUI clock/jobs/input, cells และ native terminal](08-r6-deterministic-tui-jobs.md) — **R6 foundation; full visual matrix Planned R7**
9. [R7 layout, navigation และ forms](09-r7-layout-navigation-forms.md) — **Selected groups 1–3 behavior verified on both ARM64 hosts at `572b68b`; full R7 pending**
10. [R7 paged data, rich output และ terminal diagnosis](10-r7-data-rich-diagnostics.md) — **Groups 4–6 automated gates verified on Windows/macOS ARM64; font visual matrix Unknown**
11. [R7 SQLite showcase และ BDD acceptance](11-r7-showcase-acceptance.md) — **Groups 7–8 source lesson Draft; matched native/performance Pending**

12. CI, executable documentation และ release acceptance — **Planned R8**

`Given/When/Then` เป็นวิธีจัดความคิดหรือ comments ตาม [testing plan](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-testing-development-plan-draft-0.3.md) ยังไม่ใช่ keywords ของภาษา R4 มี matcher บางรายการที่ระบุในบท 5 แล้ว; nested descriptors และ aggregate scopes ผ่าน native gates ในบท 7
