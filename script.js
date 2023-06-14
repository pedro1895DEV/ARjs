let currentQuestion = 1;
const totalQuestions = 2;
let score = 0;
let timeLeft = 10;

const timerElement = document.getElementById('timer');

function checkAnswer(selectedOption) {
  let isCorrect = false;

  if (currentQuestion === 1 && selectedOption === 'B') {
    isCorrect = true;
  } else if (currentQuestion === 2 && selectedOption === 'B') {
    isCorrect = true;
  }

  if (isCorrect) {
    score++;
  }

  if (currentQuestion < totalQuestions) {
    showNextQuestion();
  } else {
    window.location.href = `results.html?score=${score}`;
  }
}


function showNextQuestion() {
  currentQuestion++;
  let currentQuestionElement = document.getElementById('question-' + currentQuestion);
  let previousQuestionElement = document.getElementById('question-' + (currentQuestion - 1));

  previousQuestionElement.setAttribute('visible', 'false');
  currentQuestionElement.setAttribute('visible', 'true');
}


function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.setAttribute('value', 'Tempo restante: ' + timeLeft);
  } else {
    if (currentQuestion < totalQuestions) {
      showNextQuestion();
      timeLeft = 10;
    } else {
      window.location.href = `results.html?score=${score}`;
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

  checkAnswer(selectedOption);
}

const countdown = setInterval(updateTimer, 1000);


AFRAME.registerComponent('marker-handler', {
  init: function () {
    const markerHiro = document.getElementById('marker-hiro');
    const markerKanji = document.getElementById('marker-kanji');

    markerHiro.addEventListener('markerFound', function () {
      selectOption('hiro');
    });

    markerKanji.addEventListener('markerFound', function () {
      selectOption('kanji');
    });
  }
});
