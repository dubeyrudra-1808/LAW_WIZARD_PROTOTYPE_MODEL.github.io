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
    scoreDisplay.innerText = `स्कोर: ${score}
    स्तर पूरा... अगले स्तर पर जाएं`;
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
    question: 'यह किस बाल अधिकार से संबंधित है?',
    answers: [
      { text: 'शिक्षा', correct: false },
      { text: 'स्वास्थ्य', correct: true },
      { text: 'गरीबी', correct: false }
    ]
  },
  {
    question: 'क्या हर बच्चे को स्वास्थ्य-सेवा का अधिकार है?',
    answers: [
      { text: 'नहीं, यह केवल धनी बच्चों के लिए है।', correct: false },
      { text: 'नहीं', correct: false },
      { text: 'नहीं, यह केवल अच्छी सामर्थ्यवानों के लिए है।', correct: false },
      { text: 'हां, यह हर बच्चे का मौलिक अधिकार है।', correct: true }
    ]
  },
  {
    question: 'सभी बच्चों का क्या अधिकार है?',
    answers: [
      { text: 'सबसे अच्छी स्वास्थ्य सेवा प्राप्त करने का.', correct: true },
      { text: 'आज़ादी से दवा प्राप्त करने का.', correct: false },
      { text: 'कभी भी अस्पताल न जाने का.', correct: false }
    ]
  },
  {
    question: 'इस छवि से किस अधिकार का परिणाम निकलता है?',
    answers: [
      { text: 'शिक्षा का अधिकार', correct: false },
      { text: 'स्वास्थ्य का अधिकार', correct: true },
      { text: 'सुविधा का अधिकार', correct: false }
    ]
  }
]

