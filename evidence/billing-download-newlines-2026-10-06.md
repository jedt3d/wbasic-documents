# Billing download checkout portability — 2026-10-06

After publication of `docs-v2026.10.06.1` at `4248114`, live metadata, all ten
sampled TH/EN/JA HTML pages and the binary source ZIP matched the delivery.
The Markdown plan was identical after canonical LF normalization. A raw task
file comparison exposed Windows Git checkout conversion: the generated Billing
download copies had been restored as CRLF, while the verified source and deployed
copies use LF. The source-only LF attribute did not cover `html/downloads/`.

The repair applies `text eol=lf` to both Billing source/download trees. It does
not change the application, compiler, translation, source ZIP or native evidence.
The integrity guard remains exact; it is not relaxed to accept different bytes.
The previous tag stays immutable. The corrected publication is
`docs-v2026.10.06.2`.

Validation uses Git's actual checkout-index conversion with `core.autocrlf=true`
into an isolated ignored directory, checks all twenty source/generated files
against the recorded ten-file inventory, rebuilds the site, and runs the complete
publication guards. Its measured outcome is recorded in the coordinator's
local check logs and GitHub Pages workflow. This is a documentation checkout
fix; native tests retain their prior sealed source and results.
