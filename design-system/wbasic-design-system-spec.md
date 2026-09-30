# Wbasic design system

Color & typography specification · Version 1.0 · 30 September 2026

## Purpose and scope

Wbasic (Tungsten BASIC language) should feel calm, dependable, approachable, and open to the future. This document defines the visual foundations and use-case styles for an existing language-reference website. It is framework-independent: no Hugo configuration, templates, or theme replacement is supplied.

Use `wbasic-typography-guide.html` as the visual specimen. It embeds its fonts and works offline. Use `wbasic-design-tokens.json` as a machine-readable reference; it is a documented custom JSON schema, not a theme-specific import format. The earlier color guide remains the palette reference.

## 1. Color palette

Exactly five identity colors. Keep most surfaces quiet; let teal mark deliberate points of emphasis.

| Name | Stable token | Value | Intended role |
| --- | --- | --- | --- |
| Tungsten charcoal | color.charcoal | #26343D | Body text, wordmark, buttons, dark surfaces |
| Deep teal | color.teal | #237F83 | Primary brand accent; details, outlines, large display text |
| Mist | color.mist | #F3F6F4 | Main canvas and text on dark surfaces |
| Sage | color.sage | #B9CEC4 | Supporting panels, table headers, code keywords |
| Warm sand | color.sand | #D9C5A4 | Occasional notes, code strings and numbers |

Suggested light-page visual balance: 60% mist, 25% charcoal, 10% teal, 3% sage, 2% sand. This is a starting composition, not a quota or a requirement to use all five colors in each component.

### Semantic roles

| Role | Light page | Dark page |
| --- | --- | --- |
| Canvas | Mist | Charcoal |
| Main text / headings | Charcoal | Mist |
| Supporting panel | Sage | Charcoal, with sage boundary |
| Secondary text | Charcoal; smaller size, no faded opacity | Mist; smaller size, no faded opacity |
| Link text | Charcoal, teal underline | Mist, sage underline |
| Selected navigation | Sage fill, charcoal label, teal edge | Sage fill, charcoal label, sage edge |
| Primary button | Charcoal fill, mist label | Charcoal fill, mist label, sage border |
| Secondary button | Mist fill, charcoal label and border | Mist fill, charcoal label and border |
| Note | Sand fill, charcoal text and edge | Sand fill, charcoal text and edge |
| Code block | Charcoal fill, mist text | Charcoal fill, mist text, sage border |
| Focus on page canvas | Teal | Sage |
| Essential border on pale colored panels | Charcoal | Charcoal |

Sage dividers on mist are decorative, not sufficient as the only boundary of an essential control. Focus indicators must contrast with their immediate surroundings: use charcoal on sage/sand panels and sage or mist on charcoal. Use a 3px outline with a 4px offset when space permits.

### Contrast and meaning

Charcoal paired with mist, sage, or sand exceeds 7:1 contrast. Teal on mist is approximately 4.35:1; keep it out of ordinary small text. Use it for text at least 24px regular or about 19px bold, or for non-text accents with sufficient contrast. Teal on charcoal is too weak for small text. These statements concern color pairs, not a complete accessibility audit.

Never communicate status by hue alone. Pair selections with weight and borders; label notes, errors, warnings, and success explicitly. The five identity colors are not a complete semantic status palette.

## 2. Font families

| Role | Family | Required files / styles |
| --- | --- | --- |
| Branding, headings, English prose, UI | IBM Plex Sans | Normal 400, 500, 600, 700; italic 400 |
| Thai reading paragraphs | IBM Plex Sans Thai Looped | Normal 400, 600, 700; Thai glyph range only |
| Code, syntax, identifiers, paths, terminal, shortcuts | IBM Plex Mono | Normal 400, 500; italic 400 |

Use Sans 600 for headings and the wordmark, 400 for English reading, 500 for controls, and 700 sparingly for strong inline emphasis. On Thai pages, use Thai Looped 400 for Thai glyphs in lead and paragraph text, with 600/700 available for inline emphasis. Titles, navigation, buttons, tables, and code keep their existing families. Use Mono 400 for code and 500 only for deliberate emphasis. Keep code tracking normal and preserve whitespace. Use real italic files; avoid bold-italic combinations unless those additional files are supplied. Do not stretch, condense, outline, or synthetically slant fonts.

Sans fallback: system-ui, sans-serif. Mono fallback: Consolas, monospace. Host fonts locally in the website and retain the OFL license. The guide embeds the font bytes so it remains self-contained. Check glyph coverage when introducing other scripts; use the appropriate Plex companion family if needed.

## 3. Typography scale

Sizes use rem, based on a 16px browser default; do not lock the root size or disable user zoom.

| Role | Family / weight | Size | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Wordmark | Sans 600 | 1.75rem / 28px | 1.2 | -0.035em |
| Marketing display, optional | Sans 600 | 3–6rem / 48–96px responsive | 1.02 | -0.045em |
| Reference page H1 | Sans 600 | 2.25–3.25rem / 36–52px responsive | 1.2 | -0.02em |
| H2 | Sans 600 | 1.75rem / 28px | 1.2 | -0.02em |
| H3 | Sans 600 | 1.25rem / 20px | 1.2 | -0.02em |
| Lead paragraph | Sans 400 | 1.375rem / 22px | 1.5 | normal |
| Body | Sans 400 | 1.125rem / 18px | 1.65 | normal |
| Navigation | Sans 500; selected 600 | 0.9375rem / 15px | 1.5 | normal |
| Button | Sans 500 | 1rem / 16px | 1.4 | normal |
| Table | Sans 400; header 600 | 1rem / 16px | 1.65 | normal |
| Metadata / caption | Sans 400 | 0.875rem / 14px | 1.5 | normal |
| Short eyebrow label | Sans 500 | 0.75rem / 12px | 1.5 | 0.12em |
| Code / inline identifier | Mono 400 | 0.9375rem / 15px | 1.65 | normal |

Use sentence case in headings. Uppercase is for short labels and literal language tokens. Follow semantic heading order independently of the selected visual style. Do not uppercase code automatically.

## 4. Layout rhythm

- Body reading measure: maximum 68ch. Lead text: maximum 55ch.
- Spacing steps: 4, 8, 16, 24, 32, 48px (0.25, 0.5, 1, 1.5, 2, 3rem).
- Body paragraph bottom margin: 20px / 1.25rem.
- Section heading spacing: 40px above, 16px below.
- Note and code padding: 24px desktop; 16px narrow screens.
- Corner radius: 6px / 0.375rem. Keep shapes restrained.
- At roughly 760px and below, place navigation above the reading column or use the existing site's accessible navigation pattern.
- Never shrink source text to fit; make long code lines horizontally scrollable. Normal prose must reflow at narrow widths and with text zoom.

## 5. Use-case specifications

### Brand and page header

Set `Wbasic` in Sans 600, charcoal on mist. A small teal square or dot may act as a secondary signature, not as essential content. On charcoal use mist lettering and a sage detail. Keep the wordmark to two colors. The visual examples are typographic styling, not a finalized bespoke logo asset.

### Language-reference article

Order content: category label, statement/function name as H1, brief purpose, syntax, parameters, behavior, examples, related topics. Use Sans for explanations, Mono for literal syntax and identifiers. Maintain H2/H3 hierarchy. Any supplied BASIC-style example is illustrative; verify actual Wbasic semantics separately.

### Navigation and table of contents

Use compact Sans labels with comfortable padding. Active item: semibold weight, visible left edge, contrasting panel, and `aria-current="page"` where appropriate. Links must work without relying on color. Keep visible keyboard focus; a table of contents uses meaningful heading links.

### Links and buttons

Use readable charcoal text with a teal underline on mist; in dark mode use mist text and sage underline. Hover may thicken the underline. Primary button: mist label on charcoal; secondary: charcoal label on mist with a charcoal border. Use Sans 500 at 16px, roughly 10px vertical and 16px horizontal padding. Buttons perform actions; links navigate. Do not use the identity teal fill with small mist text, because it misses 4.5:1 contrast.

### Inline code and keyboard shortcuts

Mono 400, 15px, charcoal on a sage tint-free solid fill, small padding and a 3px radius. Long file paths may wrap; source blocks preserve formatting. Use semantic `code`, `kbd`, and `samp` elements where applicable. Do not convert case or punctuation.

### Code block / terminal

Charcoal background, mist text, Mono 400 at 15px/1.65. Sage keywords/operators/comments, sand strings/numbers, mist identifiers/punctuation. Italic comments may reinforce their role. Keep contrast high; do not use teal for code text. Terminal output may remain monochrome. No Wbasic lexer is assumed; plain text is acceptable until a correct highlighter is available. Scrolling regions must be keyboard reachable and labeled.

### Parameter and compatibility tables

Sans 400 body, 600 headers, 16px. Sage header fill and charcoal text. Use real table headers. Left-align prose and identifiers; right-align comparable numeric values and enable tabular numerals. Provide a labeled horizontal-scroll region for wide tables rather than clipping data.

### Notes and cautions

Sand background, charcoal text and a charcoal edge; add a clear written title. Avoid large stretches of bold text. A caution must explicitly say what needs attention; the color alone must not carry its meaning. For critical error/success states, extend the semantic specification deliberately rather than silently reassigning brand colors.

### Dark mode

Optional for the existing site. Reverse canvas/text roles to charcoal/mist; code retains its dark surface and receives a sage border. Notes remain sand with charcoal text. Replace teal text/underlines with readable mist/sage treatments. This spec does not require building a theme switch.

## 6. Implementation handoff

1. Map the supplied semantic token names into your existing theme's naming convention.
2. Load only the specified font files; preserve font license notices. Consider WOFF2 equivalents for production bandwidth; the standalone guide uses embedded original TTF files.
3. Apply the type roles and component styles in the current templates. No markup or configuration replacement is prescribed.
4. Verify light/dark text pairs, keyboard focus, narrow viewports, zoom, long identifiers, and long tables in the real site.
5. Confirm actual Wbasic syntax independently of visual demonstration content.

## Sources and font licensing

- IBM Plex Sans: https://fonts.google.com/specimen/IBM+Plex+Sans
- IBM Plex Sans Thai Looped: https://fonts.google.com/specimen/IBM+Plex+Sans+Thai+Looped
- IBM Plex Mono: https://fonts.google.com/specimen/IBM+Plex+Mono
- IBM Plex project: https://github.com/IBM/plex

IBM Plex is distributed under the SIL Open Font License. Full original license texts are embedded in the typography guide and included in the export. No endorsement by IBM is implied.
