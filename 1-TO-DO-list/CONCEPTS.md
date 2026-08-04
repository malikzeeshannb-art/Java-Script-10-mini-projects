# 📚 Concept Reference — To-Do List Project

> A detailed breakdown of every concept used in this project — what it does, how it works, and exactly where it was applied. Meant to be revisited any time these concepts need a refresher, and readable enough for anyone else browsing the repo.

---

## DOM Selection & Setup

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| `document.getElementById()` | Searches the entire HTML document for a single element that has a specific `id` attribute, and returns that element as a JavaScript object so it can be read from or controlled. If no element with that id exists, it returns `null`. | Used at the very top of `script.js` to grab references to the input field, the Add button, the `<ul>` list, and the counter `<p>` — `let inp = document.getElementById("taskInput");` and similarly for the other three. These four variables became the "handles" used throughout the rest of the file to interact with the page. |

---

## Data Structures — Arrays & Objects

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| **Array** (`let tasks = []`) | A single variable that can hold an ordered collection of multiple values. Unlike a plain variable (which holds one value), an array can grow, shrink, and be looped over. | `tasks` is the **single source of truth** for the whole app. Every task the user creates lives inside this array. Nothing is ever drawn on the screen unless it first exists in `tasks`. |
| **Object** (`{ text: "...", completed: false }`) | A structure that groups related pieces of data together under named keys (properties), instead of scattering them across separate variables. | Each individual task is represented as an object with two properties: `text` (the task's wording) and `completed` (whether it's checked off). This keeps everything about one task bundled together, so it can be pushed into the array as a single unit. |
| `array.push(item)` | Adds a new item to the **end** of an array, permanently changing that array. | Used every time a new task is created: `tasks.push(newTask);` — this is what actually adds the task to the data layer (not the screen — the screen is handled separately by rendering). |
| `array.splice(index, count)` | Removes a specific number of items from an array, starting at a given index, and modifies the array in place. `splice(index, 1)` removes exactly one item at that position. | Used for deleting a task: `tasks.splice(index, 1);` removes only the task at that specific position in the array, leaving all others untouched. |
| Array indexing (`tasks[index]`) | Accesses a specific item in an array by its numeric position (starting at 0). | Used throughout to reach a *specific* task object so its properties could be changed — e.g. `tasks[index].completed = box.checked;` reaches into the correct object first, then changes its `completed` property. |

---

## Looping & Rendering

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| `array.forEach((item, index) => {...})` | Runs a block of code **once for every item** in an array, automatically, without needing to write repetitive code for each item manually. It also optionally provides the current item's index (position) as a second parameter. | Used inside `renderTasks()` to loop through the entire `tasks` array and build one `<li>` (with a checkbox, text, and delete button) for every task object it finds. The `index` parameter was essential later for knowing exactly which task to update or delete. |
| The **render function pattern** (`renderTasks()`) | A dedicated function whose only job is to look at the current state of the data (`tasks`) and redraw the entire visible list to match it — clearing out whatever was there before and rebuilding from scratch. | This was the single most important structural decision in the project. The rule followed throughout: **never edit the screen directly — always update the `tasks` array, then call `renderTasks()` to redraw everything based on the new data.** This avoids the screen and the data ever falling out of sync with each other. |
| `element.innerHTML = ""` | Clears out all existing child content inside an element. | Used as the very first line inside `renderTasks()` — `list.innerHTML = "";` — to wipe the old list before rebuilding it fresh from the array. Without this, every render would duplicate old items instead of replacing them. |

---

## Building & Modifying Elements

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| `document.createElement("tag")` | Creates a brand new HTML element in memory (not yet visible on the page) of the specified tag type, such as `"li"`, `"input"`, `"span"`, or `"button"`. | Used inside the render loop to build a fresh `<li>`, checkbox `<input>`, `<span>`, and `<button>` for every single task, every time the list renders. |
| `element.textContent` | Sets or reads the plain text inside an element (safer than `innerHTML` for plain text, since it doesn't interpret HTML tags). | Used to place the task's wording into its `<span>` (`span.textContent = task.text;`) and to update the "tasks left" counter. |
| `element.appendChild(child)` | Inserts a given element as the last child inside a parent element, making it actually appear on the page. | Used repeatedly to assemble each task: the checkbox, span, and delete button are each appended into the `<li>`, and the finished `<li>` is then appended into the `<ul>`. |
| `element.classList.add("name")` | Adds a CSS class to an element without disturbing any classes it already has. | Used to apply the `"done"` class to a task's `<span>` when that task's `completed` property is `true`, triggering the strikethrough style defined in CSS. |
| `element.classList.remove("name")` | Removes a specific CSS class from an element, if it's present. | Used in the `else` branch during render, to make sure a task that is *not* completed never keeps a leftover `"done"` class. |
| `element.classList.toggle("name")` | Switches a class on if it's currently off, and off if it's currently on — in a single call, without needing to manually check its current state first. | Used in the standalone "Light Switch" and "Mini Task List" practice exercises to flip a class based on a checkbox click, without writing a manual `if/else` check. |

---

## Events & User Interaction

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| `element.addEventListener("click", callback)` | Attaches a function to an element that will run automatically whenever that specific event (here, a click) happens on it. | Used on the Add button (to create a task), on every checkbox (to toggle completion), and on every Delete button (to remove that task) — each dynamically created inside the render loop, so every task gets its own independent set of listeners. |
| `checkbox.checked` | A property on a checkbox `<input>` that reflects whether it is currently ticked (`true`) or unticked (`false`). It can be **read** (to check current state) or **set** (to force a state). | Read inside the click listener to capture the checkbox's *new* state right after the user clicks it: `tasks[index].completed = box.checked;`. Also set during rendering — `box.checked = task.completed;` — so a freshly created checkbox correctly reflects saved data. |
| `string.trim()` | Removes whitespace from the beginning and end of a string, without affecting spaces in the middle. | Used on the input value before checking whether it's empty: `inp.value.trim()`. This ensures that typing only spacebar characters is treated the same as submitting nothing at all. |

---

## Browser Storage

| Concept | What It Does | How & Where It Was Used |
|---|---|---|
| `localStorage.setItem(key, value)` | Saves a piece of data in the browser's persistent storage under a given key name. This data survives page refreshes and browser restarts (until manually cleared). **Important limitation: the value must be a string** — it cannot store arrays or objects directly. | Used inside `saveAndRender()` to save the entire tasks array: `localStorage.setItem("tasks", JSON.stringify(tasks));`. Called every time the array changes — after adding, deleting, or toggling a task — so no change is ever lost. |
| `localStorage.getItem(key)` | Retrieves whatever was previously saved under a given key. Returns the saved string, or `null` if nothing has ever been saved under that key. | Used once, at the top of the script on page load, to check whether any previous session's data exists. |
| `JSON.stringify(value)` | Converts a JavaScript array or object into a plain string representation, so it can be stored somewhere that only accepts text (like `localStorage`). | Applied to the `tasks` array immediately before saving, turning the array of task objects into a single string that `localStorage` can actually accept. |
| `JSON.parse(string)` | Does the reverse of `stringify` — takes a string that represents JSON data and converts it back into a real, usable JavaScript array or object. | Applied to the string retrieved from `localStorage` on page load, converting it back into a proper array so it can be assigned back to `tasks` and looped over normally. |
| Null-checking before parsing (`if (savedData !== null)`) | A safety check to avoid trying to process data that doesn't exist yet. | Used because on a user's very first visit, `localStorage.getItem("tasks")` returns `null` (nothing has ever been saved). Attempting to `JSON.parse(null)` directly would either error or produce unusable data, so this check ensures `tasks` only gets overwritten with parsed data when real saved data actually exists — otherwise it stays as a clean empty array. |

---

## The Core Mental Model Behind All of It

Everything above supports one central idea, repeated throughout the build:

> **The `tasks` array is the only source of truth. The screen is never edited directly — it is only ever *redrawn* from the array, using `renderTasks()`. Any time the array changes, the screen is told to redraw, and the array is told to save.**

If a future project ever feels confusing, coming back to that one sentence is usually enough to re-orient.