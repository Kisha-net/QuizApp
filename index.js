const questions = [
  {
    question: "What is the capital of France?",
    choices: [
      { text: "London", answer: false },
      { text: "Paris", answer: true },
      { text: "Rome", answer: false },
      { text: "Madrid", answer: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: [
      { text: "Leonardo da Vinci", answer: true },
      { text: "Pablo Picasso", answer: false },
      { text: "Vincent van Gogh", answer: false },
      { text: "Michelangelo", answer: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: [
      { text: "Mercury", answer: false },
      { text: "Venus", answer: false },
      { text: "Jupiter", answer: true },
      { text: "Venus", answer: false },
    ],
  },
  {
    question: "Who wrote the novel 'Pride and Prejudice'?",
    choices: [
      { text: "Jane Austen", answer: true },
      { text: "Charles Dickens", answer: false },
      { text: "Mark Twain", answer: false },
      { text: "William Shakespeare", answer: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: [
      { text: "Au", answer: true },
      { text: "Ag", answer: false },
      { text: "Cu", answer: false },
      { text: "Fe", answer: false },
    ],
  },
  {
    question: "Who invented the telephone?",
    choices: [
      { text: "Thomas Edison", answer: false },
      { text: "Alexander Graham Bell", answer: true },
      { text: "Nikola Tesla", answer: false },
      { text: "Albert Einstein", answer: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    choices: [
      { text: "Mount Everest", answer: true },
      { text: "K2", answer: false },
      { text: "Kilimanjaro", answer: false },
      { text: "Matterhorn", answer: false },
    ],
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    choices: [
      { text: "Japan", answer: true },
      { text: "China", answer: false },
      { text: "South Korea", answer: false },
      { text: "India", answer: false },
    ],
  },
  {
    question: "Who is the author of the Harry Potter book series?",
    choices: [
      { text: "J.K. Rowling", answer: true },
      { text: "Stephen King", answer: false },
      { text: "George R.R. Martin", answer: false },
      { text: "Dan Brown", answer: false },
    ],
  },
  {
    question: "What is the largest ocean in the world?",
    choices: [
      { text: "Pacific Ocean", answer: true },
      { text: "Atlantic Ocean", answer: false },
      { text: "Indian Ocean", answer: false },
      { text: "Arctic Ocean", answer: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const inScore = document.getElementById("in-score");
const total = document.getElementById("total");
const scoreClass = document.getElementById("scoore");

// keep track of elements being selected
let currentQuestionIndex = 0;
let score = 0;
let count = 0;
inScore.innerHTML = count;
let totalScore = questions.length;
// console.log("Total is " + totalScore);
total.textContent = totalScore;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  count = 0;
  nextButton.innerHTML = "Next";
  inScore.innerHTML = count;
  total.textContent = totalScore;
  scoreClass.style.display = "block";

  showQuestion();
};

const showQuestion = () => {
  resetstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
  // for each choice we create a button
  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.innerHTML = choice.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (choice.answer) {
      button.dataset.answer = choice.answer;
    }
    button.addEventListener("click", selectChoice);
  });
};

const resetstate = () => {
  nextButton.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

const selectChoice = (e) => {
  // console.log(e.target);
  const selectedBtn = e.target;
  const isTrue = selectedBtn.dataset.answer === "true";
  if (isTrue) {
    selectedBtn.classList.add("correct");
    count++;
    inScore.innerHTML = count;
    // console.log("count is" + count);
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // change to array
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.answer === "true") {
      button.classList.add("correct");
      score++;
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
};

const showScore = () => {
  resetstate();
  questionElement.innerHTML = `You have scored ${count} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  scoreClass.style.display = "none";
};
const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
