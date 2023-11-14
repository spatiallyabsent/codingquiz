/* The first part of the javaS code...(plans)
need start game button (.button for class). this button needs to start the game and take
us to the cards for the game. There needs to be 5 seperate cards (notindividual cards but 5 
variations of the same one) all using the same lines in html.
Each card will have a h2 title which will hold the questions Each card will have 4 buttons 
on it which will =true or false (these buttons need to change text with each new card. 
When pressed each time it should take us to the next card a deliver a brief statement 
(maybe 2 seconds) whether or not the user choice was true or false.
*/

/* some of the changes I made were getting rid of the buttons in the div class "game-card"
the tutor I had recomended creating the buttons through JavaScript which was easier to 
minipulate with JavaS. 

--things to work on--
I still have difficulties with traversing the DOM and knowing when to create elements with 
JavaS or have it set in html. Still very slow with working with getters and setters and appending.
I am getting a better hang of the different methods but still feel lost sometimes even reading them
and knowing what they do. note to self practice more with them.
*/

//use index of the questions that will be used in the 5 different cards and/or set them to button id's/ after talking with a tutor decided to creat the buttons in javaS
//made an array that holds objects for this task
var gameQuestions = [
  {
    question: "Which one of these is NOT a data type in JavaScript?",
    choices: ["Number", "String", "Boolean", "Parameter"], //using an index to help fill the buttons
    answer: "Parameter"
  },
  {
    question: "What kind of language is HTML?",
    choices: ["Mark-up", "Mark-down", "Concatanation", "Milstone"],
    answer: "Mark-up"
  },
  {
    question: "What does JavaScript provide to code?",
    choices: ["Nuance", "Foundation", "Functionality", "API"],
    answer: "Functionality"
  },
  {
    question: "Which one of these does not belong?",
    choices: ["True", "False", "Undefined", "Flow"],
    answer: "Flow"
  },
  {
    question: "What year is givin to the start of the internet?",
    choices: ["1983", "1988", "1990", "1993"],
    answer: "1983"
  }
];


var gameBtn = document.querySelector('.start-button');
var timerEl = document.querySelector('time');
var secondsLeft = 30;
var startCard = document.getElementById('my-start-card');
var gameCard = document.getElementById('my-game-card');
var currentQuestionIndex = 0;
var scoreCard = document.getElementById('scored');
var highScoreList = document.getElementById('score-list');

var timerInterval;

gameBtn.addEventListener('click', function () {
  startTime();
  startCard.hidden = true;
  gameCard.hidden = false;
  setQuestion();
});

//WORKING ON TIMER
function startTime() {
  timerEl.textContent = "Time Left: " + secondsLeft;
  timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = "Time Left: " + secondsLeft;
    if (secondsLeft === 0 || currentQuestionIndex >= gameQuestions.length) {
        endQuiz()
    }
  }, 1000);
}


 // gettin the quiz portion going
function setQuestion() {
  var questionObj = gameQuestions[currentQuestionIndex];
  document.querySelector('.game-question').textContent = questionObj.question;
  var answers = document.getElementById('button-choice');
  answers.innerHTML = "";
  for (var i =0; i < questionObj.choices.length; i++) {
    var btn = document.createElement('button')
    btn.textContent = questionObj.choices[i];
    btn.classList.add('button')
    btn.onclick = checkAnswer;
    answers.append(btn);
  }
}
function checkAnswer(event) {
  if (event.target.textContent !== gameQuestions[currentQuestionIndex].answer) {
    secondsLeft -= 6;
    if (secondsLeft <= 0) {
      secondsLeft = 0;
      timerEl.textContent = "Time Left: " + secondsLeft;
      endQuiz()
    }
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === gameQuestions.length)
    endQuiz();
  else setQuestion();
}

//saving local storage
function endQuiz() {
  clearInterval(timerInterval)
  gameCard.hidden = true;
  scoreCard.hidden = false;
  document.querySelector('#initbtn').classList.add('button');// scoreCard.hidden = false;
  initbtn.classList.add('button');
  document.querySelector('.game-score').textContent= 'Game Over Your final score is: ' + secondsLeft;
  document.querySelector('#initbtn').addEventListener('click', function() {
    var scores = JSON.parse(localStorage.getItem('scores')) || []
    var newScore = {
      initials: document.querySelector('input').value, 
      score: secondsLeft
    }
    scores.push(newScore);
    localStorage.setItem('scores', JSON.stringify (scores));
    scoreCard.hidden = true;
    highScoreList.hidden = true;
  })
}
//section were setting the storage to the page should go
/* spent the last four hours of this trying to finish this project getting the javaS to show the
div with the id=scored. Everytime I would do something I would get errors in previous lines of code
and wound up deleting what I was trying to keep the rest working. need to come back to this and try to figure out.
*/



