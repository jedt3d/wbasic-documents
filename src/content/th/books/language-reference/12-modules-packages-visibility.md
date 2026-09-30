---
title: "Module, package และ visibility"
description: "โครงสร้าง .wproj/.wmod, namespace, Import และขอบเขต Public/Internal/Private"
weight: 12
---

WBasic ใช้ directory เป็นหน่วยจัด package `.wmod` ไม่ใช่ไฟล์ source include การแยกนี้
ทำให้ compiler เห็น dependency graph จริง แทนการต่อข้อความหลายไฟล์แล้วหวังว่าลำดับจะดีเอง

## Layout ของ project

```text
App.wproj
src/Main.wbas
modules/Acme.wmod/module.toml
modules/Acme.wmod/src/Math/Total.wbas
```

ตัวอย่าง manifest ที่ implementation รองรับ:

```toml
[project]
name = "Example"
module = "App"
entry = "src/Main.wbas"
toolchain = "0.0.1"

[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

Source ใน project ประกาศ module ให้ตรง root และ path:

```basic
Module App
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

Source ของ dependency อาจเป็น:

```basic
Module Acme.Math

Public Procedure Total(value As Integer) As Integer
  Return value + 12
EndProcedure
```

ชื่อ namespace มาจาก manifest root และ directory ใต้ `src`; ชื่อไฟล์ไม่เพิ่ม namespace
Import อยู่ก่อน declarations และไม่ใช่ textual include Alias ทำให้ qualifier สั้นลงแต่
ไม่ได้ดึงสมาชิกทั้งหมดมาไว้ใน local namespace

## Visibility สามระดับ

- `Public` ใช้ได้จาก package ที่ import เข้ามา
- `Internal` ใช้ได้ทุก namespace ภายใน `.wmod` หรือ main project เดียวกัน
- `Private` ซึ่งเป็นค่าเริ่มต้น ใช้ได้เฉพาะ exact module namespace เดียวกัน รวมหลายไฟล์

`Private` ของ `Acme.Data` จึงใช้จาก `Acme.Data.Migrations` ไม่ได้ แม้ชื่อดูเป็นญาติกัน
ส่วน Internal ใช้ได้หากทั้งคู่มี package identity เดียวกัน Namespace prefix เหมือนกันไม่ให้
สิทธิ์ข้าม package

Visibility ใช้กับ Procedure, Structure, Enum, Flags, Const และ attached procedures
ไม่มี `Protected` เพราะภาษาไม่มี inheritance Public signature เปิดเผย Internal/Private type
ไม่ได้ และ Internal signature เปิดเผย Private type ไม่ได้

Import alias และ generated JSON mapper ไม่ขยายสิทธิ์ Module dependency cycle เป็น compile
error และ spelling/case ของ Module กับ path ต้องตรงแม้ filesystem ของเครื่องนั้นไม่แยก case

## Compile-time platform branch

```basic
CompileIf Compiler.OS = OS.Windows Then
  Import WindowsTools
Else
  Import PosixTools
EndCompileIf
```

`Compiler.OS`, `Compiler.Arch`, `Compiler.Debug` เป็น compile-time constants Compiler
เลือก branch ก่อน name resolution ของ branch ที่ไม่ใช้ จึงซ่อน import ของอีก OS ได้
แต่ delimiters ของทั้งสอง branch ยังต้องสมดุล `If` ปกติทำหน้าที่นี้ไม่ได้เพราะทั้งสองกิ่ง
ต้อง type-check

Standalone `.wbas` ที่ไม่มี Module ใช้ namespace App ได้ แต่ local `.wmod` ต้องผ่าน
`.wproj`; compiler ไม่ค้นหา library จาก working directory แบบคาดเดา รุ่นนี้ยังไม่มี public
DLL loading, C declarations หรือ package manager ส่วนกลาง
