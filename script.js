

//Pulling all elements from HTML
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");

// Set global variables. 
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;


init();



// First Function

function init() {
  clearDetails();
  reset();

  // Creates Heading. 
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");

  heading.textContent = "This Game was design to see if you are a real Game of Thornes Fan!";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Answer right and you will be rewarded, Answer wrong and you will be penalize";

 
  // creates button to start the game
  let startGameOfThronesQuiz = document.createElement("button");
  startGameOfThronesQuiz.setAttribute("id", "startGameOfThronesQuiz");
  startGameOfThronesQuiz.setAttribute("class", "btn btn-dark");
  startGameOfThronesQuiz.textContent = "Start Game Of Thrones Quiiz";

  // creates button to start the game


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startGameOfThronesQuiz);


  startGameOfThronesQuiz.addEventListener("click", function () {
    quizType = "Game of Thrones";
    playQuiz(gotQuestions);
  });

}

// function to clear details 
function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }


  quiz = setUpQuestions(questionSet);


  timerTab.setAttribute("style", "visibility: visible;");

  // Start timers here
  gameDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:", gameDuration, questionDuration); }

  startGameTimer();
  renderTime();

 
  presentQuestion();
}


function setUpQuestions(array) {
  if (test) { console.log("--- setUpQuestions ---"); }

  let ranQuest = [];

  for (let i = 0; i < array.length; i++) {
    ranQuest.push(array[i]);
  }
  return ranQuest;
}

 
function presentQuestion() {
  if (test) { console.log("--- presentQuestion ---"); }
 
  questionSecElapsed = 0;

  
  if (quiz.length === 0) {
    endOfGame();
    return;
  }

 
  currentrentQuestion = quiz.pop();

  
  clearDetails();

  
  let question = document.createElement("h1");
 
  question.setAttribute("question", currentrentQuestion.title);
  question.textContent = currentrentQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id", "choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for (let i = 0; i < currentrentQuestion.choices.length; i++) {
    // creates variable for each choice item
    let listChoice = document.createElement("li");
    // adds data value
    listChoice.setAttribute("choice-value", currentrentQuestion.choices[i]);
    listChoice.setAttribute("id", "questionNum-" + i);
    listChoice.textContent = currentrentQuestion.choices[i];
    //add choice to page
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("current", currentrentQuestion); }

  // get answer from user
 
  choiceBox.addEventListener("click", function () {
    scoreAnswer(currentrentQuestion);
  });
  // calls for the next questions
}

function scoreAnswer(current) {
  if (test) { console.log("--- scoreAnswer ---"); }
 
  var e = event.target;
  if (e.matches("li")) {
    let selectedItem = e.textContent;
 
    if (test) { console.log("selectedItem quiz " + selectedItem); }
 
    if (selectedItem === current.answer) {
 
      score += questionDuration - questionSecElapsed;
  
    } else {
      if (test) { console.log("wrong answer"); }
      //penelty for being wrong
      gameDuration -= 10;
    }
    if (test) { console.log("selected ", selectedItem); }
    showAnswers(current);

  }
}


function showAnswers(current) {
  if (test) { console.log("--- showAnswer ---"); }
 
  if (test) { console.log("sa qanda", current); }
  if (test) { console.log("selected ", selectedItem); }


  for (let i = 0; i < current.choices.length; i++) {
    if (test) { console.log("sa in for ", i); }

    let questid = "#questionNum-" + i;
 
    let questrow = document.querySelector(questid);

    

    if (test) { console.log("saf selected" + selectedItem + "<"); }
    if (test) { console.log("saf color test >" + current.choices[i] + "<"); }

    if (current.choices[i] !== current.answer) {
      if (test) { console.log("color test flase"); }
      questrow.setAttribute("style", "background-color: red");
    } else {
      if (test) { console.log("color test true"); }
      questrow.setAttribute("style", "background-color: green");
    }
  }
  
  setTimeout(presentQuestion, 500);
}


function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}


function renderTime() {
  
  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ((questionDuration - questionSecElapsed) < 1) {
    
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  }

  if ((gameDuration - gameSecElapsed) < 1) {
    endOfGame();
  }
}

function startGameTimer() {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function () {
    gameSecElapsed++;
    questionSecElapsed++;
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- "); }
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}


function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "GAME OVER - I hope you have enjoyed this";

 
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score;

 
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-dark");
  playAgain.textContent = "Play again";

  
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for", "userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "userInitials");
  initialsInput.setAttribute("name", "userInitials");
  initialsInput.setAttribute("minlength", "3");
  initialsInput.setAttribute("maxlength", "3");
  initialsInput.setAttribute("size", "3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function () {
    initialsInput.value = initialsInput.value.toUpperCase();
    if (initialsInput.value.length === 3) {

     
      let thisScore = [{ type: quizType, name: initialsInput.value, score: score }];

      
      let storedScores = JSON.parse(localStorage.getItem("highScores"));
      if (test) { console.log("storedScore", storedScores); }

      if (storedScores !== null) {
        storedScores.push(thisScore[0]);
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  //get scores from storage
  let storedScores = JSON.parse(localStorage.getItem("highScores"));

 
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top 5 High Score Hall of Fame";

  mainEl.appendChild(heading);

  
  if (storedScores !== null) {
   
    storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    
    let numScores2Display = 5;
    if (storedScores.length < 5) {
      numScores2Display = storedScores.length;
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent = "Your Initials Here!"
    mainEl.appendChild(p);
  }


  
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-dark");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);

