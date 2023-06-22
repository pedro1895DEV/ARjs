let currentQuestion = 1;
let totalQuestions = 2;
let timeLeft = 10;
let score = 0;

let timerElement = document.getElementById('timer');

AFRAME.registerComponent('marker-handler', {
  init: function () {
    let markerHiro = document.getElementById('marker-hiro');
    let markerKanji = document.getElementById('marker-kanji');

    markerHiro.addEventListener('markerFound', function () {
      selectOption('hiro');
    });

    markerKanji.addEventListener('markerFound', function () {
      selectOption('kanji');
    });
  }
});

function showNextQuestion() {
  currentQuestion++;
  let currentQuestionElement = document.getElementById('question-' + currentQuestion);
  let previousQuestionElement = document.getElementById('question-' + (currentQuestion - 1));

  previousQuestionElement.style.display = 'none';
  currentQuestionElement.style.display = 'block';
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = 'Tempo restante: ' + timeLeft;
  } else {
    if (currentQuestion < totalQuestions) {
      showNextQuestion();
      timeLeft = 10;
    } else {
      localStorage.setItem('score', score);
      window.location.href = 'results.html';
    }
  }
}

function selectOption(markerType) {
  let selectedOption = '';
  if (markerType === 'hiro') {
    selectedOption = 'A';
  } else if (markerType === 'kanji') {
    selectedOption = 'B';
  }

  if ((currentQuestion === 1 && selectedOption === 'B') ||
      (currentQuestion === 2 && selectedOption === 'B')) {
    score++;
  }
}

let countdown = setInterval(updateTimer, 1000);
