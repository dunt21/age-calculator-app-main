"use script";

const submitBtn = document.getElementById("submit");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const form = document.getElementById("form");
const dayContainer = document.querySelector(".dayField");
const monthContainer = document.querySelector(".monthField");
const yearContainer = document.querySelector(".yearField");

// const errMsg = document.

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

function errMsg(msg, id) {
  const errMsg = document.createElement("p");
  errMsg.textContent = msg;
  errMsg.id = id;
  errMsg.classList.add("textErr");

  return errMsg;
}

//to display an err when the field is empty
function checkEmptyField(parentEl, el) {
  if (el === "" && !parentEl.closest("#emptyVal")) {
    uiErr();

    parentEl.appendChild(errMsg("Field can't be empty", "emptyVal"));
  }
}

//clearing err msg from the dom
function removeErrMsg(el) {
  el.remove();
}

//to display an err for the label and input
function uiErr() {
  document
    .querySelectorAll("label")
    .forEach((label) => label.classList.add("textErr"));
  document
    .querySelectorAll("input")
    .forEach((inp) => inp.classList.add("inputErr"));
}

function validateInputs() {
  const inputDayVal = inputDay.value;
  const inputMonthVal = inputMonth.value;
  const inputYearVal = inputYear.value;

  checkEmptyField(dayContainer, inputDayVal);
  checkEmptyField(monthContainer, inputMonthVal);
  checkEmptyField(yearContainer, inputYearVal);
}
