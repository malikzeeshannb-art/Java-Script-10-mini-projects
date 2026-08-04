# JavaScript — 10 Mini Projects

A collection of 10 small, self-contained projects built with **plain HTML, CSS, and JavaScript** — no frameworks, no libraries. Each project was built after completing the first 50 days of a structured JavaScript learning roadmap, and focuses on combining core fundamentals (arrays, objects, DOM manipulation, events, and `localStorage`) into real, working applications.

This repository exists as a **consolidation phase** — a bridge between finishing the fundamentals and moving into more advanced JavaScript (closures, `this`, classes, async/await, and beyond).

---

## 📁 Repository Structure

A single `index.html` at the root acts as the **hub page** for the whole series — it lists every project as a card, links to whichever ones are live, and marks the rest as upcoming. Each individual project still lives in its own numbered folder, built and committed independently:

```
Java-Script-10-mini-projects/
│
├── index.html          ← hub page (lists & links every project below)
├── README.md            ← this file
│
├── #1-TO-DO-list/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── CONCEPTS.md
│
├── #2-Calculator/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── CONCEPTS.md
│
├── #3-Quiz-App/
├── #4-Registration-Form/
├── #5-Expense-Tracker/
├── #6-Weather-Card/
├── #7-Library-Manager/
├── #8-Notes-App/
├── #9-Shopping-Cart/
└── #10-Personal-Dashboard/
```

Every project folder follows the same pattern:
- **`index.html`** — page structure
- **`style.css`** — styling
- **`script.js`** — application logic
- **`CONCEPTS.md`** — a written breakdown of every JavaScript/DOM concept used in that specific project, explained in detail for future reference

### Adding a new project to the hub

The root `index.html` builds its cards from a single JavaScript array — the same array + `forEach` pattern used inside the To-Do List project itself. To publish a new project, only one thing needs to change: add one object to that array (title, folder name, status, and concept tags). The card, the link, and the progress bar all update automatically — no HTML needs to be touched by hand.

> ⚠️ **Note on folder names:** every folder uses a leading `#` (e.g. `#2-Calculator`). A `#` has special meaning inside a URL, so the hub page encodes it automatically before building links — this is handled in code and never needs to be done manually.

---

## ✅ Project Checklist

| # | Project | Status |
|---|---|---|
| 1 | To-Do List | ✅ Completed |
| 2 | Calculator | ⏳ Not started |
| 3 | Quiz App | ⏳ Not started |
| 4 | Registration Form | ⏳ Not started |
| 5 | Expense Tracker | ⏳ Not started |
| 6 | Weather Card | ⏳ Not started |
| 7 | Library Manager | ⏳ Not started |
| 8 | Notes App | ⏳ Not started |
| 9 | Shopping Cart | ⏳ Not started |
| 10 | Personal Dashboard (Capstone) | ⏳ Not started |

---

## 🎯 Purpose of This Series

Each project is deliberately scoped to use **only concepts covered through Day 50** of the learning roadmap:

- Variables, data types, operators
- Conditionals and loops
- Functions and scope
- Arrays and array methods
- Objects
- DOM selection and manipulation
- Event listeners
- Form handling and validation
- `localStorage`

No `async/await`, no closures, no ES6 classes, no external libraries — those are intentionally saved for the next phase. The goal here is **depth over breadth**: fully understanding how these fundamentals combine to build real, interactive applications before adding more complexity on top.

---

## 🛠 How Each Project Was Built

Every project in this repository was built using a deliberate, incremental approach:
1. Break the project into small, testable steps
2. Implement one step at a time, testing in the browser before moving on
3. When stuck, isolate the specific concept causing difficulty and practice it separately before returning to the main build
4. Document every concept used, in plain language, inside that project's `CONCEPTS.md`

This structure is intentional — it's not just about finishing 10 projects, but about being able to explain *why* each one works, not just that it does.

---

## 🔗 Live Projects

All projects are browsable from one place: **[open the project hub →](./index.html)**

The hub page lists every project in the series, links to whichever ones are already built, and marks the rest as upcoming — it updates automatically as new projects are added, so this README doesn't need to be edited every time.

---

## 📌 Note

This repository is a work in progress and will be updated as each of the 10 projects is completed, in order.
