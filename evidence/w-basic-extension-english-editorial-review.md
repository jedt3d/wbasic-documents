# WBasic Extension Guide — English editorial review

## Scope

Reviewed the English introduction and 12 chapters against the approved Thai
edition and the verified R8B behavior boundary. The review covers all headings,
steps, checkpoints, command names, settings, limitations, links, code examples,
and ten replaceable screenshot slots.

## Translation decisions

- VS Code command titles, WBasic API names, settings, file names, and capability
  identifiers remain literal so readers can search for the exact UI or symbol.
- Every fenced code and console example is byte-for-byte identical to the Thai
  edition. Thai strings inside WBasic examples remain intact because they teach
  Unicode behavior rather than untranslated prose.
- Humor was adapted where it reads naturally in English and removed where a
  literal translation would distract from the technical instruction.
- Development Build, production/no-SDK distribution, DAP debugging, formatting,
  Marketplace publication, and unverified platform acceptance retain the same
  boundaries as the Thai edition.
- Screenshot captions and accessible alt text are translated while filenames
  stay shared between editions.

## Automated checks

The English-edition verifier requires page-for-page Thai/English parity, matching
weights, identical fenced examples, no Thai prose outside fenced examples,
same-chapter language switching, complete search parity, and valid generated
links. The extension-guide verifier separately requires the 13 source/generated
pages and all ten screenshot filenames.

This is an editorial and generated-site review. It does not replace the native
compiler and extension verification already recorded for R8B.
