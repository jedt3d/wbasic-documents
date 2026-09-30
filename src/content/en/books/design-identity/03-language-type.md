---
title: "The Language's Typography"
description: "IBM Plex for prose, Thai, and code, with a practical reading hierarchy"
weight: 3
---

WBasic uses **IBM Plex Sans** for branding, headings, English prose, and interface text. **IBM Plex Sans Thai** handles Thai headings and interface text, while **IBM Plex Sans Thai Looped** gives continuous Thai paragraphs familiar letterforms that are easy to distinguish. **IBM Plex Mono** handles code, identifiers, paths, terminal output, and keyboard shortcuts. These related families let readers move between explanation and code without feeling that they have entered another website.

{{< identity-type >}}

## Hierarchy before font size

The wordmark and headings use Sans 600, continuous prose uses 400, and controls use 500. Weight 700 is reserved for strong emphasis. Code uses Mono 400, with 500 where emphasis is useful; every token need not shout.

Body text is 18px with a line height of 1.65 and a width of about 68 characters. Leads use 22px/1.5 with a width of up to 55 characters. This accommodates Thai's stacked vowels and tone marks as well as English's line rhythm. Browser zoom remains available: reading should not require passing an eye test first.

The Looped rule applies only to characters in the Unicode Thai block (`U+0E00–U+0E7F`) within leads and paragraphs. Through `unicode-range`, Latin letters, Arabic numerals, and punctuation outside that range continue to use IBM Plex Sans. Headings, navigation, buttons, tables, and code are unaffected by this rule.

## Code must be accurate before it is attractive

Mono preserves the source's whitespace and punctuation. Do not change case, compress letter spacing, or shrink the text to squeeze in long lines; allow horizontal scrolling. Comments use a real italic font file rather than a browser-generated slant. Do not synthesize bold italic when that font file has not been supplied.

Website fonts are stored in the repository with their SIL Open Font License. Terminal fonts are chosen by the user and terminal host, so Thai shaping, cell width, and fallback require separate checks. TlwgMono or a Nerd Font may suit a particular terminal, but neither automatically replaces the website's typography. Work clothes and formal clothes can share a wardrobe without being the same outfit.
