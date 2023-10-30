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
    question: 'इसका किस बाल अधिकार से संबंध है?',
    answers: [
      { text: ' शिक्षा', correct: true },
      { text: 'स्वास्थ्य', correct: false },
      { text: 'गरीबी', correct: false }    ]
  },
  {
    question: 'क्या प्रत्येक बच्चे का शिक्षा का अधिकार है?',
    answers: [
      { text: 'नहीं, यह केवल धनी बच्चों के लिए है।', correct: false },
      { text: 'नहीं', correct: false },
      { text: 'नहीं, यह केवल अच्छी सामर्थ्यवानों के लिए है।', correct: false},
      { text: 'हां, यह प्रत्येक बच्चे का मौलिक अधिकार है।', correct: true }
    ]
  },
  {
    question: 'किसी भी बच्चे का शिक्षा संभव है_____',
    answers: [
      { text: 'संभव है', correct: true },
      { text: 'स्वतंत्र शिक्षा का अधिकार', correct: false },
      { text: 'कभी भी स्कूल न जाने का हक', correct: false }
    ]
  },
  {
    question: 'इस छवि के द्वारा कौन सा अधिकार प्राप्त होता है?',
    answers: [
      { text: 'शिक्षा का अधिकार', correct: true },
      { text: 'स्वास्थ्य का अधिकार', correct: false },
      {text: 'सुविधा का अधिकार', correct:false}
    ]
  }
]
