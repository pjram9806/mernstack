let userInputElement = document.getElementById("userInput");
let resultElement = document.getElementById("gameResult");
let generateRandomNo = Math.ceil(Math.random() * 100);
console.log(generateRandomNo);

let checkGuess = () => {
  let guessedNumber = parseInt(userInputElement.value);

  if (guessedNumber > generateRandomNo) {
    resultElement.textContent = "Too High!! Try Again.";
    resultElement.style.backgroundColor = "#1e217c";
  } else if (guessedNumber < generateRandomNo) {
    resultElement.textContent = "Too Low!! Try Again.";
    resultElement.style.backgroundColor = "#1e217c";
  } else if (guessedNumber === generateRandomNo) {
    resultElement.textContent = "Congratulations You Got it Right";
    resultElement.style.backgroundColor = "green";
  } else {
    resultElement.textContent = "Please provide a Valid Input";
    resultElement.style.backgroundColor = "red";
  }
};
