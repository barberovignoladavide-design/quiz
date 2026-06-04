document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 🏠 LOGICA PAGINA INDEX
    // =========================

    const startBtn = document.getElementById("startBtn");

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "quiz.html";
        });
    }

    // =========================
    // 🎮 LOGICA PAGINA QUIZ
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

    // Se non siamo nella pagina del quiz, interrompi l'esecuzione
    if (!questionEl) return;

    loadQuestion();

    // Carica la domanda corrente
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

    // Verifica se la risposta è corretta
    function checkAnswer(answer, btn) {
        if (answered) return;
        answered = true;

        const correctAnswers = questions[current].correct;
        const allBtns = answersEl.querySelectorAll("button");

        // Disabilita tutti i bottoni
        allBtns.forEach(b => {
            b.disabled = true;
            // Mostra visivamente quali erano quelle corrette
            if (correctAnswers.includes(b.textContent)) {
                b.classList.add("btn-success");
            }
        });

        // Applica l'animazione al bottone cliccato
        if (correctAnswers.includes(answer)) {
            score++;
            scoreEl.textContent = "Punteggio: " + score;
            btn.classList.add("animate-success");
        } else {
            btn.classList.add("animate-error");
        }
    }

    // Aggiorna la barra di progresso
    function updateProgress() {
        let percent = (current / questions.length) * 100;
        progressBar.style.width = percent + "%";
    }

    // Passa alla domanda successiva
    nextBtn.addEventListener("click", function () {
        current++;
        if (current < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    // Mostra il risultato finale
    function showResult() {
        questionEl.textContent = "Quiz finito ❤️";
        answersEl.innerHTML = "";
        nextBtn.style.display = "none";
        progressBar.style.width = "100%";

        scoreEl.textContent = `Hai azzeccato il ${Math.round((score / questions.length) * 100)}% ti meriti un bacino❤️`;
    }

});
