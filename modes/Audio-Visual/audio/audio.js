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
      question: "What can be the long-term impact of child sexual abuse on its victims?",
      answers: [
        { text: "Physical well-being", correct: false },
        { text: "Psychological and emotional trauma", correct: true },
        { text: "Improved resilience", correct: false }
      ]
    },
    {
      question: "How can child sexual abuse be prevented?",
      answers: [
        { text: "Ignoring the issue", correct: false },
        { text: "Education, awareness, and legal measures", correct: true },
        { text: "Punishing the victims", correct: false }
      ]
    },
    {
      question: "When you suspect child sexual abuse, what should you do?",
      answers: [
        { text: "Ignore it to avoid trouble", correct: false },
        { text: "Report it to the appropriate authorities", correct: true },
        { text: "Confront the abuser directly", correct: false }
      ]
    },
    {
      question: "Which type of abuse involves the sexual exploitation of minors using the internet?",
      answers: [
        { text: "Cyberbullying", correct: false },
        { text: "Online grooming", correct: true },
        { text: "Physical abuse", correct: false }
      ]
    },
    {
      question: "Why is supporting victims and their families important in addressing child sexual abuse?",
      answers: [
        { text: "It helps victims get revenge on their abusers", correct: false },
        { text: "It is not important, as the victims should forget about the abuse", correct: false },
        { text: "It is crucial for their recovery and well-being", correct: true }
      ]
    }
  ];
  
