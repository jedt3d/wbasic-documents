---
title: "Terminal lifecycle และข้อจำกัดแพลตฟอร์ม"
weight: 60
---

สถานะ: **R6 native lifecycle และ Windows OSC52 read เชิงบวกผ่านในขอบเขต endpoint ที่ทดสอบ**

## Ownership และ modes

`Tui.Run` ขอ terminal lease, negotiate capabilities, เข้า mode, loop, restore และ
คืน lease ตามลำดับ Run ซ้อนบน terminal เดียวกันรายงาน `Tui.AlreadyRunning`;
sequential sessions ทำได้เมื่อ cleanup เดิมจบ

รองรับ fullscreen, inline และ static/non-interactive behavior ตาม endpoint
เมื่อไม่ใช่ TTY runtime รายงาน `NotInteractive` โดยไม่พิมพ์ escape sequences
ลำดับ restoration รักษา input/output modes, code pages/termios, screen และ
ownership; callback/worker/cleanup errors เก็บ primary + `Suppressed`

## Stall policy

ถ้า host ทำให้ ordinary output ค้างไม่สิ้นสุด runtime คืน bounded error หลัง
restore input ตาม policy ที่อนุมัติ และ **ยังถือ terminal ownership** จน exact
pending packet กับ ordered cleanup จบ ห้ามเริ่ม session ใหม่ระหว่างนั้น

กรณีพิเศษบน Windows ที่ host ขวางแม้แต่การ restore input เอง สามารถคืน bounded
error ขณะที่ input/output cleanup ยัง pending ได้ โดยยังถือ ownership จน cleanup
ทั้งหมดจบ ระหว่าง clipboard output ค้าง runtime เว้น native input ไว้ใน OS FIFO
เพื่อไม่เข้า OS read ที่อาจค้างตาม output จึงอาจส่ง event ช้าลง อย่าตีความ bounded
return ว่า terminal คืนสภาพครบแล้ว หรือสัญญาว่า replay mouse หลัง exceptional shutdown

รองรับ Ctrl+C, suspend/resume, disconnect และ terminal child-process handoff
ตาม platform ที่ตรวจ เมื่อ handoff child ทำงาน parent ไม่ paint แทรกและกลับมา
full redraw

## Clipboard

- NativeLocal private clipboard tests ผ่านบน Windows
- OSC52 read ผ่านบน macOS endpoint ที่ใช้ทดสอบ
- Microsoft ConPTY `1.24.260710001` ที่ pin และแยกทดสอบผ่าน query จริงพร้อมคำตอบ
  Unicode/empty, แยก malformed/timeout error และ restore modes; inbox/default host
  เดิมไม่ส่งต่อคำตอบเชิงบวก WBasic คืน bounded `Tui.ClipboardTimeout` และ restore modes
- ผล Windows มี **ขอบเขตเฉพาะ endpoint ที่ทดสอบ** ผลนี้ไม่รับรองทุก terminal หรือ
  นโยบาย desktop clipboard manager
- ordinary desktop clipboard ไม่ถูกใช้ใน isolated acceptance test

โปรแกรมต้องจัดการ Clipboard event ที่ `Text` หรือ `Error` เป็น nullable แยกกัน
ห้ามตี failure เป็น empty clipboard

## Platform matrix ปัจจุบัน

| Platform | สถานะ |
|---|---|
| Windows 11 ARM64 native | compiler/runtime/TUI/R7 showcase ผ่านใน environment ที่บันทึก |
| macOS ARM64 native | compiler/runtime/TUI/R7 showcase ผ่าน; iTerm2 visual ผ่าน |
| Linux ARM64 | ยังไม่มี native endpoint verification |
| native x86_64 | ยังไม่ผ่าน acceptance matrix |
| fresh host ไม่มี SDK | ZIP ส่วนตัว `0.0.2` ผ่านหลังแตกไฟล์บนเครื่องนักพัฒนา แต่ fresh-host acceptance ยังเปิดอยู่ |

ดังนั้น “build ผ่านสอง ARM64 hosts” เป็นหลักฐานแข็งแรงในขอบเขตนั้น แต่ไม่ใช่
หนังสือเดินทางอัตโนมัติให้ทุก OS และ terminal
