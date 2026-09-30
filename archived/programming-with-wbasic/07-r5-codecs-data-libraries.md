# 7. JSON codecs, Http, Sqlite และ Csv

**R5 developer gate ผ่าน:** source fixture ของ Http, Sqlite/Csv และ generated JSON codecs รันบน Windows/macOS ARM64 แล้ว ดู [หลักฐาน R5](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/evidence/r5-complete-2026-09-28.json), [round report](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/rounds/R5-streams-data-libraries.md) และ [ดัชนี R5](../r5-feature-index.md) บท [6](06-r5-streams-json-values.md) สอน `Json.Value` แบบ dynamic และ stream ที่เป็นพื้นฐานของบทนี้

## แปลง JSON เป็นชนิดที่กำหนดไว้

ใน [codecs-structure.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-structure.wbas) `Json.Decode(Of Record)(text)` สร้าง `Structure Record` ที่รู้ชนิดขณะ compile; `Json.Encode(Of Record)(row)` สร้างข้อความ JSON จากชนิดเดียวกัน `Json.ToValue`/`FromValue` เชื่อมกับ `Json.Value` และ `Json.Write`/`Read` ใช้ `TextWriter`/`TextReader` ที่มีอยู่แล้ว ไม่มี public reflection, `Any` หรือการแปลง String โดยเดาชนิด

```wbasic
Import Json

Structure Record
  [SerializedName("id")]
  Id As Integer
  Name As String = "guest"
  Email As String?
  [SerializeIgnore]
  Cache As String = "hidden"
EndStructure

Procedure Main()
  Let row As Record = Json.Decode(Of Record)("{\"id\":7}")
  PrintLn(Json.Encode(Of Record)(row))
EndProcedure
```

ผลที่ตรวจแบบ exact คือ `{"id":7,"Name":"guest","Email":null}` ค่า default ของ `Name` ถูกเติม, `Email` ที่ขาดกลายเป็น null, `Cache` ไม่ถูก serialize แต่ยังมีค่าใน `row` หากเปิด `strictFields:=True`, field ที่ไม่รู้จักรายงาน `Json.UnknownField` พร้อม path เช่น `$.extra`; field ที่ต้องมีแต่ขาดรายงาน `Json.MissingField` พร้อม path `$.id` [codecs-nested.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-nested.wbas) ตรวจ Array/Map ซ้อนกัน, path `$.Children[0].extra` และ Byte นอกช่วงที่ `$.Scores.a` [codecs-customer.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-customer.wbas) ตรวจ Integer `9007199254740993`, nested Structure, default/nullable และ strict fields [project fixture](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/projects/r5-codecs/App.wproj) ตรวจชนิดที่ประกาศข้าม source module

## HTTP ที่ขอบเครือข่าย

[http.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/http.wbas) ใช้ `Import Http` และ `Http.Get(url)` แบบ synchronous ค่า `Http.Response` มี `StatusCode`, `Text()` และ `EnsureSuccess()` HTTP 404 ยังคืน response; `EnsureSuccess()` จึงค่อยโยน `ErrorKind.Network` `Text()` ถอด UTF-8 อย่างเคร่งครัดและโยน `Conversion` เมื่อ byte ไม่ถูกต้อง ตัว runtime ใช้ engine ที่รองรับการทำงาน async และ pool ภายใน แต่ภาษารุ่นนี้ยังไม่มี public `Await` หรือ streaming response

ตัวอย่างรันกับ loopback เท่านั้น: [test-r5-http.mjs](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-r5-http.mjs) สร้าง server ชั่วคราวให้ตอบ 200 ภาษาไทย, 404, redirect, redirect loop, UTF-8 ผิด และ body แบบ chunked เกิน 8 MiB แล้วตรวจ stdout, จำนวน redirect และ error code (`Http.RedirectLimit`, `Http.ResponseTooLarge`) URL ที่ไม่ใช่ `http`/`https` เป็น `Validation` ไม่ต้องใช้ public Internet เส้นตายรวมของ request คือ 30 วินาที; limit redirect คือ 5 hops

## ฐานข้อมูลจริงและ CSV bytes

[sqlite-csv.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/sqlite-csv.wbas) เปิดฐานข้อมูลจริงด้วย `Sqlite.Open`, ส่งค่าเข้าคำสั่งผ่าน `?` และ `Sqlite.BindInteger/String/Bytes/Null` โดยไม่ต่อ SQL จากค่าผู้ใช้ `db.Query` คืน cursor; `rows.Read()` เลื่อนทีละแถว และ getter ระบุชนิดชัดเจน `GetStringOrNull` แยก SQL NULL จาก String ที่ผิดชนิด การปิด `Sqlite.Transaction` ที่ยังไม่ commit จะ rollback; `BackupTo` ใช้ online backup หลังปิด cursor/transaction

fixture นี้เขียน `9007199254740993`, `ไทย, "Alice"\nทีม`, SQL NULL และ BLOB ที่มี byte `0, 255, 65` จากนั้นส่งออกด้วย `Csv.Create(path)` และ `WriteRow(Array Of String)` ค่า Integer ต้องแปลงด้วย `.ToString()` เอง ตัวตรวจ [test-r5-data.mjs](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-r5-data.mjs) เปรียบเทียบไฟล์ UTF-8 **เป็น bytes** กับ `id,name,note\r\n9007199254740993,"ไทย, ""Alice""\nทีม",missing\r\n` และเปิดฐานข้อมูลสำรองเพื่อตรวจว่ามีเพียงแถวที่ commit แล้ว CSV writer ใช้ CRLF เป็นค่าปริยายและ quote field ที่มี delimiter, quote หรือ CR/LF; มันไม่ใช่ Excel `.xlsx`

หลัง build compiler/runtime แบบ native บน Windows หรือ macOS ARM64 จาก repository root ให้รัน:

```sh
node examples/r5/run-data-lesson.mjs
```

ตัวตรวจรัน codec programs แบบ exact, project imports, loopback HTTP, SQLite temporary files และบททดสอบ matcher แยก failure class; ค่า `WB_CLI` กับ `WB_RUNTIME_LIB` ใช้เลือก binary ที่ build ไว้ได้ นี่เป็น developer native lesson ไม่ใช่หลักฐาน clean-machine packaging อนาคต: public async language/Jobs, `Db.Row`/`Any`, YAML/XML และ `.xlsx` ยัง **Planned**
