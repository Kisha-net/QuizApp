const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let questions = [];
let currentquestion = {};

const fetchData = async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  );
  const data = await response.json();
  questions = data;
  console.log(data);
};
