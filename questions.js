function readFromForm() {
    const form = document.querySelector("#quiz-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent the form from submitting
        const selectedAnswer = form.elements.answer; // get the radio buttons

        for (let i = 0; i < selectedAnswer.length; i++) {
            if (selectedAnswer[i].checked) {
                // the current radio button is checked
                console.log(selectedAnswer[i].value); // log the value of the checked radio button
                break;
            }
        }
    });
}

readFromForm();