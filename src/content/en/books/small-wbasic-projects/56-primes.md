---
title: "56 · Find Primes in a Bounded Range"
weight: 56
---

{{< project-download "56-primes" >}}

We find primes from 0 through 30, separating the question “Is this value prime?” from printing the answers. The program uses Integer, Boolean, and procedures, without a square-root API.

## Download and run

After configuring `wb` and the native toolchain from Getting Started, open the downloaded file's folder:

```powershell
wb check main.wbas --json
wb run main.wbas
```

The output should have ten lines:

```text
2
3
5
7
11
13
17
19
23
29
```

The search range is fixed, so the program ends by itself. Its output can be saved as an expected result without timing a manual stop.

## Read the code

{{< project-source "56-primes" >}}

`IsPrime` first rejects values below 2: zero, one, and negative integers are not prime. It then tries divisors from 2 upward. A zero remainder proves compositeness immediately, so no further divisors are needed.

If a composite number has a pair of factors, at least one is no greater than its square root. The condition `divisor <= value Div divisor` gives that bound for positive integers without calculating a root or risking overflow from `divisor * divisor`. Starting at 2 also avoids division by zero.

If no divisor is found, the procedure returns `True`. `Main` owns the search range and display, allowing a change in presentation without changing the math.

## Cases worth trying

Call `IsPrime` for -1, 0, 1, 2, 9, and 25. Only 2 should be true. These cases catch both the definition's lower boundary and perfect squares. Accidentally replacing `<=` with `<` can let 9 through.

As an extension, collect results in `Array Of Integer` and print the count. Verify both that there are ten results and that they are the correct ten values; a wrong set can have the right count.

## Scope and origin

This is trial division for learning, not a large-prime tool for cryptography, and makes no performance claim for huge inputs. Inspired by [Project 56: Prime Numbers](https://inventwithpython.com/bigbookpython/project56.html) by Al Sweigart. This version has a bounded search and uses integer division instead of a square-root call.
