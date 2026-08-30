# Vanilla JavaScript Calculator

A basic calculator built using **only vanilla JavaScript** — no frameworks, no libraries. This is the second project in a 10-project consolidation series, built strictly using concepts covered in Days 1–50 of a structured JavaScript curriculum: variables, functions, parameters, conditionals, DOM selection, and event listeners.

## Features

- Digit buttons `0–9`
- Operators: `+`, `−`, `×`, `÷`
- `=` (equals) and `C` (clear) buttons
- Left-to-right chained operations (e.g. `4 + 5 × 2` evaluates as `(4 + 5) × 2 = 18`, not standard order of operations)
- Divide-by-zero handling — displays `"Error"` instead of crashing or showing `NaN`/`Infinity`
- Leading-zero prevention on digit entry
- Full state reset on `C`, with no leftover values from the previous calculation

## How It Works — State Model

The calculator is driven by four state variables:

| Variable | Purpose |
|---|---|
| `currentValue` | What's currently being typed / shown on screen |
| `previousValue` | The number stored before an operator was pressed |
| `operatorHolder` | The pending operator (`"p"`, `"m"`, `"mu"`, `"d"`) or `null` |
| `equal` | A flag tracking whether the last action was pressing `=`, so the next digit press knows whether to start fresh or append |

Every button click reads or updates these variables through one of four core functions: `numberHolder()`, `operator()`, `calculation()`, and `btnEqual()` — each button's `addEventListener` calls the relevant function, passing in its own value.

## Project Journey

This project was built **twice**, intentionally, as part of a learning process:

1. **First build** — Constructed step by step, one function at a time, in a mentorship-style session with Claude AI acting as a senior developer doing code review. Each piece (digit handling, operator handling, calculation, equals, clear) was written, tested, and debugged individually — with bugs pointed out and traced through, not fixed directly, so the reasoning had to be worked out independently.

2. **Second build (from memory)** — Once the first version was complete and working, the entire project was deleted and rebuilt from scratch using only the original requirements brief — no reference to the old code. This rebuild took **over a week** and surfaced several of the exact same edge-case bugs from the first pass (notably around "what happens when you press a digit right after `=`" and "chaining an operation after `=`"), which were then debugged and fixed independently, confirming the underlying logic had actually been understood rather than just copied.

## Repository Locations

- [10 Mini Projects Collection](https://github.com/malikzeeshannb-art/Java-Script-10-mini-projects/tree/main/2-Calculator-Project)
- [JavaScript Learning Journey](https://github.com/malikzeeshannb-art/my-javascript-learning-journey/tree/main/playground%2Funderstanding-switch%2F2-calculator-part-of-mini-projects)

## Files

- `index.html` — markup and button layout
- `style.css` — styling
- `script.js` — calculator logic
- `README.md` — this file
- `CONCEPTS.md` — breakdown of the core JavaScript concepts demonstrated

## How to Run

Clone or download the repository and open `index.html` in any browser. No build step or dependencies required.

## Author

Built by [malikzeeshannb-art](https://github.com/malikzeeshannb-art) as part of an ongoing front-end development learning journey.
