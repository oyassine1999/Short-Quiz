const questions = [];
const answers = [];
const map = new Map();

let i = 0;
let x = 1;


async function getQuestions() {
    const API_KEY = "bLyddAymo8Ki5dqMVWaaRp8EKo2gqMQDtOg4RBEl";
    const limit = 10;

    const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=${limit}`
    );

    const data = await response.json();
    // console.log(data);

    for (const key in data) {
        questions.push(JSON.stringify(data[i].question));
        
        const answers_sublist = [JSON.stringify(data[i].answers.answer_a), JSON.stringify(data[i].answers.answer_b), JSON.stringify(data[i].answers.answer_c), JSON.stringify(data[i].answers.answer_d)];
        answers.push(answers_sublist);

        i++;
    }

    const questionElement = document.querySelector("#question");
    questionElement.innerHTML = questions[0];

    var qA = document.querySelector('label[for="questionA"]');
    qA.innerHTML = "<input type='radio' name='answer' value='questionA'>" + answers[0][0];
    var qB = document.querySelector('label[for="questionB"]');
    qB.innerHTML = "<input type='radio' name='answer' value='questionB'>" + answers[0][1];
    var qC = document.querySelector('label[for="questionC"]');
    qC.innerHTML = "<input type='radio' name='answer' value='questionC'>" + answers[0][2];
    var qD = document.querySelector('label[for="questionD"]');
    qD.innerHTML = "<input type='radio' name='answer' value='questionD'>" + answers[0][3];
}

function nextQuestion() {
    const questionElement = document.querySelector("#question");
    questionElement.innerHTML = questions[x];

    var qA = document.querySelector('label[for="questionA"]');
    qA.innerHTML = "<input type='radio' name='answer' value='questionA'>" + answers[x][0];
    var qB = document.querySelector('label[for="questionB"]');
    qB.innerHTML = "<input type='radio' name='answer' value='questionB'>" + answers[x][1];
    var qC = document.querySelector('label[for="questionC"]');
    qC.innerHTML = "<input type='radio' name='answer' value='questionC'>" + answers[x][2];
    var qD = document.querySelector('label[for="questionD"]');
    qD.innerHTML = "<input type='radio' name='answer' value='questionD'>" + answers[x][3];

    x++;
}


getQuestions(); 