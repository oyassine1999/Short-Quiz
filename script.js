function updateQuestion() {
    const questionElement = document.querySelector("#question");
    questionElement.innerHTML = questions[i];
    console.log(i);
}

updateQuestion();
