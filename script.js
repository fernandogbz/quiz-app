// Getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");

// When start button clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); // show the info box
}

// When exit button clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // hide the info box
}