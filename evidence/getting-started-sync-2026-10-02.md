# Getting Started source sync — 2026-10-02

Scope: only `src/content/{th,en}/books/getting-started/` and this evidence note. The Thai text is the editorial source; English follows the same command and code fences.

Source inspected: `origin/main` at `143be583ce875629b430436ed4a4ffc9dac952bf`. The local read-only product worktree was `e7edb1e55f7ed86fa01d816b7b7c00df682bcb4a` and had the same relevant example tree. No product compiler/runtime files were changed. The documentation checkout already had concurrent edits elsewhere; they were preserved.

Primary files: `examples/billing-time-worm/App.wproj`, `src/Main.wbas`, `modules/Billing.wmod/src/Models.wbas` and `Domain.wbas`, `README.md`, and `schema.sql`. Their GitHub links in chapters 5–9 use the immutable source commit prefix `143be58`. Native basis: `docs/rounds/WORM-M3-billing.md` (Windows/macOS ARM64 debug and release billing/fixture gates), `docs/rounds/WORM-M5-ecosystem-contracts.md` (same-host M5 regression), `docs/rounds/WORM-M2-M5-identity-hardening.md` (compiler 0.0.2 WB301 identity rule), and `docs/rounds/v0.0.2-candidate.md` / `docs/rounds/v0.0.2-release.md` (private experimental portable ZIP/package evidence).

Changes:
- Chapters 1–4 retain a small reader-created pure CLI program, pin its manifest to 0.0.2, document `wb check ... --json`, `wb run`, project-only `wb build` and debug/release profiles, and remove the nonexistent `examples/billing-time-cli` claim.
- Chapters 5–9 describe the runnable six-model WORM/SQLite project: explicit application migration/history, mapping and insert intent, saved rates, writer admission, row-version links, rollback, and native fixtures.
- Removed proposed attribute/fluent/migration API claims. Compiler identity WB301 is scoped to one compiled program; persistent database schema identity is not automatically checked.
- Source-built developer toolchain/SDK requirements are distinguished from the private experimental matched portable ZIP and the separate fresh-host no-SDK gate. Core CLI has no Node requirement.

Verification: compared all nine bilingual chapter pairs; each has the same number and bytes of fenced code/commands (01:2, 02:3, 03:3, 04:5, 05:2, 06–08:1 each, 09:2). Searched these chapters for stale `Planned`/attribute/fluent examples, 0.0.1 pin and unsupported check/build wording. The only `billing-time-cli` mentions explain that the path does not exist. No broad compiler or native suites rerun for this documentation-only change; prior immutable product evidence is cited above.

Limits: chapter 1–4's small CLI is an instructional reader-created project, not a committed executable fixture. Full WORM example and native fixture are in the source repository. The billing example does not establish production tax, currency, date-validation or rounding policy, general provider support, fresh-host no-SDK acceptance, or measured human/AI savings.
