---
title: "13 · How can I…?"
description: "สูตรใช้งาน Extension 0.4.0 สำหรับสร้าง เขียน นำทาง ทดสอบ รัน และตรวจเครื่องมือ"
weight: 13
---

> **อ่านเวอร์ชันก่อนลงมือ** Extension `0.4.0` และ protocol ที่รวมมา `0.2.0` ในบทนี้เป็น **candidate ที่ตรวจในเครื่อง ยังไม่เผยแพร่**; ใช้ compiler/runtime `0.2.0` ตัวเดิม รุ่นที่เผยแพร่แบบ private experimental ยังเป็น Extension `0.3.0` + protocol `0.1.0` + compiler/runtime `0.2.0` อย่าคาดหวังคำสั่ง DX01–DX10 จาก VSIX `0.3.0` และอย่าใช้บทนี้เป็นลิงก์ดาวน์โหลด candidate ตรวจรุ่นที่ติดตั้งด้วย **WBasic: About and Credits** และ compiler ที่เลือกด้วย **WBasic: Show Toolchain Status** ก่อนทำสูตรใหม่

บทนี้เริ่มจากโปรแกรมเล็กที่ไม่แตะฐานข้อมูล แล้วค่อยแยกตัวอย่างฐานข้อมูลไว้ต่างหาก เปิด Command Palette ด้วย **Ctrl+Shift+P** (หรือคำสั่งเดียวกันบนระบบของคุณ) แล้วพิมพ์ชื่อคำสั่งตัวหนาตามที่แสดงในแต่ละข้อ หากใช้ Vim หรือชุดแป้นอื่น ให้ใช้ Palette เมื่อแป้นถูกแย่ง การทำงานกับ compiler ต้องอยู่ใน trusted workspace และมี compiler/runtime `0.2.0` ที่เข้าคู่กัน

สำหรับคำอธิบายพื้นฐานที่ละเอียดกว่า อ่าน [เขียนด้วย language intelligence]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}}), [นำทางและ refactor]({{< relref "/books/w-basic-extension/06-navigation-and-refactoring.md" >}}) และ [Test Explorer]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}}) ควบคู่กับสูตรสั้นในบทนี้

## เริ่มและตรวจ project

### 1. How can I สร้าง project ที่เริ่มทำงานได้? {#how-01}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เปิด trusted workspace และตรวจ compiler ด้วย **WBasic: Show Toolchain Status**
2. เรียก **WBasic: New Project** เลือกโฟลเดอร์ว่าง แล้วตั้งชื่อ `MyFirstWBasic`
3. เปิดโฟลเดอร์ที่สร้างและตรวจ `App.wproj` กับ `src/Main.wbas`

**จุดตรวจ:** เห็นไฟล์ project/source/test สี่ไฟล์ และ manifest ระบุ toolchain จาก compiler ที่เลือก หากไม่ครบ ให้ตรวจว่าโฟลเดอร์ว่างและ compiler พร้อมก่อนลองใหม่

**ข้อควรจำ:** ชื่อ project ต้องเป็น Unicode NFC ที่ compiler ยอมรับ; คำสั่งไม่เขียนทับไฟล์เดิม

### 2. How can I เลือก project เมื่อ workspace มีหลายอัน? {#how-02}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เปิด view **WBasic Projects** แล้วใช้ **WBasic: Refresh Projects**
2. เลือก **WBasic: Select Active Project** และเลือก manifest ที่ต้องการ
3. เรียก **WBasic: Show Project Modules and Dependencies** เพื่ออ่าน entry/module ก่อนทำงาน

**จุดตรวจ:** view แสดง project และ toolchain ที่ตั้งใจใช้ หากไม่พบ manifest ให้ตรวจ workspace folder แล้ว Refresh อีกครั้ง

**ข้อควรจำ:** project เดียวเลือกอัตโนมัติ; การเลือกหลาย project จำแยกตาม workspace folder

### 3. How can I เพิ่มหรือลบ local module? {#how-03}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เลือก active project และเตรียม local module ที่มี manifest ของตัวเอง
2. เรียก **WBasic: Add Local Module Dependency** แล้วเลือก path; เมื่อต้องถอนให้เรียก **WBasic: Remove Local Module Dependency**
3. Save manifest แล้วใช้ **WBasic: Check Project**

**จุดตรวจ:** dependency ใน Projects view ตรงกับ manifest และ Check ผ่าน หาก Import ไม่พบ ให้คืน dependency หรือแก้ Import ที่อ้างอยู่

**ข้อควรจำ:** ไม่มี textual Include หรือ include path ทั่วไป; Check Project เป็นผู้ตัดสิน manifest และ Import

### 4. How can I ดู source ตัวอย่างโดยไม่แก้ project ของฉัน? {#how-04}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เลือก **WBasic: Open Example** เพื่ออ่านตัวอย่าง
2. ถ้าจะทดลองแก้ ให้ใช้ **WBasic: Copy Example** ไปโฟลเดอร์ใหม่
3. เลือก project ที่คัดลอก แล้ว Check/Build ก่อนตัดสินใจ Run

**จุดตรวจ:** original project ไม่เปลี่ยนและสำเนามี manifest ของตัวเอง หากตัวอย่างฐานข้อมูล Run ไม่ได้ ให้กำหนด database path ที่แยกจากข้อมูลจริง

**ข้อควรจำ:** WORM M2/M3 มี SQLite schema และต้องระบุ database path เองก่อน Run; M4 billing UI เปิดอ่านได้แต่ไม่มีสำเนา project พร้อมใช้

### 5. How can I แทรกโครง code โดยแก้ชื่อครั้งเดียว? {#how-05}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เปิด source WBasic และเข้า Vim Insert mode หากใช้ Vim
2. เรียก **WBasic: Insert Template** แล้วเลือก **Local value**
3. ใช้ Tab ผ่าน placeholder แก้ชื่อ/ชนิด และตรวจชื่อทุกตำแหน่งที่ผูกกัน

**จุดตรวจ:** ได้ `Let value As Integer = 0` ที่แก้ชื่อได้; Undo คืนข้อความก่อนแทรก หาก Tab ถูก Vim รับไป ให้กลับ Insert mode แล้วใช้ Palette เรียกคำสั่งใหม่

**ข้อควรจำ:** template บางชนิดผูกชื่อหลายจุดเข้าด้วยกัน; ใน Vim ที่ทดสอบ paste เคยเติมท้าย default แม้ชื่อที่ผูกเปลี่ยนพร้อมกัน จึงต้องอ่านทุกจุด

### 6. How can I เริ่มไฟล์จาก template โดยไม่ทับ code? {#how-06}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. สร้างหรือเปิด `.wbas` ว่างในตำแหน่ง project ที่ต้องการ
2. เรียก **WBasic: Insert File Template** แล้วเลือก Application หรือ Test ให้ตรงไฟล์
3. แก้ linked placeholders, Save แล้ว Check Project/Active Source ตามบริบท

**จุดตรวจ:** template อยู่ในไฟล์ว่างและ code เดิมไม่ถูกทับ หากคำสั่งปฏิเสธ ให้สร้างไฟล์ว่างใหม่

**ข้อควรจำ:** เลือกชนิดไฟล์ให้ตรงบริบท; file template ปฏิเสธ buffer ที่มี code อยู่

### 7. How can I ห่อหลายบรรทัดด้วย If หรือ Try/Finally? {#how-07}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เลือก statement แบบเต็มบรรทัดตั้งแต่ต้นถึงท้าย
2. เรียก **WBasic: Surround With** แล้วเลือก `If` หรือ `Try/Finally`
3. แก้เงื่อนไข/cleanup ให้ตรงเจตนา Save และ **WBasic: Check Project**

**จุดตรวจ:** เห็น wrapper ครอบ selection และ Check ผ่าน หาก selection เปลี่ยนหรือกินเพียงส่วน expression ให้เลือกเต็มบรรทัดใหม่; Undo ได้เมื่อผลไม่ตรงใจ

**ข้อควรจำ:** wrapper เป็น text template ให้แก้ condition/cleanup และตรวจผลเอง ไม่ใช่ semantic refactor ที่พิสูจน์ความเทียบเท่า

### 8. How can I รู้ว่าควรกดแป้นไหนและแก้อาการแป้นชน? {#how-08}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เรียก **WBasic: Shortcut Guide** ดู profile ที่ใช้อยู่
2. หากต้องการชุด IntelliJ ให้ตั้ง `wbasic.shortcutProfile` เป็น `intellij`
3. ทดลองแป้นใน WBasic editor; หาก Vim/VS Code รับไป ให้เรียกชื่อ action ใน Command Palette

**จุดตรวจ:** guide แสดง profile และ action ทำงานตรงที่ตั้งใจ หากแป้นชนให้ใช้ Palette หรือปรับ mapping ของ editor

**ข้อควรจำ:** profile standard ไม่เพิ่มแป้น; intellij เพิ่ม Shift+F6, Ctrl+B (Mac Cmd+B), Alt+Enter, Ctrl+Alt+Shift+T (Mac Cmd+Alt+Shift+T), Shift+F10 เฉพาะ WBasic editor ที่เข้าเงื่อนไข Vim Normal เคยรับ Ctrl+T และ Visual Line เคยรับ Ctrl+B

### 9. How can I เห็น action ที่ใช้ได้ตรงตำแหน่ง cursor? {#how-09}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เปิด source ที่มี diagnostic หรือ symbol ที่ต้องการ
2. วาง cursor แล้วเรียก **WBasic: Actions at Caret**
3. เลือก action ที่เสนอ ดูผลแก้ และ Check Project อีกครั้ง

**จุดตรวจ:** chooser แสดง action ตาม editor, capability และ selection; VS Code อาจรายงานว่า action ใช้ไม่ได้กับ symbol ณ cursor หากว่างหรือใช้ไม่ได้ ให้เปิด Problems และตรวจ project context

**ข้อควรจำ:** รายการเสนอ action ตาม editor, capability และ selection; บาง action อาจใช้ไม่ได้กับ symbol ณ cursor เมื่อ VS Code ตรวจต่อ

### 10. How can I เปลี่ยนชื่ออย่างตรวจผลกระทบก่อน? {#how-10}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. Save source และวาง cursor บน identifier ใน active project
2. เรียก **WBasic: Refactor This** แล้วเลือก Rename หรือใช้ F2
3. กรอกชื่อใหม่ ตรวจ rename preview ทุกไฟล์ แล้วจึง Apply

**จุดตรวจ:** preview แสดงการแก้ code ที่ compiler resolve ได้ โดยไม่แตะ comment/string หาก Rename ไม่เสนอ ให้ตรวจ capability และ Check Project

**ข้อควรจำ:** compiler ตรวจ project snapshot ก่อน Apply; comment/string ไม่ถูก rename และยังไม่มี extract method หรือ semantic control-flow transform

### 11. How can I หา definition และการใช้งานในไฟล์อื่น? {#how-11}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เปิด source ที่เป็นสมาชิก active project แล้ว Save
2. วาง cursor ที่ชื่อ ใช้ F12 ไป definition หรือ Shift+F12 ดู references
3. ใช้ Peek, Hover หรือ Call Hierarchy เพื่ออ่านบริบทก่อนแก้

**จุดตรวจ:** เปิด declaration/รายการอ้างอิงใน project ที่ถูกต้อง หากหาไม่พบ ให้ Check Project และตรวจว่าไฟล์อยู่ใน project inventory

**ข้อควรจำ:** Hover/completion/signature help/Peek/usage highlights/Call Hierarchy ใช้อ่านบริบทได้; source นอก project ถูกตรวจ standalone

### 12. How can I หา symbol เมื่อยังไม่เคยเปิดไฟล์นั้น? {#how-12}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เปิด workspace ที่มี project manifest แต่ยังไม่ต้องเปิด source ทุกไฟล์
2. เรียก **Go to Symbol in Workspace** จาก Command Palette
3. พิมพ์ชื่อ เช่น `Amount` แล้วเลือกผลลัพธ์ที่ตรง project

**จุดตรวจ:** VS Code เปิด declaration ที่พบ หากว่างหรือมี project ถูกปฏิเสธ ให้ Save/Check Project และดูขอบเขตจำนวนไฟล์ก่อนสรุปว่า symbol ไม่มี

**ข้อควรจำ:** การค้นหาจำกัด 8 roots, 16 manifests, 512 directories, 8192 entries, depth 16 และ 256 results; ผลว่างไม่ได้ยืนยันว่า symbol ไม่มี

### 13. How can I แยกสีที่ compiler รู้จากสี syntax ทั่วไป? {#how-13}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เปิด source ใน active project แล้ว Check Project
2. วาง cursor บน function ที่ resolve ได้
3. เรียก **Developer: Inspect Editor Tokens and Scopes** จาก Palette เพื่อดู semantic token และเปรียบกับ theme

**จุดตรวจ:** token ที่ resolve ได้มีชนิดเชิงความหมาย เช่น `function`; หากยังไม่มี ให้แก้ diagnostic/identity แล้ว Check ใหม่

**ข้อควรจำ:** semantic token มาจาก identity ที่ compiler resolve; lexical coloring ยังทำงานกับ source ไม่สมบูรณ์และ theme เลือกสีจริง

### 14. How can I ตรวจ source ที่กำลังแก้ เทียบกับทั้ง project? {#how-14}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. ขณะมี unsaved edit เรียก **WBasic: Check Active Source** เพื่อดู diagnostic ของไฟล์เดี่ยว
2. Save ไฟล์และ manifest/module ที่เกี่ยวข้อง
3. เรียก **WBasic: Check Project** เพื่อให้ compiler ตรวจ project จริง

**จุดตรวจ:** Problems สะท้อน source ปัจจุบัน และ project Check ยืนยัน Import/dependency หากผลสองคำสั่งต่างกัน ให้ตรวจบริบท standalone เทียบกับ project

**ข้อควรจำ:** Check Active Source รวม unsaved edits และไม่มี module/import context; _spec.wbas ใช้ test mode ผลเก่าที่มาช้าถูกทิ้ง

### 15. How can I รันและ build project ที่เลือก? {#how-15}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เลือก active project และ **WBasic: Check Project**
2. เรียก **WBasic: Run Project** แล้วอ่านผลใน task terminal
3. เรียก **WBasic: Build Project — Debug (Development)** หรือ **WBasic: Build Project — Release (Development)** ตามงาน

**จุดตรวจ:** terminal เก็บ output และ exit status หลังจบ; หากได้ project ผิดให้เลือก manifest ใหม่ก่อน Run/Build

**ข้อควรจำ:** Build Project (Development) ใช้ default profile; Debug/Release เลือกได้ตรง ๆ ผลเป็น development build ยังไม่ใช่ no-SDK distribution

คำสั่ง default ใน Palette คือ **WBasic: Build Project (Development)**

### 16. How can I รันไฟล์เดี่ยวหรือทดลอง TUI/Jobs? {#how-16}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. ตรวจ capability `r6-tui-jobs-foundation` แล้วเรียก **WBasic: New TUI/Jobs Example**
2. เลือก terminal counter หรือ headless Jobs และ Save template เป็น `.wbas`
3. เปิดไฟล์ที่บันทึก แล้วเรียก **WBasic: Run Active Source in Terminal**

**จุดตรวจ:** VS Code terminal แสดงผลโปรแกรมและรับ interactive TUI ได้ หากคำสั่งไม่พร้อม ให้ตรวจ Workspace Trust, compiler และ Save path

**ข้อควรจำ:** Run Active Source ใช้ directory ของไฟล์เป็น working directory และ terminal จริง; TUI/Jobs template เริ่มเป็นเอกสารยังไม่บันทึก

### 17. How can I รันชื่อชุด argument เดิมซ้ำ? {#how-17}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

ตัวอย่าง workspace settings:

```json
{
  "wbasic.runConfigurations": [
    { "name": "daily", "manifest": "App.wproj", "profile": "debug", "arguments": [] }
  ]
}
```

1. ใส่รายการชื่อ/manifest/profile/arguments ใน workspace settings ตามตัวอย่าง
2. เรียก **WBasic: Select Run Configuration** แล้วเลือก `daily`
3. อ่าน task terminal; เมื่อต้องการอีกครั้งเรียก **WBasic: Run Again**

**จุดตรวจ:** task รอบใหม่ใช้ค่าปัจจุบันของชื่อเดียวกัน หากไม่พบ config ให้ตรวจ settings; ถ้าโปรแกรมเขียนข้อมูล ให้ตรวจผลข้างเคียงก่อน Run Again

**ข้อควรจำ:** Run Again เก็บชื่อแล้วอ่าน settings ปัจจุบันใหม่; arguments เป็น literal ไม่มี environment/working-directory expansion หรือ secret store อย่าใส่ secret และอย่ารันซ้ำฐานข้อมูลโดยไม่ตรวจผลข้างเคียง

### 18. How can I ทำงานผ่าน VS Code Tasks หรือเอา object ไปใช้ต่อ? {#how-18}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. สร้าง task type `wbasic` ที่ระบุ `action` และ `manifest`
2. เลือก task ผ่าน VS Code Tasks หรือเรียก **WBasic: Emit Project Object** แล้วระบุ output path แบบ absolute
3. อ่าน terminal เพื่อยืนยัน exit status และไฟล์ object ตาม path ที่เลือก

**จุดตรวจ:** task ของ project ที่เลือกจบตาม action หาก capability ขาดให้เปิด Toolchain Doctor แล้วแก้ compiler/task

**ข้อควรจำ:** Task action รองรับ check, run, test, build, emit-object; run/build รับ profile และ run รับ literal arguments

### 19. How can I ไปจาก source สู่ test และจาก test กลับ source? {#how-19}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. Save ไฟล์ source/test ใน project และ Check Project
2. เรียก **WBasic: Go to Test or Source**
3. เลือก candidate ใน picker แล้วอ่านไฟล์ปลายทางว่าทดสอบพฤติกรรมนั้นจริง

**จุดตรวจ:** เปิดไฟล์จาก inventory/discovery ที่ compiler รู้จัก หากว่างให้ตรวจ native test discovery; รายการนี้ไม่ใช่ coverage map

**ข้อควรจำ:** candidate มาจาก project inventory กับ native test discovery; ต้องอ่าน test เองก่อนอ้างว่าคุมพฤติกรรมที่ต้องการ

### 20. How can I เพิ่ม test ใหม่โดยไม่เผลอได้ผลเขียว? {#how-20}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. ตรวจว่ามี `tests` directory ใน active project
2. เรียก **WBasic: New Test Scaffold** แล้วตั้งชื่อ test ที่ไม่ซ้ำ
3. เปิดไฟล์ที่สร้าง เขียน Given/When/Then และเปลี่ยน TODO assertion ให้ตรง expected behavior

**จุดตรวจ:** native discovery เห็น case ใหม่ และก่อนแก้จะล้มเหลวที่ `Test.Check(False, "TODO: specify expected behavior")` หากชื่อชน คำสั่งจะไม่เขียนทับไฟล์เดิม

**ข้อควรจำ:** อย่าเปลี่ยน False เป็น True เพียงเพื่อให้ผลเขียว; ระบุ expected behavior ที่ทดสอบได้ก่อน

### 21. How can I รันเฉพาะ test ที่ล้มเหลวอีกครั้ง? {#how-21}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. Save source แล้ว Run Test จาก Test Explorer หรือ inline **Run Test** เพื่อสร้าง VS Code Testing run
2. อ่าน Test Results เพื่อระบุ failed case; ใช้ **WBasic: Test Project** แยกต่างหากเมื่อต้องการผลทั้ง suite ใน WBasic Tests output
3. เรียก **Test: Rerun Failed Tests from Last Run** แล้วเทียบผลรอบใหม่กับประวัติเดิม

**จุดตรวจ:** เฉพาะ failed case ที่เลือกโดย native Testing ถูกเรียกใหม่; หากไม่มี discovered tests ให้แก้ discovery แทนการนับเป็นผ่าน

**ข้อควรจำ:** ผล assertion failure, runtime error, crash, timeout และ cancellation แยกกัน; zero discovered tests คือ error

### 22. How can I รู้ว่า compiler/extension ตัวใดกำลังทำงาน? {#how-22}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เรียก **WBasic: About and Credits** ดูรุ่น extension ที่ติดตั้ง
2. เรียก **WBasic: Show Toolchain Status** ดู compiler path/version/target
3. เทียบกับ version scope ตอนต้นบทก่อนใช้สูตร DX

**จุดตรวจ:** แยก Extension `0.4.0` candidate จาก compiler `0.2.0` ได้ชัด; หาก compiler unknown/missing ให้ตั้ง absolute `wbasic.compilerPath` แล้ว reload

**ข้อควรจำ:** About ไม่รัน compiler จึงอาจบอก unknown; Status บอก executable/version/round/target/source ส่วน capability รายตัวดู Toolchain Doctor

### 23. How can I ตรวจเหตุที่เครื่องมือไม่พร้อม? {#how-23}

**รุ่น:** Extension 0.4.0 candidate + protocol 0.2.0; compiler/runtime 0.2.0

1. เรียก **WBasic: Toolchain Doctor** แล้วอ่าน output channel
2. แก้ path/trust/capability ตามข้อความ แล้วตรวจ Toolchain Status ใหม่
3. ถ้าปัญหา LSP ยังอยู่ เรียก **WBasic: Show Language Server Output**

**จุดตรวจ:** Doctor บอกสถานะการถาม compiler และ recovery ที่ทำได้; เวลา query ไม่ใช่หลักฐานว่า editor หรือ runtime พร้อมทั้งหมด

**ข้อควรจำ:** เวลาที่ Doctor จับเป็น capability query ครั้งเดียว ไม่ใช่ editor latency, runtime-pair หรือ fresh no-SDK evidence; trace verbose อาจมี source text

### 24. How can I อ่านกติกาภาษาและตรวจ native probe? {#how-24}

**รุ่น:** Extension 0.3.0 release + protocol 0.1.0 หรือ 0.4.0 candidate; compiler/runtime 0.2.0

1. เรียก **WBasic: Open v0.3 Specification** อ่านกติกาภาษาที่ bundle ไว้
2. ถ้าวินิจฉัย native toolchain ให้ตั้ง probe path และใช้ **WBasic: Inspect Native Probe**
3. เมื่อต้องตรวจ terminal/font ให้รัน `wb tui doctor` ใน terminal ด้วยตนเอง

**จุดตรวจ:** spec เปิดแบบ offline และผล probe/CLI มาจากเครื่องมือที่เรียกจริง หาก probe ไม่พบ ให้ตรวจ `wbasic.probePath` และ Workspace Trust

**ข้อควรจำ:** Inspect Native Probe ใช้ค่า wbasic.probePath; Toolchain Status แสดง compiler path ไม่ใช่ probe path Extension ไม่ตรวจ terminal ให้อัตโนมัติ

Candidate `0.4.0` นี้ผ่านชุด editor/protocol บน Windows/macOS ARM64 และ action ที่ติดตั้งจริงในหน้าต่าง Windows ตามรายงาน product; ยังไม่มีข้ออ้างว่ากด UI ชุดเดียวกันผ่านบน macOS/Linux หรือว่าผ่านการแจกจ่ายแบบ production/no-SDK เมื่อใช้ VSIX ที่เผยแพร่ `0.3.0` ให้อ่านบท 1–12 สำหรับความสามารถที่ตรวจในรุ่นนั้น และรอ release evidence ใหม่ก่อนถือว่าสูตร DX ในบทนี้พร้อมดาวน์โหลด
