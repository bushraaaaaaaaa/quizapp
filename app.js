var questions = [
    {
        question:"What is JavaScript primarily used for?",
        option1:"Styling web pages",
        option2:"Creating interactive web pages",
        option3:"Storing data on the server",
        correctAns:"Creating interactive web pages"
    },
    {
        question:"What is the correct way to declare a variable in JavaScript?",
        option1:"var x = 10;",
        option2:"variable x = 10;",
        option3:"x = 10;",
        correctAns:"var x = 10;"
    },
    {
        question:"What does the 'DOM' stand for in the context of JavaScript?",
        option1:"Document Object Model",
        option2:"Data Object Model",
        option3:"Design Object Model",
        correctAns:"Document Object Model"
    },
    {
        question:"What is the result of '2' + 2 in JavaScript?",
        option1:"22",
        option2:"4",
        option3:"'4'",
        correctAns:"'22'"
    },
    {
        question:"Which of the following is not a data type in JavaScript?",
        option1:"Boolean",
        option2:"Float",
        option3:"String",
        correctAns:"Float"
    },
    {
        question:"What is the purpose of the 'for' loop in JavaScript?",
        option1:"Executing a block of code a specific number of times",
        option2:"Declaring variables",
        option3:"Handling exceptions",
        correctAns:"Executing a block of code a specific number of times"
    }
];

    

var para = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var button = document.getElementById("btn");
var time = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 1;
var sec = 59;
var timerInterval;


function startTimer() {
    min = 1;
    sec = 59;
    if (timerInterval) {
        clearInterval(timerInterval); // Clear the previous timer if it exists
    }
    timerInterval = setInterval(function () {
        time.innerHTML = `${min}:${sec}`;
        sec--;
        if (sec < 0) {
            min--;
            sec = 59;
        }

        if (min < 0) {
            clearInterval(timerInterval);
            if (index < questions.length) {
                nextQuestion();
            }
        }
    }, 1000);
}

function nextQuestion() {
    var getOptions = document.getElementsByName("options");

    for (var i = 0; i < getOptions.length; i++) {
        if (getOptions[i].checked) {
            var selectedValue = getOptions[i].value;
            var selectedQues = questions[index - 1]["question"];
            var selectedAns = questions[index - 1][`option${selectedValue}`];
            var correctAns = questions[index - 1]["correctAns"];
            if (selectedAns == correctAns) {
                score++;
            }
        }
        getOptions[i].checked = false;
    }

    button.disabled = true;

    if (index >= questions.length ) {
        displayResult();
    } else {
        para.innerHTML = questions[index].question;
        opt1.innerText = questions[index].option1;
        opt2.innerText = questions[index].option2;
        opt3.innerText = questions[index].option3;
        index++;
        startTimer(); 
    }
}
function displayResult() {
    clearInterval(timerInterval); // Stop the timer
    var percentage = (score / questions.length) * 100;

    if (percentage >= 90) {
        Swal.fire(
            'excellent!',
            `Your percentage is ${percentage.toFixed(2)}%. GREAT!`,
            'success'
        ).then(() => {
            showGoodLuckImage(); 
        });
    } else if (percentage >= 70) {
        Swal.fire(
            'keep it up!',
            `Your percentage is ${percentage.toFixed(2)}%. Excellent!`,
            'success'
        ).then(() => {
            showGoodLuckImage(); 
        });
    } else if (percentage >= 50) {
        Swal.fire(
            'nice!',
            `Your percentage is ${percentage.toFixed(2)}%. keep it up`,
            'success'
        ).then(() => {
            showGoodLuckImage(); 
        });
    } else {
        Swal.fire(
            'you should learn javascript',
            `Your percentage is ${percentage.toFixed(2)}%. fail!`,
            'info'
        ).then(() => {
            showGoodLuckImage(); 
        });
    }
}

function showGoodLuckImage() {
    var goodLuckImage = document.getElementById("goodLuckImage");
    goodLuckImage.style.display = "block";
}

function clicked() {
    button.disabled = false;
    startTimer(); 
}

startTimer();
