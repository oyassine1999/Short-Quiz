const questions = [];
const answers = [];
const correct = [];

var score = 0;

const map = new Map();

let i = 0;
let x = 0;

async function getQuestions() {
    const API_KEY = "bLyddAymo8Ki5dqMVWaaRp8EKo2gqMQDtOg4RBEl";
    const limit = 10;

    const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=${limit}`
    );

    const data = await response.json();
    console.log(data);

    for (const key in data) {
        // add the questions from API into a list
        questions.push(JSON.stringify(data[i].question));
        
        // add the potential options to a list
        const answers_sublist = [JSON.stringify(data[i].answers.answer_a), JSON.stringify(data[i].answers.answer_b), JSON.stringify(data[i].answers.answer_c), JSON.stringify(data[i].answers.answer_d)];
        answers.push(answers_sublist);
        // console.log(answers[i]);

        // add the correct answer
        var correct_ans = ""; 
        correct_ans = data[i].correct_answers.answer_a_correct == 'true' ? "answer_a" : data[i].correct_answers.answer_b_correct == 'true' ? "answer_b" : data[i].correct_answers.answer_c_correct == 'true' ? "answer_c" : data[i].correct_answers.answer_d_correct == 'true' ? "answer_d" : "null";
        correct.push(JSON.stringify(correct_ans));

        i++;
    }

    nextQuestion()
}


let count = 60;

const timer = setInterval(function () {
    const questionElement = document.querySelector("#time");
    questionElement.innerHTML = count;

    // console.log(count);
    count--;

    if (count === 0) {
        clearInterval(timer);
    }
}, 1000); // 1000 milliseconds = 1 second
    
function nextQuestion() {
    var ans = document.getElementById('questionA').checked ? '"answer_a"' : document.getElementById('questionB').checked ? '"answer_b"' : document.getElementById('questionC').checked ? '"answer_c"' : document.getElementById('questionD').checked ? '"answer_d"' : 'null';
    
    // if the answer is incorrect then subtract time
    count = ans == correct[x] ? count + 10 : count - 10;

    score = ans == correct[x] ? score + 1 : score + 0;

    const current_scrore = document.querySelector("#score");
    current_scrore.innerHTML = score + "/10";

    // display in box
    const correctness = document.querySelector("#correctness");
    correctness.innerHTML = ans == correct[x] ? "Previous answer: Correct" : "Previous answer: Incorrect";

    const questionElement = document.querySelector("#question");
    questionElement.innerHTML = questions[x];

    var qA = document.querySelector('label[for="questionA"]');

    qA.innerHTML = "<input type='radio' name='answer' value='questionA' id='questionA'>" + answers[x][0];
    var qB = document.querySelector('label[for="questionB"]');
    qB.innerHTML = "<input type='radio' name='answer' value='questionB' id='questionB'>" + answers[x][1];
    var qC = document.querySelector('label[for="questionC"]');
    qC.innerHTML = "<input type='radio' name='answer' value='questionC' id='questionC'>" + answers[x][2];
    var qD = document.querySelector('label[for="questionD"]');
    qD.innerHTML = "<input type='radio' name='answer' value='questionD' id='questionD'>" + answers[x][3];

    x++;
}

window.addEventListener('load', function() {
  getQuestions();
});