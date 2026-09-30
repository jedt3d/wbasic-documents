# Project 08 plan: Print a monthly calendar from a year and month

Status: `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and acceptance remain pending; there is no `main.wbas`.

Goal: Print one month from a year in 1–9999 and a month in 1–12 supplied in `Main`. Do not read the machine clock.
Data: The year, month, and starting weekday; Monday is column 0 and Sunday is column 6. Use the proleptic Gregorian calendar.
Method: A leap year is divisible by 400, or divisible by 4 but not by 100. Days before January 1 of year y equal (y−1)×365 + (y−1) Div 4 − (y−1) Div 100 + (y−1) Div 400. Add the days in earlier months and take Mod 7. Print three spaces before the first date for each skipped column, then dates in three-character cells.
Hand trace: February 2000 has 730150 days before the month; Mod 7 is 1, so it starts on Tuesday and has 29 days.
Acceptance to verify: Given February 2000, day 1 is Tuesday and day 29 appears; given February 1900, it has 28 days; given September 2024, day 1 is Sunday; given an invalid year or month, report the accepted range.
Remaining work: Run natively, check boundary years 1 and 9999, and parse input while distinguishing EOF, malformed text, and out-of-range values. Reading the current month from the machine clock is library request SWP-FR-02; do not assume a DateTime/Calendar API.
Exercise: Separate calculation from layout before adding `ReadLine()` and `Integer.Parse` input.

Thanks to Al Sweigart, author of The Big Book of Small Python Projects. This WBasic plan was written anew from the original idea.

Original idea: https://inventwithpython.com/bigbookpython/project8.html

`draft.wbas.txt` has passed only a source check; it is not a verified runnable example.
