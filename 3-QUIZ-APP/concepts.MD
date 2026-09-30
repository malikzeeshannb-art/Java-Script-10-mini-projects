# JavaScript Concepts — Project 3 (Quiz App)

A reference for concepts and patterns used in this project. Written to be re-read whenever a future project hits a similar wall — if the symptom looks familiar, the fix is probably here.

---

## 1. Function Definition vs. Function Invocation

Writing `function doThing() { ... }` only stores a set of instructions under a name — it does **not** run them. The code inside only runs when something calls the function, using `doThing()` with parentheses.

**The trap:** passing `doThing()` (called, with parentheses) into something like `addEventListener` runs it immediately and passes its *return value* instead of the function itself. The fix is to wrap it: `addEventListener("click", () => doThing())`, or pass the bare function name with no parentheses if no arguments are needed: `addEventListener("click", doThing)`.

**Rule of thumb:** parentheses after a function name mean "run this now." No parentheses means "here's a reference to this, run it later."

---

## 2. `return` Only Exits Its Own Function

`return` inside a function stops *that function* — it has no effect on whatever function called it. A "stop everything" moment requires the caller to check the callee's return value and decide to return itself.

```js
function checkLimit(num) {
  if (num > 10) return true;   // tells the caller something
  return false;
}

function process(num) {
  if (checkLimit(num)) {
    return;                    // process() decides to stop, based on what it was told
  }
  console.log("Processing:", num);
}
```

This exact pattern is what makes `render()` stop building question options once the quiz is over — `render()` checks `endScreen()`'s return value and returns itself if the quiz has ended.

---

## 3. Changing State Doesn't Auto-Update the DOM — Re-render Is Required

A variable is just a value sitting in memory. Changing it (`index = index + 1`) does not touch the screen by itself. The screen only updates when a function that reads that variable and writes to the DOM is explicitly called again.

**The pattern, every time:**
1. Change the state (increment an index, update a score).
2. Call the render function again, so it re-reads the new state and rebuilds the DOM from it.

Skipping step 2 is the single most common reason a working-looking app "does nothing" on click.

---

## 4. The Render Function Pattern

One function (`render()`) is the single place responsible for reflecting the current state onto the screen. It's called once on page load, and again after every state change (a click, a restart, going back).

A solid render function should, in order:
1. **Clear** whatever it's about to rebuild (`container.innerHTML = ""`).
2. Read the **current state** (e.g. `quizQuestions[currentQuestionIndex]`).
3. **Rebuild** the DOM from that state.
4. Re-attach any event listeners the new elements need (listeners don't survive `innerHTML = ""`, since the old elements are destroyed).

Duplicating this logic in more than one place (e.g. once for the initial question, once inside a separate function for "next question") is a common source of bugs — keep it in one function only.

---

## 5. Clear Before You Rebuild

If new elements are appended to a container that already has old elements in it, both sets stay on screen — they stack. Always clear the container (`container.innerHTML = "";`) at the start of a render, before appending anything new.

---

## 6. `classList` Pitfalls

- `element.classList = "someClass"` does **not** work — `classList` has no setter, so this silently fails with no error. Use `element.className = "someClass"` (replaces all classes) or `element.classList.add("someClass")` (adds without removing others) instead.
- `querySelector(".someClass")` returns only the **first** matching element. If multiple elements share a class, `querySelectorAll` or a loop is needed to reach all of them.

---

## 7. Tracking Per-Item State With an Array

A single variable (like a boolean) can only remember *one* fact at a time — it can't tell you the history of several separate items (like 10 quiz questions). When each item needs its own remembered result, use an array indexed by position:

```js
let answerLog = [];
answerLog[currentQuestionIndex] = true;  // this specific question was correct
```

This is what allows the back button to check *the specific question being returned to* rather than guessing based on general "was the last answer right" state.

---

## 8. Re-triggering a CSS Animation From JavaScript

If the same class is added twice in a row without ever being removed, the browser sees no change and won't replay the animation. The fix is to remove the class, force the browser to acknowledge that change, then re-add it:

```js
element.classList.remove("flash-correct", "flash-wrong");
void element.offsetWidth;   // forces the browser to apply the removal before continuing
element.classList.add("flash-correct");
```

Reading a layout property like `offsetWidth` forces the browser to calculate layout immediately, rather than batching the remove-then-add into one invisible step.

---

## 9. Duplicate `@keyframes` Names Silently Override

If two `@keyframes` rules share the same name, the browser does not merge them — the one that appears **last** in the file wins for that name entirely, regardless of which selector uses it. Keep animation names unique per effect (e.g. `flash-correct` and `flash-wrong`, not two versions of the same name).

---

## 10. Calculating Progress as a Percentage

```js
let progressPercent = (currentQuestionIndex / totalQuiz) * 100;
```

This turns "how far through the list am I" into a 0–100 value that can be dropped straight into a `width` style. Because `currentQuestionIndex` naturally starts at 0 (empty) and reaches `totalQuiz` when the last item is done (full), this calculation needs no extra adjustment — it only works correctly, though, if it's recalculated inside the render function every time, so it stays in sync whether the index goes forward or backward.

**A related layout note:** to show progress as a *fill* rather than a resizing shape, use two nested elements — an outer "track" that stays a fixed size, and an inner "fill" whose width is the one that changes. Resizing a single element that also defines the border/shape will distort the shape itself instead of showing a clean fill.