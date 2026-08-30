# Core JavaScript Concepts Used in This Project

A reference breakdown of the main concepts this calculator demonstrates — useful for revisiting later, or for anyone browsing the repo who wants to understand the reasoning behind the code, not just the code itself.

## 1. Variables as Shared State

Four variables (`currentValue`, `previousValue`, `operatorHolder`, `equal`) declared once, outside any function, act as the calculator's "memory." Every function reads and writes to this shared state rather than each function tracking its own private data. This is the core pattern behind the whole project: a small number of variables, updated consistently, drive all the behavior.

## 2. Functions & Parameters (Reuse Over Repetition)

Instead of writing separate logic for each of the 10 digit buttons, one function (`numberHolder(num)`) is written once and reused ten times, with each button passing in its own digit as an argument. The same pattern applies to the four operator buttons calling `operator(opr)`. This is the difference between a parameter (a placeholder that receives a different value each call) and hardcoding a specific value inside the function body.

## 3. Conditionals (`if` / `else if`)

Used throughout to branch behavior based on state:
- Deciding whether to replace or append a digit (`numberHolder`)
- Deciding whether a calculation needs to run before a new operator is stored (`operator`)
- Selecting which arithmetic operation to perform (`calculation`)
- Guarding against division by zero before doing the actual division

## 4. DOM Selection

`document.getElementById()` is used to grab a reference to the display and every button once, at the top of the script, storing each in a variable for reuse — rather than querying the DOM repeatedly inside event handlers.

## 5. Event Listeners

`addEventListener("click", callback)` connects each button to a specific function call. The callback is typically a small arrow function whose only job is to call the real logic function with the right argument — keeping the "what happens" (the named functions) separate from the "when it happens" (the listeners).

## 6. Type Conversion — `Number()` and `String()`

The display works with strings (so digits can be concatenated as text), but arithmetic requires numbers. `Number(currentValue)` converts the string for calculation, and `String(result)` converts the numeric result back for display and further digit-building. Mixing these up — e.g. comparing a string `"0"` to the number `0`, or using `+` on two strings expecting math — was the source of several early bugs.

## 7. String Concatenation vs. Numeric Addition

`currentValue + num` inside `numberHolder` is **text concatenation**, building the visible number one character at a time (`"5" + "3"` → `"53"`). `Number(previousValue) + Number(currentValue)` inside `calculation()` is **real addition**. Both use the `+` operator, but do completely different things depending on the types involved — a key JavaScript gotcha this project runs into directly.

## 8. Boolean Flags for Cross-Function Signaling

The `equal` flag doesn't hold a value used in calculation — it holds a signal: "the last action was pressing `=`." `btnEqual()` sets it to `true`; `numberHolder()` checks it to decide whether the next digit should start a fresh number or append to the previous result. This is a common pattern for coordinating behavior across functions that don't call each other directly.

## 9. Guard Clauses / Early `return`

Inside `calculation()`, the divide-by-zero check uses `return` to exit the function immediately once `"Error"` is displayed — preventing the rest of the function (which would otherwise overwrite the display or attempt an invalid calculation) from running. This is a cleaner alternative to wrapping the remaining code in an `else` block.

## 10. Function Composition

`operator()` calls `calculation()` internally when a new operator is pressed while one is already pending. This is what makes chaining work (`4 + 5 × 2`) without duplicating the arithmetic logic inside `operator()` itself — one function delegates part of its job to another.

## Bugs Encountered & Lessons Learned

These recurred across both build attempts and are worth remembering:

- **Forgetting to reset `operatorHolder` to `null` after a calculation** — caused chained operations after `=` to silently use stale state instead of the fresh result.
- **Treating `=` the same as a new operator press** — reusing the operator-handling function for equals caused the "next digit" and "next chained operator" cases to conflict; equals needed its own function.
- **Routing the `C` (clear) button through the same function as the operators** — caused clear to accidentally trigger a calculation instead of resetting immediately.
- **Setting `display.textContent` a second time after an early `return`** — an "Error" message from divide-by-zero was being instantly overwritten by a later line in the calling function that unconditionally re-rendered the display.
- **A boolean flag set but never checked** — declaring `equal` and updating it correctly, but forgetting to actually read it anywhere, meant it had zero effect on behavior despite looking correct.
- 
