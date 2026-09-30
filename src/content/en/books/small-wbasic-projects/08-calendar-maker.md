---
title: "08 · Print a Monthly Calendar"
description: "Calculate weekdays and lay out a calendar from a supplied year and month"
weight: 8
---

{{< project-download "08-calendar-maker" "PLAN.md" >}}
{{< project-download "08-calendar-maker" "draft.wbas.txt" >}}

> **Status: draft chapter; source check passed.** `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and project acceptance remain pending. This is not `main.wbas`.

## Goal and scope

Print a Monday-to-Sunday calendar for one month, using the year and month supplied in `Main`. The example starts with February 2000; change those two values to supply another pair. It does not read the machine clock or use `DateTime`. This chapter uses the proleptic Gregorian calendar, years 1–9999 and months 1–12. Historical calendars in some countries differed before their adoption of the Gregorian system; we choose one rule so the arithmetic has a clear meaning.

## Build the calculation in layers

A leap year is divisible by 400, or divisible by 4 but not by 100. February 2000 therefore has 29 days, while February 1900 has 28. April, June, September, and November have 30 days; the other months have 31. The program checks the year and month ranges before doing the calculation.

Give Monday column 0 and Sunday column 6. The number of days before January 1 of year `y` is `(y−1)×365 + (y−1) Div 4 − (y−1) Div 100 + (y−1) Div 400`. Add the days in earlier months and take `Mod 7`, treating 0001-01-01 as a Monday. For February 2000, there are `730119` days before the year and another 31 in January: `730150 Mod 7 = 1`, so the month starts on Tuesday.

Print three spaces for each column before day 1, then print each day in a three-character cell. Start a new line after seven columns. At the end of the month, print the remaining line just once. Keep the weekday formula and layout separate: if day 1 appears in the wrong column, check the day count before adjusting spaces.

## Draft program to read together

This code block displays exactly the same text as the downloadable draft. The source check passed; actual output still needs a native run.

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Change these two values to supply a year and month.
Procedure IsLeap(year As Integer) As Boolean
  Return year Mod 400 = 0 Or (year Mod 4 = 0 And year Mod 100 <> 0)
EndProcedure

Procedure DaysInMonth(year As Integer, month As Integer) As Integer
  If month = 2 Then
    If IsLeap(year) Then
      Return 29
    EndIf
    Return 28
  EndIf
  If month = 4 Or month = 6 Or month = 9 Or month = 11 Then
    Return 30
  EndIf
  Return 31
EndProcedure

' Monday is column 0. Gregorian 0001-01-01 is Monday.
Procedure FirstWeekday(year As Integer, month As Integer) As Integer
  Let previous As Integer = year - 1
  Let days As Integer = previous * 365 + previous Div 4 - previous Div 100 + previous Div 400
  For m As Integer = 1 To month - 1
    days += DaysInMonth(year, m)
  Next
  Return days Mod 7
EndProcedure

Procedure Cell(day As Integer) As String
  If day < 10 Then
    Return " " + day.ToString() + " "
  EndIf
  Return day.ToString() + " "
EndProcedure

Procedure PrintCalendar(year As Integer, month As Integer)
  If year < 1 Or year > 9999 Or month < 1 Or month > 12 Then
    PrintLn("year must be 1..9999; month must be 1..12")
    Return
  EndIf
  PrintLn(year.ToString() + "-" + month.ToString())
  PrintLn("Mo Tu We Th Fr Sa Su")
  Let column As Integer = FirstWeekday(year, month)
  Let line As String = ""
  For blank As Integer = 1 To column
    line += "   "
  Next
  For day As Integer = 1 To DaysInMonth(year, month)
    line += Cell(day)
    column += 1
    If column = 7 Then
      PrintLn(line)
      line = ""
      column = 0
    EndIf
  Next
  If column > 0 Then
    PrintLn(line)
  EndIf
EndProcedure

Procedure Main()
  Let year As Integer = 2000
  Let month As Integer = 2
  PrintCalendar(year, month)
EndProcedure
```

## Acceptance scenarios still to verify

- **Given** February 2000 **When** the calendar is printed **Then** day 1 is in Tuesday's column, day 29 appears, and day 30 does not.
- **Given** February 1900 **When** the calendar is printed **Then** day 28 appears and day 29 does not.
- **Given** September 2024 **When** the calendar is printed **Then** day 1 is in Sunday's column.
- **Given** month 0 or 13, or year 0 **When** `PrintCalendar` is called **Then** it reports the accepted range without calculating dates.

## Try it and identify the remaining work

Check February 2000 by hand: day 7 is a Monday and day 29 is a Tuesday. Then add input with `ReadLine()` and `Integer.Parse`, treating EOF, malformed text, and out-of-range values separately. Obtaining the current month from the machine clock is library request **SWP-FR-02**; this draft does not assume a `DateTime/Calendar` API. Actual output and boundary years 1 and 9999 still need verification before this becomes a runnable example.

The idea began with [Al Sweigart's original chapter](https://inventwithpython.com/bigbookpython/project8.html); this WBasic explanation and draft were written anew.
