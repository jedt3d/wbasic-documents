---
title: "HTTP"
weight: 50
---

สถานะ: **synchronous GET ผ่าน R5 บน Windows/macOS ARM64**

```basic
Import Http

Http.Get(url As String) As Http.Response
response.StatusCode As Integer
response.Text() As String
response.EnsureSuccess()
```

```basic
Let response As Http.Response = Http.Get("https://example.invalid/data")
response.EnsureSuccess()
PrintLn(response.Text())
```

ตัวอย่าง URL ด้านบนมีไว้แสดง signature ไม่ใช่ runnable success fixture
ชุดทดสอบจริงใช้ loopback server ที่กำหนดผลลัพธ์แน่นอน

- transport/TLS/DNS/redirect failure รายงาน `ErrorKind.Network`
- `EnsureSuccess` ปฏิเสธ non-success status; `Http.Get` เองยังคืน response เช่น 404
- `Text()` decode UTF-8 แบบตรวจเข้มและรายงาน `Conversion` เมื่อ body ไม่ถูกต้อง
- จำกัด redirect และ response size; เกินขอบเขตรายงาน error ชัดเจน
- รองรับเฉพาะ HTTP(S); เช่น `file:` รายงาน `Validation`
- engine มี connection pooling แต่ API สาธารณะในรุ่นนี้ยัง synchronous

Windows ใช้ Schannel ส่วน macOS ใช้ Security Framework ทั้งคู่ตรวจ certificate
ตาม platform การเรียกใน TUI callback ถูกห้าม; ใช้ `Jobs.Start` เพื่อให้ UI ยัง
ตอบสนองได้
