const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const scoreDisplay = document.getElementById('score');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.innerText = 'Score: 0';
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    score++;
    scoreDisplay.innerText = `Score: ${score}
    Level Complete...Move to next level`;
  }
 
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove('hide');
  } else {
    endGame();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function endGame() {
  questionContainerElement.classList.add('hide');
  scoreContainer.classList.remove('hide');
}

const questions = [
  {
    question: 'It is related to which of the child rights?',
    answers: [
      { text: ' Education', correct: true },
      { text: 'Health', correct: false },
      { text: 'Poverty', correct: false }    ]
  },
  {
    question: 'Is education right of every child?',
    answers: [
      { text: 'No,It is for only rich children.', correct: false },
      { text: 'No', correct: false },
      { text: 'No, It is for well privileged.', correct: false},
      { text: 'Yes , It is a basic right of every child.', correct: true }
    ]
  },
  {
    question: 'All children have the right to_______',
    answers: [
      { text: 'best education possible.', correct: true },
      { text: 'free will to study.', correct: false },
      { text: 'never go to school.', correct: false }
    ]
  },
  {
    question: 'which right is concluded by this image?',
    answers: [
      { text: 'Right to Education', correct: true },
      { text: 'Right to health', correct: false },
      {text: 'Right to facility', correct:false}
    ]
  }
]
