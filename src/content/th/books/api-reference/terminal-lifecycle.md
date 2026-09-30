---
title: "Terminal lifecycle และข้อจำกัดแพลตฟอร์ม"
weight: 60
---

สถานะ: **R6 native lifecycle ปิดรอบในขอบเขต endpoint ที่อนุมัติ; Windows OSC52 read
เชิงบวกยังเป็น Deferred**

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

รองรับ Ctrl+C, suspend/resume, disconnect และ terminal child-process handoff
ตาม platform ที่ตรวจ เมื่อ handoff child ทำงาน parent ไม่ paint แทรกและกลับมา
full redraw

## Clipboard

- NativeLocal private clipboard tests ผ่านบน Windows
- OSC52 read ผ่านบน macOS endpoint ที่ใช้ทดสอบ
- Windows Terminal/conhost ที่ตรวจไม่ forward positive OSC52 read reply;
  WBasic คืน bounded `Tui.ClipboardTimeout` และ restore modes ถูกต้อง
- การยอมรับ Windows จึงเป็น **endpoint-conditional** ไม่ใช่คำรับรองว่า OSC52
  read ใช้ได้บน endpoint นี้หรือทุก Windows terminal
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
| clean machine ไม่มี SDK | เป็น R8 packaging gate ยังไม่พร้อม |

ดังนั้น “build ผ่านสอง ARM64 hosts” เป็นหลักฐานแข็งแรงในขอบเขตนั้น แต่ไม่ใช่
หนังสือเดินทางอัตโนมัติให้ทุก OS และ terminal
