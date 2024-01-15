
var body = document.querySelector("body");
var h1 = document.querySelector("h1");
var wrapper = document.querySelector(".wrapper");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");
var questionsElement = document.querySelector("#questions");
var questionTitleElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var initials = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");


//Insert pub quiz image under start button, inside the start-screen div

//Create image element within the start-screen div
var image = document.createElement("img");
//Set content and style
image.setAttribute("src", "./assets/img/19697.jpg");
image.setAttribute("style", "position: relative; width: 500px; padding: 10px; margin-left: 15px;");
//Append the image tag to the page
startScreen.appendChild(image);

//Style page
body.setAttribute("style", "font-family: emoji");
startButton.setAttribute("style", "background-color: navy; color: orange; size: 110%");
questionTitleElement.setAttribute("style", "text-align: center");

//Create answers ordered list

var choicesList = document.createElement("ol");

//Create ordered list items

// var li1 = document.createElement("li");
// var li2 = document.createElement("li");
// var li3 = document.createElement("li");

//Create buttons

// var button1 = document.createElement("button");
// var button2 = document.createElement("button");
// var button3 = document.createElement("button");

//Add text for list items

// button1.textContent = "Button1 answer";
// button2.textcontent = "Button2 answer";
// button3.textcontent = "Button3 answer";

//Add event listeners to the list items -- TODO:should they be buttons to keep the css styling????

// button1.addEventListener ("click", function () {
//     console.log("Item 1 is clicked")
// })
// button2.addEventListener ("click", function () {
//     console.log("Item 2 is clicked")
// })
// button3.addEventListener ("click", function () {
//     console.log("Item 3 is clicked")
// })

//Append ordered list

choicesElement.appendChild(choicesList);

//Append items to the ordered list

// choicesList.appendChild(button1);
// choicesList.appendChild(button2);
// choicesList.appendChild(button3);


//Append button to the list item

// li1.appendChild(button1);
// li2.appendChild(button2);
// li3.appendChild(button3);

var isWin = false;
var wrongAnswer = false;
var timerInterval;
var timerCount = 0;
var selectedQuestion = "";
var randomQuestion = "";
var choicesList;
var answer = "";
var addPoints = 0;
var subtractPoints = 0;
//var scoreStore;
//var initialsStore = "";


//1. When I click the start button (ADD EVENT LISTENER -CLICK), I want the timer to start (SET TIMER FUNCTION) and the first question to appear (PROMPT/DISPLAY????)

//Add the start button event
function startGame() {
isWin = false;
//Declare functions to run when button is pressed
startTimer(); 
askFirstQuestion(); 
};

//Define startTimer function
function startTimer () {
    timerCount = 10; //Set the timer
    
    timerInterval = setInterval(function() {
        timerCount--; //set counter to decrease
        timerElement.textContent = "Time: " + timerCount;
        if(timerCount <= 0) { //condition for when the timer gets to 0
            clearInterval(timerInterval);
            showScore(); //TODO:define function for showing scores when time finishes
        }
                
    }, 1000);     
}
console.log(quizQuestions);

//Define askFirstQuestion function 

function askFirstQuestion() {
    choicesList.textContent = "";
    //Pick a random question from the array
    var randomQuestion = quizQuestions[Math.floor(Math.random()*quizQuestions.length)];
    console.log(randomQuestion);
    //Assign question title to the HTML object
    questionTitleElement.innerHTML = "";
    questionTitleElement.textContent = randomQuestion.questionTitle;
    console.log(questionTitleElement);
    //Replace start screen div with question div
    startScreen.style.display = "none";
    questionsElement.style.display = "block";
    
    //Create clickable buttons and show answers as ordered list items

    for ( var i = 0; i < randomQuestion.answers.length; i++) {
        console.log("this is in my for loop", randomQuestion.answers[i].text);
         //Create buttons and set them to trigger next question event
        var buttonEl = document.createElement("button");
        buttonEl.textContent = randomQuestion.answers[i].text;
        buttonEl.onclick = function(event) {
            nextQuestion(event);
        }
        buttonEl.setAttribute("data-isCorrect", randomQuestion.answers[i].isCorrect);
        buttonEl.setAttribute("style", "display: flex");
        choicesList.appendChild(buttonEl);
    }
     //Display ordered list
    choicesList.style.display = "block"; 
    
};

function nextQuestion(event) {
    console.log(event.target);
    console.log(event.target.getAttribute("data-isCorrect"));
    var userChoice = event.target.getAttribute("data-isCorrect");

    if (userChoice == "true") {  //if answers right->next question
       var correctAudio = new Audio('./assets/sfx/correct.wav')
       correctAudio.play();
       console.log("Hello");
       addPoints+=3;
       console.log(addPoints);
       askFirstQuestion();
    } else {
        timerCount-=5;  //If answer wrong->display wrong and take 5 seconds off timer
        var incorrectAudio = new Audio('./assets/sfx/incorrect.wav')
        incorrectAudio.play();
        subtractPoints-=1;
        console.log(subtractPoints);
        alert("Wrong answer");
        askFirstQuestion();
    }
    
}

function showScore() {
    questionsElement.style.display = "none";
    endScreen.style.display = "block";
    var showScore = addPoints + subtractPoints;
    console.log(showScore);
    finalScore.textContent = showScore;
    localStorage.setItem("finalScore", showScore);
}

function displayMessage(type, message) {
    feedback.textContent = message;
    feedback.setAttribute("class", type);
}

function initialsSubmit () {

    var initialsStore = initials.value;
    console.log(initialsStore);

     if (initialsStore.length > 3) {
        displayMessage("error", "3 characters max");
     } else {
        displayMessage("succes", "User score stored in highscores.");
     }
    localStorage.setItem("initials", JSON.stringify(initialsStore));
}


startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", initialsSubmit);

//Each question has a clickable button (ADD EVENT LISTENER-CLICK ON VARIABLE PROPERTY)
//When the answer in selected, next question appears (BONUS: select a random question once pressed next question?)
//In case of an incorrect answer, 5 seconds get subtracted from the remaining time
//Quiz ends when it runs out of questions or the time finishes
//When the game is finished, the user sees the score and has the option to save his initals and the score (highscores.html file - store highscores highest to lowest + use localstorage set in index and get in highscores)

