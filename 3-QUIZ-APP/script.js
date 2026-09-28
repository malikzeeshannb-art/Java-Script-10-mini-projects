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
let scoreDisplay = document.getElementById("current");
let back = document.getElementById('back-btn');
let prograssFill = document.getElementById('prograss-fill');
let main = document.querySelector('main');
let currentQuestionIndex = 0;
let totalQuiz = quizQuestions.length;
let score = 0;
let questionE1 = document.querySelector('.question-area');
let answers = document.querySelector('.answer-area');
let answerLog = [];
// score displaying tracker!
scoreDisplay.textContent = score;

document.getElementById("total").textContent = quizQuestions.length;
        back.addEventListener("click", () => {
    if (currentQuestionIndex >= 1) {
        currentQuestionIndex = currentQuestionIndex - 1;
        if (answerLog[currentQuestionIndex] === true) {
            score = score - 1;
        }
        answerLog[currentQuestionIndex] = undefined;
        scoreDisplay.textContent = score;
        render();
    }
});

    function render() {
        answers.innerHTML = "";
        let progressPercent = (currentQuestionIndex / totalQuiz) * 100;
        prograssFill.style.width = progressPercent + "%";
         if(endScreen()) {
            return;
         }
       questionE1.textContent = quizQuestions[currentQuestionIndex].question;
       let optionA = quizQuestions[currentQuestionIndex].options;

    optionA.forEach((option) => {
        let btn = document.createElement('button');
        btn.className = 'ansBtn';
         btn.textContent = option;
         answers.appendChild(btn);

         btn.addEventListener("click", () => {
            
         if (btn.textContent === quizQuestions[currentQuestionIndex].correctAnswer) {
            answerLog[currentQuestionIndex] = true;
            score = score + 1;

            scoreDisplay.textContent = score;
            main.classList.remove("main-area", "main");
            void main.offsetWidth; 
            main.classList.add("main-area");
            currentQuestionIndex = currentQuestionIndex + 1;
            render()
        
         } else {
             main.classList.remove("main-area", "main");
            void main.offsetWidth;
            main.classList.add("main");
             answerLog[currentQuestionIndex] = false;
             currentQuestionIndex = currentQuestionIndex + 1;
             render()
        }
    }); 
    });
}

  render()
function endScreen() {
    if (currentQuestionIndex >= totalQuiz) {

        //created button for end SCREEN.
        let endScreenResult = document.createElement('span');
        endScreenResult.className = "endScreenResult";
        answers.appendChild(endScreenResult);

        // CREATED button for reseting to start from zeero!
        let resetBtn = document.createElement('button');
        resetBtn.className = 'resetBtn';
        resetBtn.textContent = "🔄 Restart";
        answers.appendChild(resetBtn);

        // logic to start the quiz from zero, when pressing to (RESET).
        resetBtn.addEventListener("click", () => {
            currentQuestionIndex = 0;
            score = 0;
            answerLog = [];
            scoreDisplay.textContent = score;
            render();
        });

        if (score >= 8) {
        questionE1.textContent = "QUIZ OVER!";
        endScreenResult.textContent = `Congratulation! you've got ${score} out of ${totalQuiz}`;
    } else if (score >= 1) {
        questionE1.textContent = "QUIZ OVER!";
        endScreenResult.textContent = `Your scors are:  ${score} out of ${totalQuiz}`;
    } else {
        questionE1.textContent = "QUIZ OVER!";
        endScreenResult.textContent = `You have fail the Quiz Test your marks are:  ${score} out of ${totalQuiz}`;
    }

    return true;
    } else {
        return false;
    }
}
