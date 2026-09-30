# Project 13 plan: Evolve a grid of life one generation at a time

Status: `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and acceptance remain pending; there is no `main.wbas`.

Goal: Calculate one generation from a 5×5 Boolean grid and print before and after, without a live display.
Data: Nested arrays; `True` means alive. Cells beyond the edge are dead, and the grid does not wrap.
Method: Count eight neighbors using only the old grid. A cell lives next if it has three neighbors, or if it is alive and has two. Build a new array before replacing the generation.
Hand trace: A horizontal line at `(2,1)`, `(2,2)`, `(2,3)` produces a vertical line at `(1,2)`, `(2,2)`, `(3,2)`.
Acceptance to verify: Given the horizontal line, it becomes vertical; given an all-dead grid, it stays dead; given a 2×2 block, it remains unchanged; given one living corner cell, it dies.
Remaining work: Run one and several generations natively and check malformed grids and boundaries. Live play requires an event loop and terminal behavior using existing TUI/Jobs capabilities, tested at those boundaries. This is not a request for a new API.
Exercise: Calculate generation 2 by hand and separate printing from calculation.

Thanks to Al Sweigart, author of The Big Book of Small Python Projects. This WBasic plan was written anew from the original idea.

Original idea: https://inventwithpython.com/bigbookpython/project13.html

`draft.wbas.txt` has passed only a source check; it is not a verified runnable example.
