const questions = [];
const answers = [];
const correct = [];


// display the correctly answered
var score = 0;

// Start button click event listener
document.getElementById('start-button').addEventListener('click', function() {
  getQuestions().then(function() {
    startQuiz();
  });
});


var timeLeft = 60;

async function getQuestions() {
    const API_KEY = "bLyddAymo8Ki5dqMVWaaRp8EKo2gqMQDtOg4RBEl";
    const limit = 10;

    var i = 0;

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
        correct.push(JSON.stringify(data[i].answers[correct_ans]));
        i++;
    }
}

function startQuiz() {
  // Start timer
  var timer = setInterval(function() {
    // Decrement timer and update on screen
    if (timeLeft > 0) {
      timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

    } else {
      // Stop timer and end quiz if time runs out
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  // Display first question
  displayQuestion(0);
}

function displayQuestion(questionIndex) {
  // Get current question and options from array of questions
  var question = questions[questionIndex];
  var options = answers[questionIndex];

  document.getElementById('score').textContent = "Current Score: " + score + "/10";

  // Update question text on screen
  document.getElementById('question').textContent = question;

  // Clear any existing options
  document.getElementById('options').innerHTML = '';

  // Display options for current question
  for (var i = 0; i < options.length; i++) {
    // Create button for each option
    var optionButton = document.createElement('button');
    optionButton.textContent = options[i];

    // Add click event listener to each option button
    optionButton.addEventListener('click', function(e) {
      // Check if answer is correct
      console.log("CORRECT ANSWER", e.target.textContent, "USER INPUT", correct[questionIndex]);
      if (e.target.textContent === correct[questionIndex]) {
        // Move on to next question if correct
        if (questionIndex < questions.length - 1) {
            displayQuestion(questionIndex + 1);
            score++;
        } else {
          // End quiz if all questions have been answered
          endQuiz();
        }
      } else {
        // Move on to next question if answer is incorrect
        if (questionIndex < questions.length - 1) {
            displayQuestion(questionIndex + 1);
        } else {
          // End quiz if all questions have been answered
          endQuiz();
        }
        // Subtract time if answer is incorrect
        timeLeft -= 10;
      }
    });

    // Append option button to options element
    document.getElementById('options').appendChild(optionButton);
  }
}

function endQuiz() {
  // Hide quiz content
  document.getElementById('quiz').style.display = 'none';

  // Show game over message
  document.getElementById('game-over').style.display = 'block';

  // Display final score
  document.getElementById('final-score').textContent =  "Score: " + score + "/10";;

  // Show input to enter initials
  document.getElementById('initials-form').style.display = 'block';

  // Initials form submit event listener
  document.getElementById('initials-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get initials from input
    var initials = document.getElementById('initials').value;

    // Save score and initials to local storage
    saveScore(initials, score);

    // Redirect to high scores page
    window.location.href = 'highscores.html';
  });
}

function saveScore(initials, score) {
  // Get existing scores from local storage, or default to empty array
  var scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Add new score to scores array
  scores.push({initials: initials, score: score});

  // Sort scores in descending order by score
  scores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Save scores back to local storage
  localStorage.setItem('scores', JSON.stringify(scores));
}

document.addEventListener('DOMContentLoaded', function () {
   getQuestions();
    console.log("loaded");
}, false);