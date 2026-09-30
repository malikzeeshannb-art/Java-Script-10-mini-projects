/* ============================================================
   Quiz Data
   ============================================================ */
const quizQuestions = [
  {
    question: "In which country is the city of London located?",
    options: ["Pakistan", "Germany", "UK", "France"],
    correctAnswer: "UK"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: "Canberra"
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3"
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1918", "1923"],
    correctAnswer: "1912"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Gd"],
    correctAnswer: "Au"
  },
  {
    question: "Which planet in our solar system spins on its side relative to its orbital plane?",
    options: ["Uranus", "Neptune", "Saturn", "Venus"],
    correctAnswer: "Uranus"
  },
  {
    question: "Who wrote the dystopian novel 1984?",
    options: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "F. Scott Fitzgerald"],
    correctAnswer: "George Orwell"
  },
  {
    question: "What is the primary base ingredient in traditional guacamole?",
    options: ["Tomato", "Avocado", "Jalapeño", "Lime"],
    correctAnswer: "Avocado"
  },
  {
    question: "Which Renaissance artist painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correctAnswer: "Michelangelo"
  }
];

/* ============================================================
   DOM References
   ============================================================ */
const backBtn = document.getElementById("back-btn");
const progressFill = document.getElementById("progressFill");
const mainEl = document.querySelector("main");
const questionText = document.querySelector(".question-area");
const answerArea = document.querySelector(".answer-area");
const scoreDisplay = document.getElementById("current");
const totalDisplay = document.getElementById("total");

/* ============================================================
   State
   ============================================================ */
let currentQuestionIndex = 0;
let score = 0;
const totalQuiz = quizQuestions.length;

// Records true/false for each answered question index.
// This lets the Back button reverse the score correctly
// instead of guessing based on the most recent answer.
let answerLog = [];

totalDisplay.textContent = totalQuiz;
scoreDisplay.textContent = score;

/* ============================================================
   Render — the single source of truth for what's on screen.
   Called once on page load, and again after every state change
   (an answer, going back, or restarting).
   ============================================================ */
function render() {
  answerArea.innerHTML = "";

  // Progress bar reflects how many questions have been completed.
  const progressPercent = (currentQuestionIndex / totalQuiz) * 100;
  progressFill.style.width = progressPercent + "%";

  // If the quiz is finished, show the end screen and stop here —
  // there's no question left to render.
  if (showEndScreenIfFinished()) {
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "ansBtn";
    btn.textContent = option;
    answerArea.appendChild(btn);

    btn.addEventListener("click", () => handleAnswer(option, currentQuestion));
  });
}

/* ============================================================
   Handle an answer click
   ============================================================ */
function handleAnswer(selectedOption, currentQuestion) {
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  answerLog[currentQuestionIndex] = isCorrect;

  if (isCorrect) {
    score = score + 1;
    scoreDisplay.textContent = score;
  }

  flashFeedback(isCorrect);

  currentQuestionIndex = currentQuestionIndex + 1;
  render();
}

/* ============================================================
   Flash the quiz area green (correct) or red (wrong).
   The class is removed and its removal is forced to register
   before being re-added, so the animation replays even when
   two answers in a row give the same result.
   ============================================================ */
function flashFeedback(isCorrect) {
  mainEl.classList.remove("main-area", "main");
  void mainEl.offsetWidth; // forces the browser to register the removal
  mainEl.classList.add(isCorrect ? "main-area" : "main");
}

/* ============================================================
   Back button — revisit the previous question.
   Uses answerLog to reverse the score correctly, then clears
   that question's log entry so it can be answered fresh again.
   ============================================================ */
backBtn.addEventListener("click", () => {
  if (currentQuestionIndex >= 1) {
    currentQuestionIndex = currentQuestionIndex - 1;

    if (answerLog[currentQuestionIndex] === true) {
      score = score - 1;
      scoreDisplay.textContent = score;
    }

    answerLog[currentQuestionIndex] = undefined;
    render();
  }
});

/* ============================================================
   End screen — shown once every question has been answered.
   Returns true if the quiz is finished, so render() knows to
   stop instead of trying to display a question that doesn't exist.
   ============================================================ */
function showEndScreenIfFinished() {
  if (currentQuestionIndex < totalQuiz) {
    return false;
  }

  questionText.textContent = "Quiz Over!";

  const resultText = document.createElement("span");
  resultText.className = "endScreenResult";

  if (score === totalQuiz) {
    resultText.textContent = `Congratulations! You got a perfect score: ${score} out of ${totalQuiz}.`;
  } else if (score >= 1) {
    resultText.textContent = `Your score: ${score} out of ${totalQuiz}.`;
  } else {
    resultText.textContent = `You scored ${score} out of ${totalQuiz}. Better luck next time!`;
  }

  answerArea.appendChild(resultText);

  const resetBtn = document.createElement("button");
  resetBtn.className = "resetBtn";
  resetBtn.textContent = "🔄 Restart";
  answerArea.appendChild(resetBtn);

  resetBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    answerLog = [];
    scoreDisplay.textContent = score;
    render();
  });

  return true;
}

/* ============================================================
   Initial render — shows the first question on page load.
   ============================================================ */
render();