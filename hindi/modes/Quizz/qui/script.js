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
    if(score<4){scoreDisplay.innerText = `Score: ${score}`;}
    else{
      scoreDisplay.innerText = `Score: ${score}
      Excellent !!`;
    }
    
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
    question: '"बाल अधिकारों पर कन्वेंशन" के उपनाम के रूप में क्या प्रयोग किया जाता है?',
    answers: [
      { text: 'बच्चों के लिए नियम', correct: false },
      { text: 'पालन-पोषण के नियम', correct: false },
      { text: 'बाल अधिकार', correct: true},
      { text: 'बच्चों के कानून', correct: false }    ]
  },
  {
    question: 'इनमें से कौन बच्चा सही नहीं है?',
    answers: [
      { text: 'बाल अधिकारों के बारे में जानने का अधिकार', correct: false },
      { text: 'हानिकारक दवाओं से सुरक्षित रहने का अधिकार', correct: false },
      { text: 'वे जो चाहते हैं उसे करने का अधिकार', correct: true},
      { text: 'अपनी बात कहने का अधिकार', correct: false }
    ]
  },
  {
    question: 'सभी बच्चों को _______ का अधिकार है',
    answers: [
      { text: 'सर्वोत्तम स्वास्थ्य देखभाल संभव', correct: true },
      { text: 'हमेशा रहें', correct: false },
      { text: 'कभी बीमार मत पड़ना.', correct: false }
    ]
  },
  {
    question: '1989 में संयुक्त राष्ट्र ने बच्चों के लिए एक मानवाधिकार कानून बनाया जिसे "द कन्वेंशन ऑन द राइट्स ऑफ द चाइल्ड" कहा गया।',
    answers: [
      { text: 'असत्य', correct: false },
      { text: 'सत्य', correct: true }
    ]
  }
]
