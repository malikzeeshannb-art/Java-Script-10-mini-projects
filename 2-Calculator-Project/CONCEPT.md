# Calculator — Vanilla JavaScript Project

A functional calculator built entirely with vanilla JavaScript, HTML, and CSS — no frameworks, no external libraries. This is the second project in a 10-project consolidation series, built after completing Day 50 of a structured 70-day JavaScript learning curriculum, using only the concepts covered through that point: variables, functions, conditionals, DOM manipulation, and event listeners.

## Features

- Digit input (0–9) with correct leading-zero handling
- Four basic operators: addition, subtraction, multiplication, division
- Left-to-right chained calculations (e.g., `4 + 5 × 2` evaluates as `(4 + 5) × 2 = 18`, not standard operator precedence)
- `=` supports repeated presses and continued chaining after a result (e.g., `5 + 3 = + 2 =` → `10`)
- `C` performs a full state reset from any point in a calculation, including mid-operation
- Division-by-zero protection — displays a clear error instead of crashing or showing `Infinity` / `NaN`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (arrow functions only — no async/await, closures as a pattern, classes, or modules)

## Project Structure

```
├── index.html
├── style.css
└── script.js
```

## How the Calculator Works

The core of the calculator is three state variables that track everything happening at any given moment:

- `currentValue` — the number currently being typed or displayed
- `previousValue` — the number stored before an operator was selected
- `operatorHolder` — the pending operator, if any

A fourth variable, `equal`, is a boolean flag that solves one specific problem: after pressing `=`, the next digit typed should start a brand-new number rather than being appended to the previous result. Without this flag, typing `7` right after `5 + 3 =` would incorrectly produce `87` instead of `7`.

Each button click calls one of four functions — a digit handler, an operator handler, a calculation function, or a clear function — and each of those functions reads and updates the shared state variables above rather than managing its own private data.

## Development Story

This project was built in two separate passes, working with Claude AI as a senior-developer-style reviewer rather than a code generator.

**First pass:** Built step by step, in small increments — state variables, then the digit-handling function, then wiring it to all ten buttons, then the operator function, then the calculation function, then the trickier edge cases around `=` and `C`. At every step, Claude described the expected outcome and pointed out bugs by walking through variable traces, but never wrote the implementation directly — that part was done independently.

**Second pass:** The entire project was deleted and rebuilt from scratch, from memory, using only a short 3–4 point requirements brief with no step-by-step guidance. This rebuild took a little over a week and surfaced several subtle bugs that hadn't fully "stuck" the first time around — particularly around what should happen to the calculator's internal state immediately after pressing `=`. Tracking these down required manually tracing the value of every state variable through each button press in sequence, which is ultimately what made the underlying logic click.

## Key Concepts Practiced

See [CONCEPTS.md](./CONCEPTS.md) for a full breakdown of the JavaScript and DOM concepts this project reinforces.

## Running the Project

Clone the repo and open `index.html` in any browser — no build step, no dependencies, no installation required.