// Getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector("header .time-line");

const optionList = document.querySelector(".option-list");

// When start button clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); // show the info box
}

// When exit button clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // hide the info box
}

// When continue button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // hide the info box
  quizBox.classList.add("activeQuiz"); // show the quiz box
  showQuestions(0);
  questionCounter(1);
  startTimer(15);
  startTimerLine(0);
}

let questionCount = 0;
let questionNumber = 1;
let counter;
let timeValue = 15;
let widthLineValue = 0;

const nextBtn = quizBox.querySelector(".next-btn");

// When next button clicked
nextBtn.onclick = () => {
  if(questionCount < questions.length - 1){
    questionCount++;
    questionNumber++;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthLineValue);
  } else {
    console.log("Questions completed");
  }
}

// Getting questions and options from array
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  let questionTag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
  let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' 
                + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-times"></i></div>'

function optionSelected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  if(userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    answer.classList.add("pop");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    answer.classList.add("flash");
    
    // if answer is incorrect then automatically select the right answer
    for (let i = 0; i < allOptions; i++) {
      if(optionList.children[i].textContent == correctAns){
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
  }
}

  // Once user selected, disable all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
}

function startTimer(time) {
  timeCount.classList.remove("flash");
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeCount.classList.add("flash");
      timeCount.style.backgroundColor = "#f8d7da";
      timeCount.style.color = "#a42834";
      timeCount.style.border = "2px solid #a42834";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
      timeLine.style.backgroundColor = "#a42834";
    }
  }
}



function questionCounter(index) {
  const bottomQuestionCounter = quizBox.querySelector(".total-questions");
  let totalQuestionCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
  bottomQuestionCounter.innerHTML = totalQuestionCountTag;
}