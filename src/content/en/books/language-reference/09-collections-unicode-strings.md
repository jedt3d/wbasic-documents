---
title: "Collections and Unicode Strings"
description: "Arrays, maps, indexing, slicing, value semantics, and string rules"
weight: 9
---

WBasic uses `Array Of T` as its main growable collection, serving the role called ArrayList in some languages without another type name. Key/value collections use `Map Of K To V`; Dictionary is not an alias.

## Array

```basic
Let values As Array Of Integer = [10, 20, 30]
values.Append(40)
values.Insert(1, 15)
PrintLn(values[-1].ToString())
PrintLn(values[1:3].Length.ToString())
```

An Array contains members of one type. A literal needs an expected type from a declaration, parameter, return, or containing collection. Thus `[]` can construct an empty array when context supplies its type.

Indexes start at 0; negative indexes count from the end, so `-1` is the last member. An out-of-range index produces `ErrorKind.Bounds` in debug and release. A slice `[start:stop]` includes start and excludes stop. Omitted start means 0; omitted stop means Length. Negative bounds are normalized and then clamped. A stop before start gives an empty array, not an error.

A slice returns a new collection, not a mutable view. Slice steps and slice assignment are not yet supported. Nested arrays are jagged arrays:

```basic
Let grid As Array Of (Array Of Integer) = [[1, 2], [3]]
grid[0][1] = 9
```

Mutating Array methods such as `Append`, `Insert`, and `RemoveAt` return no value. Methods returning a new value, such as `Filter`, `Sorted`, and `Reversed`, can be chained. `Contains` returns Boolean; `IndexOf` returns the first index as a nullable value. `Insert` accepts positions from 0 through Length, but no negative index.

## Map

```basic
Let scores As Map Of String To Integer = {}
scores["Alice"] = 100
scores["Length"] = 200
PrintLn(scores["Alice"].ToString())
PrintLn(scores.Length.ToString())
```

Keys in this version can be String, Integer, or Enum; values cannot be nullable. Reading `map[key]` for an absent key throws `MissingKey`; `Get(key)` returns a nullable value, and `ContainsKey` returns Boolean. `{}` requires an expected Map type; there is no nonempty Map literal yet.

Maps preserve insertion order. Replacing a key's value leaves it in place; removing and re-adding it moves it to the end. `Keys()` and `Values()` return Arrays in that order. Under value semantics, modifying a Map copy does not modify the original.

Use `[]` for keys. `scores.Alice` is a compile error: dot access is reserved for actual members, so a key named `Length` cannot be confused with the `Length` property.

## Strings are Unicode scalar sequences

```basic
Let text As String = "ก้😀"
PrintLn(text.Length.ToString())
PrintLn(text[0])
PrintLn(text[-1])
PrintLn(text[0:2])
```

Length is 3 because it counts Unicode scalar values, not UTF-8 bytes, UTF-16 code units, or grapheme clusters. Indexing returns a one-scalar String; slicing follows Array rules. Strings are immutable, so `text[0] = ...` is invalid.

WBasic does not normalize text automatically. Strings that look similar but contain different scalar sequences may compare unequal. `.Trim()` uses the Unicode White_Space version pinned with the toolchain. `.Split(separator)` splits on exact substrings and retains empty fields. Byte I/O uses `Array Of Byte`; malformed UTF-8 causes a Conversion error rather than silently substituting U+FFFD.

Do not use `String.Length` to measure TUI display width: one scalar can occupy zero, one, or two terminal cells. Use Tui's text-measurement API with its width profile.
