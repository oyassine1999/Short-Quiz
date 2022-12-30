function readFromForm() {
    const form = document.querySelector("#quiz-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const selectedAnswer = form.elements.answer;

        for (let i = 0; i < selectedAnswer.length; i++) {
            if (selectedAnswer[i].checked) {
                console.log(selectedAnswer[i].value); 
                break;
            }
        }
    });
}


readFromForm();