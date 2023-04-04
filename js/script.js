// Getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");

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
}

let questionCount = 0;
let questionNumber = 1;

const nextBtn = quizBox.querySelector(".next-btn");

// When next button clicked
nextBtn.onclick = () => {
  if(questionCount < questions.length - 1){
    questionCount++;
    questionNumber++;
    showQuestions(questionCount);
    questionCounter(questionNumber);
  } else {
    console.log("Questions completed");
  }
}

// Getting questions and options from array
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  const optionList = document.querySelector(".option-list");
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

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[questionCount].answer;
  if(userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
  } else {
    console.log("Answer is Wrong");
  }
}

function questionCounter(index) {
  const bottomQuestionCounter = quizBox.querySelector(".total-questions");
  let totalQuestionCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
  bottomQuestionCounter.innerHTML = totalQuestionCountTag;
}