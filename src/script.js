const number = document.querySelectorAll(".num");
const answerField = document.querySelector(".answer");
const enter = document.querySelector(".enter");
const escapeButton = document.querySelector(".escape");
const reset = document.querySelector("#reset");
const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const operation = document.querySelector("#operation");
const score = document.querySelector("#score");
const mainContainer = document.querySelector(".main-container");
const timer = document.querySelector("#timer");

score.innerHTML = 0;
var countCorrect = 0;
var gameTimer = "";

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newEquation() {
  const operations = ["+", "-", "*", "/"];

  operation.innerHTML =
    operations[Math.floor(Math.random() * operations.length)];

  switch (operation.innerHTML) {
    case "-":
      var number1 = randomIntBetween(0, 12);
      var number2 = randomIntBetween(0, 12);

      if (number1 < number2) {
        console.log("Uh oh, that's gonna be negative... hmmm...");
        num1.innerHTML = number2;
        num2.innerHTML = number1;
      } else {
        num1.innerHTML = number1;
        num2.innerHTML = number2;
      }
      break;
    case "/":
      number1 = randomIntBetween(0, 12);
      number2 = randomIntBetween(1, 12);

      console.log(number1, number2);
      while (number1 % number2 !== 0) {
        number1 = randomIntBetween(0, 12);
        number2 = randomIntBetween(1, 12);

        console.log(number1, number2);
      }

      num1.innerHTML = number1;
      num2.innerHTML = number2;
      break;
    default:
      var number1 = randomIntBetween(0, 12);
      var number2 = randomIntBetween(0, 12);

      num1.innerHTML = number1;
      num2.innerHTML = number2;
  }
}

function checkAnswer() {
  var answer = 0;
  var userAnswer = Number(answerField.innerHTML);

  console.log(
    Number(num1.innerHTML),
    operation.innerHTML,
    Number(num2.innerHTML)
  );

  switch (operation.innerHTML) {
    case "+":
      answer = Number(num1.innerHTML) + Number(num2.innerHTML);
      break;
    case "-":
      answer = Number(num1.innerHTML) - Number(num2.innerHTML);
      break;
    case "*":
      answer = Number(num1.innerHTML) * Number(num2.innerHTML);
      break;
    case "/":
      answer = Number(num1.innerHTML) / Number(num2.innerHTML);
      break;
  }

  if (answer == userAnswer) {
    console.log("User answered correctly!");
    score.innerHTML = Number(score.innerHTML) + 100;
    countCorrect++;

    answerField.classList.toggle("correct");
    mainContainer.classList.toggle("correct");

    setTimeout(() => {
      answerField.classList.toggle("correct");
      mainContainer.classList.toggle("correct");
      answerField.innerHTML = "";
    }, 300);

    newEquation();
  } else {
    console.log("Incorrect!!!");
    answerField.classList.toggle("wrong");
    mainContainer.classList.toggle("wrong");

    setTimeout(() => {
      answerField.classList.toggle("wrong");
      mainContainer.classList.toggle("wrong");
      answerField.innerHTML = "";
    }, 300);
  }
}

number.forEach((num) => {
  num.addEventListener("click", () => {
    answerField.innerHTML += num.innerHTML;
    console.log(answerField.innerHTML);
  });
});

enter.addEventListener("click", () => {
  if (score.innerHTML !== "Start!") {
    checkAnswer();
  }
});

escapeButton.addEventListener("click", () => {
  answerField.innerHTML = answerField.innerHTML.slice(0, -1);
  console.log(answerField.innerHTML);
});

reset.addEventListener("click", () => {
  console.log("Answer field cleared...");
  answerField.innerHTML = "";

  num1.innerHTML = "";
  num2.innerHTML = "";
  operation.innerHTML = "Ready?";

  score.innerHTML = "Start!";
  score.classList.add("start");

  timer.innerHTML = "Timer";
  clearInterval(gameTimer);
});

score.addEventListener("click", () => {
  if (score.innerHTML === "Start!") {
    score.innerHTML = 0;
    score.classList.remove("start");
    newEquation();

    timer.innerHTML = 5;

    gameTimer = setInterval(() => {
      timer.innerHTML--;
      console.log(timer.innerHTML);

      if (Number(timer.innerHTML) <= 0) {
        clearInterval(gameTimer);
        timer.innerHTML = "Timer";
      }
    }, 1000);
  }
});

operation.innerHTML = "Ready?";
score.innerHTML = "Start!";
score.classList.add("start");
