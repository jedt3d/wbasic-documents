# Project 73 plan: Validate or solve a Sudoku grid

Status: `draft.wbas.txt` passed `wb check --json` with the pinned compiler and no diagnostics. Native execution and acceptance remain pending; there is no `main.wbas`.

Draft goal: Check a partially filled 9×9 grid for conflicts. Do not claim it is solved or solvable.
Data: Nested arrays; `0` means empty and `1..9` are filled digits. Use `seen[1..9]` for each group.
Method: Check dimensions before indexing. Check rows, columns, and 3×3 boxes separately. Ignore zero, but reject out-of-range values and repeated positive digits.
Hand trace: The first row `5,3,0,0,7,0,0,0,0` is legal in itself. Changing `(0,2)` to 5 collides with `seen[5]`.
Acceptance to verify: Given the example board, it is legal so far; given a repeated digit in a row, column, or box, reject it; given a short row or −1/10, reject it; given empty cells, never report completion.
Solver plan: Select a zero cell, try candidates 1..9 allowed by its row, column, and box, recurse, and restore zero on a dead end. No empty cell means one solution. To prove uniqueness, count until a second solution is found, then stop.
Generator plan: Start with a complete board, remove a clue, and count solutions after each removal. Keep the removal only if exactly one solution remains. Random order requires a defined seed and tested PRNG range. The library request is SWP-FR-01; the draft uses no such API.
Remaining work: Run the checker natively; implement and test a solver with no-solution and multiple-solution cases; prove generator uniqueness; handle input. First exercise: implement `IsComplete` separately from `ValidBoard`.

Thanks to Al Sweigart, author of The Big Book of Small Python Projects. This WBasic plan was written anew from the original idea.

Original idea: https://inventwithpython.com/bigbookpython/project73.html

`draft.wbas.txt` has passed only a source check; it is not a verified runnable example.
