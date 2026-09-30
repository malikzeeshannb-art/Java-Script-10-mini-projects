# Quiz App — Project 3 (10-Project Consolidation Series)

A vanilla JavaScript multiple-choice quiz app, built using only Days 1–50 concepts (arrays of objects, conditionals, DOM manipulation). No frameworks, no `async/await`, no ES6 classes, no closure-based module patterns.

---

## Overview

The app presents one question at a time from a hardcoded array of question objects, tracks the user's score, and shows a results screen at the end with the option to restart. A back button lets the user revisit a previous question, and a progress bar fills as the user moves through the quiz.

---

## Features

- 10 hardcoded questions, each with 4 multiple-choice options
- One question displayed at a time, rendered dynamically from data (no hardcoded HTML per question)
- Score tracking, visible throughout the quiz
- A visual "flash" effect on the quiz container — green for a correct answer, red for a wrong one
- A progress bar that fills smoothly as the user advances
- A back button that returns to the previous question and correctly reverses the score if that question had been answered correctly
- An end screen showing the final score out of 10
- A restart button that resets the entire quiz — score, question index, and answer history — without reloading the page

---

## How It Works

**Data:** All questions live in a single array of objects. Each object has a `question` string, an `options` array, and a `correctAnswer` string that matches one of the options exactly.

**Rendering:** A single `render()` function is the one place responsible for putting the current question and its options on the screen. It always clears the previous content first, then rebuilds from the current state. Every time the state changes — a new question, a score update, moving forward or backward — `render()` is called again to keep the screen in sync.

**Score & history:** A running `score` variable increases only on correct answers. An `answerLog` array records `true`/`false` for each question index once it's been answered, which is what makes the back button able to correctly reverse a score change instead of guessing.

**End of quiz:** Once the current question index reaches the total number of questions, `render()` stops trying to display a question and instead shows the results screen with a restart button.

---

## The Build Journey

This project took about three weeks and was, by a wide margin, the hardest of the three consolidation projects so far — not because of any single bug, but because of one core concept that took real time to click: **that changing a variable does not automatically update the screen, and that a function only runs when something actually calls it.**

A few honest notes on how this one went:

- **The CSS vs. JS dilemma.** Early on, a full week went by styling the shell (grid layout, progress bar container) before any real JavaScript logic existed — a mix of enjoying CSS and forgetting it easily if left alone. The layout looked fine, but zero quiz logic existed yet. The fix was a deliberate decision: stop touching CSS entirely until the JS logic worked end-to-end, even if the app looked plain in the meantime.

- **The wall.** After building the question data and getting the first question's text to render, the next piece — making the options render dynamically, and reacting correctly to clicks — caused real frustration. At one point there was a genuine moment of wanting to quit JavaScript altogether, feeling outpaced by AI tools that could write the whole thing instantly. That frustration was worked through by scaling the project down to a tiny, isolated demo (a fruit-list example with no UI, just a variable and a `render()` function) to isolate the *one* idea that mattered: state changes and DOM updates are two separate steps, and only the second one is visible.

- **The incremental rebuild.** After that reset, the project was rebuilt one small, testable step at a time: render one question → render its options → detect a click → track score → make render() re-run on state change → detect the end of the quiz → build the results screen → add restart. Each step was verified working before moving to the next, which made debugging far more manageable than trying to build everything at once.

- **Real bugs hit and fixed along the way** included: assigning a class via `classList = "..."` (which silently fails), using `querySelector` where `querySelectorAll` or a loop was needed, forgetting that `return` inside a helper function does not stop the function that called it, a CSS `@keyframes` name being declared twice (with the second silently overriding the first), and a back-button score bug caused by trying to track answer history with a single boolean instead of a per-question array.

- **The final consolidation.** Once the app was fully working, the three concepts that had caused the most difficulty — function definition vs. invocation, `return` only exiting its own function, and state changes requiring a manual re-render — were each practiced in isolation with small, separate exercises, independent of the quiz code, to move the understanding from "I can follow this in context" to "I can produce this myself."

---

## Tech Stack

- HTML5
- CSS3 (Grid, Flexbox, `@keyframes` animations)
- Vanilla JavaScript (ES5/early ES6 syntax only — `let`, arrow functions, template literals, array methods like `forEach`)

---

## Related Files

- `CONCEPTS.md` — a running reference of the JavaScript concepts and patterns used in this project, written to be revisited whenever a similar problem shows up in a future project.