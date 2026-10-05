# Billing Time Getting Started refresh — 2026-10-06

## Scope and source boundary

- Updated Thai and English Getting Started chapters 5–9 from the current read-only local the language repository’s local `billing-time/` sources: `README.md`, `docs/QuickStart.md`, `billing-time.wproj`, `src/Main.wbas`, `modules/Billing.wmod/src/Models.wbas`, `modules/Billing.wmod/src/Domain.wbas`, `schema.sql`, and `scripts/verify.py`.
- Translated all ten final English Getting Started pages (`_index.md` and chapters 1–9) into Japanese. Chapters 1–4 remain the reader-created, four-line CLI program producing 210 minutes and 18,000 cents. Chapters 5–9 describe the separate six-line SQLite application.
- The local `billing-time` tree was not edited. The website's `downloads/billing-time-source.zip` and `downloads/billing-time/` files are coordinator-supplied source snapshots; the lessons link there, not to an unmerged GitHub path.
- Release 0.1.0 sealed source `3901cf17ce971dd0c7f591b424d73b086610fc46` remains distinct from the local example's compiler-source claim `dfdcbdc`.

## Source comparison

| Subject | Current source | Lesson treatment |
|---|---|---|
| Manifest and entry | `billing-time.wproj`, `src/Main.wbas`; bundled `Worm` and local `Billing` | Correct filenames and snapshot links |
| Arguments | Zero or one nonempty SQLite path; default `billing-time-demo.sqlite`; invalid arity/empty path checked before open | Chapters 6 and 9 explain both paths and errors |
| Migration | `ApplyMigration` runs seven prepared DDL statements individually in one transaction and records LF-joined text under `001_billing_time` | Chapter 6 explains explicit migration and changed-SQL error; `schema.sql` is a reading companion, not a file to pass directly to `Worm.Execute` |
| Rows and rates | Six mapped structures; nullable `InvoiceId`; rate snapshot on time entry | Chapters 5 and 7 describe mapping, row version, omission versus Null, and saved rate |
| Amount | Checked integer multiplication, then `Div 60`; sample 120×6000 and 90×4000 | 18,000 integer cents, truncation for non-integral quotients, no currency/tax/date/business-rounding policy |
| Invoice | Header is first write before unbilled selection; lines and links in one transaction; no automatic retry | Chapter 8 states writer admission, duplicate guards, transaction scope, and uncertain commit outcome |
| Repeat | Each run adds customer, project, services, time entries, and draft invoice | Chapter 9 says a reused file appends, with ID depending on existing data |

## Checks

- Local `node verify-source.mjs`: PASS, 560 Markdown files checked for UTF-8/balanced fences and 144 valid local links. This is source validation, not native execution or a site build.
- Japanese versus final English: all ten filenames present; exact equality of fenced code blocks, `relref` shortcodes, and `weight` values for every page (10/10).
- Coordinator-reported native snapshot checks against the **sealed published 0.1.0 CLI**, source `3901cf17`: Windows ARM64 and macOS ARM64 debug/release passed, including fresh 18,000-cent result, repeat invoice `#2`, invalid arguments before database open, default-path and explicit-path runs. The first Mac transport attempt had a PowerShell SSH CR appended to the CLI path; transport was corrected and the retry passed without source or runtime change. Native binaries, logs, and snapshot hashes are owned by the coordinator's integration evidence.
- No site build, generated HTML, Git mutation, or publication was performed in this authoring lane.
