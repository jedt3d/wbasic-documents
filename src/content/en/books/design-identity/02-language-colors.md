---
title: "The Language's Colors"
description: "Five identity colors, their roles, and how to use them without sacrificing readability"
weight: 2
---

WBasic uses just five identity colors. A small palette does not impoverish the design. It gives each color a clear job and helps new pages belong alongside existing ones without copying their entire layout.

{{< identity-palette >}}

## Proportions that keep a page calm

A light page starts with roughly 60% Mist, 25% Charcoal, 10% Teal, 3% Sage, and 2% Sand. These are starting proportions, not a prescription. A page with substantial code naturally contains more Charcoal; a conceptual explanation may barely need Sand.

- **Teal** provides accent lines, small details, focus indicators, and large display text.
- **Sage** supports panels, selected navigation, and code tokens.
- **Sand** is used sparingly for notes and string or number values in code.
- **Charcoal and Mist** do most of the reading work: contrast matters more than visual excitement.

Teal on Mist has a contrast ratio of about 4.35:1, so it is not used for ordinary small text. Links use Charcoal text with a Teal underline, keeping both readability and a recognizable accent. Charcoal paired with Mist, Sage, or Sand exceeds 7:1.

## Color has a role, but never speaks alone

A selection combines a Sage background, text weight, and a Teal border. Notes have written headings; errors explain what happened. Color should not become an accidental color-vision test.

Dark mode uses Charcoal backgrounds and Mist text. Underlines and focus indicators change to Sage, while notes keep Sand backgrounds with Charcoal text. Code blocks retain their character, gaining a Sage border to distinguish them from the surrounding surface.

This is not a complete status palette. If future interfaces need several levels of success, warning, or critical states, those semantic colors should be designed deliberately. Teal should not inherit every job simply because it is already available.
