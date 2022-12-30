const questions = [
  "What is the capital of France?",
  "What is the largest ocean?",
  "What is the tallest mountain in the world?",
];

function updateQuestion() {
    const questionElement = document.querySelector("#question");
    questionElement.innerHTML = questions[0];
}


updateQuestion();
