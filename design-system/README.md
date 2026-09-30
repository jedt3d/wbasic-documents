# Wbasic design system sources

This directory preserves the design-system inputs used by the default Hugo
theme in `documents/src/themes/wbasic/`.

- `wbasic-design-system-spec.md` and `wbasic-design-tokens.json` came from the
  user-supplied `wbasic-design-spec-export.zip` dated 2026-09-30.
- IBM Plex Sans and IBM Plex Mono font files were extracted byte-for-byte from
  the offline typography specimen in that export. Their OFL texts are retained
  under the theme's `static/licenses/` directory.
- IBM Plex Sans Thai Regular, Medium, SemiBold, and Bold were added because the
  reference source is Thai. They come from the official IBM Plex repository at
  commit `763c36ef9117782905ae010056dfbe8fd2653a25` and use the same SIL Open
  Font License.
- IBM Plex Sans Thai Looped Regular, SemiBold, and Bold WOFF2 files come from
  `@ibm/plex-sans-thai-looped` 1.1.0 at the same pinned commit. The Thai site
  uses their Thai glyph range only for reading paragraphs; Latin text, titles,
  controls, tables, and code retain their existing families.

The JSON file is the machine-readable token reference. The theme maps those
tokens into CSS custom properties; it is not loaded directly by Hugo.
