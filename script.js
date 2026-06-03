
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 🏠 INDEX PAGE
    // =========================

    const startBtn = document.getElementById("startBtn");

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "quiz.html";
        });
    }

    // =========================
    // 🎮 QUIZ PAGE
    // =========================

    const questions = [
        {
            question: "Dove ci siamo conosciuti?",
            answers: ["Scuola", "Internet", "Per caso", "In piscina"],
            correct: ["In piscina"]
        },
        {
            question: "Chi è più testardo tra noi due?",
            answers: ["Te", "Giulia", "Non Dadda", "La lei della coppia"],
            correct: ["Te", "Giulia", "Non Dadda", "La lei della coppia"]
        },
        {
            question: "Qual è il nostro momento preferito?",
            answers: ["Quando ridiamo", "Quando mangiamo", "Quando stiamo insieme", "Tutti"],
            correct: ["Tutti"]
        },
        {
            question: "Chi pensa di più all'altro?",
            answers: ["Io", "Tu", "Entrambi", "Nessuno"],
            correct: ["Entrambi"]
        },
        {
            question: "Chi è il più bello della coppia?",
            answers: ["Dadda", "Giulia", "Entrambi", "Nessuno"],
            correct: ["Giulia"]
        }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const scoreEl = document.getElementById("score");
    const progressBar = document.getElementById("progressBar");
    const nextBtn = document.getElementById("nextBtn");

    // se non siamo nel quiz, esci
    if (!questionEl) return;

    loadQuestion();

    function loadQuestion() {

        answered = false;

        const q = questions[current];

        questionEl.textContent = q.question;
        answersEl.innerHTML = "";

        q.answers.forEach(answer => {

            const btn = document.createElement("button");
            btn.classList.add("btn", "btn-outline-danger", "w-100");
            btn.textContent = answer;

            btn.addEventListener("click", () => checkAnswer(answer, btn));

            answersEl.appendChild(btn);
        });

        updateProgress();
    }

    function checkAnswer(answer, btn) {

        if (answered) return;
        answered = true;

        const correctAnswers = questions[current].correct;
        const allBtns = answersEl.querySelectorAll("button");

        allBtns.forEach(b => {
            b.disabled = true;

            if (correctAnswers.includes(b.textContent)) {
                b.classList.remove("btn-outline-danger");
                b.classList.add("btn-success");
            }
        });

        if (correctAnswers.includes(answer)) {
            score++;
            scoreEl.textContent = "Punteggio: " + score;
        } else {
            btn.classList.add("btn-danger");
        }
    }

    function updateProgress() {
        let percent = (current / questions.length) * 100;
        progressBar.style.width = percent + "%";
    }

    nextBtn.addEventListener("click", function () {

        current++;

        if (current < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {

        questionEl.textContent = "Quiz finito ❤️";

        answersEl.innerHTML = "";

        nextBtn.style.display = "none";

        progressBar.style.width = "100%";

        scoreEl.textContent =
            `hai azzeccato il ${Math.round((score / questions.length) * 100)}% ti meriti un bacino❤️`;
    }

});