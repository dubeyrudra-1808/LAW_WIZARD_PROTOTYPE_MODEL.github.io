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
  scoreDisplay.innerText = 'स्कोर: 0';
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
      question: "बाल यौन शोषण का पीड़ितों पर दीर्घकालिक प्रभाव क्या हो सकता है?",
      answers: [
        { text: "शारीरिक स्वास्थ्य", correct: false },
        { text: "मानसिक और भावनात्मक चोट", correct: true },
        { text: "सुधारी गई सहिष्णुता", correct: false }
      ]
    },
    {
      question: "बाल यौन शोषण कैसे रोका जा सकता है?",
      answers: [
        { text: "मुद्दे को नजरअंदाज करना", correct: false },
        { text: "शिक्षा, जागरूकता, और कानूनी कदम", correct: true },
        { text: "पीड़ितों को सजा देना", correct: false }
      ]
    },
    {
      question: "जब आप संदेह करते हैं कि बच्चे के साथ यौन शोषण हुआ है, तो आपको क्या करना चाहिए?",
      answers: [
        { text: "मुश्किल से बचने के लिए इसे नजरअंदाज करें", correct: false },
        { text: "यह उपयुक्त प्राधिकृतियों को सूचित करें", correct: true },
        { text: "शोषक को सीधे सामना करें", correct: false }
      ]
    },
    {
      question: "किस प्रकार के शोषण में माइनर्स का इंटरनेट का दुरुपयोग शामिल है?",
      answers: [
        { text: "साइबरबुलींग", correct: false },
        { text: "ऑनलाइन ग्रूमिंग", correct: true },
        { text: "भौतिक शोषण", correct: false }
      ]
    },
    {
      question: "बच्चों और उनके परिवारों का समर्थन क्यों महत्वपूर्ण है यौन शोषण को संज्ञान में लेने के लिए?",
      answers: [
        { text: "इससे पीड़ित अपने शोषकों से प्रतिशोध पा सकते हैं", correct: false },
        { text: "इसका कोई महत्व नहीं है, क्योंकि पीड़ितों को शोषण को भूल जाना चाहिए", correct: false },
        { text: "यह उनके पुनर्वास और भलाई के लिए महत्वपूर्ण है", correct: true }
      ]
    }
  ];
