# Independent Thai technical-editor and English parity review — 2026-10-02

Scope: the current uncommitted canonical Markdown in `src/content/{th,en}/`, reviewed against the merged language source `143be583ce875629b430436ed4a4ffc9dac952bf` (the available product checkout at `e7edb1e55f7ed86fa01d816b7b7c00df682bcb4a` has the same relevant Git tree). This is a source and contract review, not a new native run or publication approval. The author lanes own corrections; this review does not edit their pages or generated HTML.

## Corrections requested and resolution

1. Resolved: `src/content/th/books/getting-started/08-billing-time-invoice-transaction.md:7` and its English counterpart initially reversed the transaction and project-owner read. Both now follow `examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas:158–174`: begin transaction, read owner on that transaction, then insert header as first write.
2. Resolved: the same pages initially claimed every failure rolled the group back. They now distinguish a pre-commit rollback attempt from dispatched-commit `Unknown`, and warn against repeating the operation before investigating the database outcome.
3. Resolved: the same paragraph now attributes persistence, ordinary rollback and empty drafts to the Billing fixtures, while naming the separate WORM M5 outcome hooks for `Unknown`.

## Final review observations

- Getting Started chapters 5–9 now use the real `examples/billing-time-worm` mapping, transaction and query API rather than the earlier proposed fluent/attribute API. `WB301` is scoped to compiled-program mapping identity, not persistent schema validation. The `toolchain = "0.0.2"` manifest and `wb check ... --json` command reflect the compiler. Chapters 1–4 clearly distinguish their reader-created CLI project from the committed WORM example.
- The WORM reference states the finite scalar/mapping/query/transaction surface, omission versus `Null`, `Failed` versus `Unknown`, and SQLite/Jobs/provider limits. The terminal page records bounded cleanup while ownership remains held and confines positive Windows OSC52 forwarding to the pinned isolated ConPTY endpoint.
- The implementation-status pages separate compiler 0.0.2 and packaged VSIX 0.1.0 from the unmerged R8B 0.2.0 guide. The latter's chapters carry entry warnings in both editions. The extension's new chapter 0 now gives the actual optional VSIX path inside the private ZIP, makes the separately installed specification command's limit clear, and distinguishes ZIP use from source builds. The page describes prior Windows/macOS evidence as prior evidence; this editorial pass makes no new native claim.
- Thai is readable and follows a patient teaching sequence with restrained humor. English follows the same concepts and examples. All fenced blocks in 40 paired pages across Getting Started, VS Code, standard-library and API-reference are byte-identical.

**Editorial result: Approved for integration of the reviewed source.** The three corrections above were reinspected in both editions against the product source and M5 outcome boundary. This approval covers technical/editorial parity only; site build, native/package verification, Git integration and any publication decision belong to their separate gates.
