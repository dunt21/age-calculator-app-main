"use script";

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
const dayContainer = document.querySelector(".dayField");
const monthContainer = document.querySelector(".monthField");
const yearContainer = document.querySelector(".yearField");
const allInputs = document.querySelectorAll("input");

// const errMsg = document.
// const errMsg = document.createElement("p");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

function createErrMsg(msg, id) {
  uiErr();

  const errMsg = document.createElement("p");

  errMsg.textContent = msg;
  errMsg.id = id;
  errMsg.classList.add("textErr", "italic", "text-xs", "mt-2");

  return errMsg;
}

//to display an err when the field is empty
function checkEmptyField() {
  allInputs.forEach((inp) => {
    const parentEl = inp.parentElement;
    const existingMSg = parentEl.querySelector("p");
    existingMSg?.classList.remove("hidden");
    const inputId = inp.id;

    inp.value === "" && !existingMSg
      ? parentEl.appendChild(
          createErrMsg("This field is required", "empty-field-err")
        )
      : removeErrMsg();

    inputId === "day" && inp.value > 31 && !existingMSg
      ? parentEl.appendChild(createErrMsg("Must be a valid day", "invalid-day"))
      : removeErrMsg();
  });
}

//remove error msg
function removeErrMsg() {
  allInputs.forEach((inp) => {
    if (inp.value !== "") {
      const parentEl = inp.parentElement;
      const existingMSg = parentEl.querySelector("p");
      existingMSg?.classList.add("hidden");
    }
  });
}

//to display an err for the label and input
function uiErr() {
  document
    .querySelectorAll("label")
    .forEach((label) => label.classList.add("textErr"));

  allInputs.forEach((inp) => inp.classList.add("inputErr"));
}

function validateInputs() {
  checkEmptyField();

  // if (inputDay.value > 31 && !inputDay.parentElement.querySelector("p")) {
  //   inputDay.parentElement.appendChild(
  //     createErrMsg("Must be a valid day", "invalinod-day")
  //   );
  // } else {
  //   inputDay.parentElement
  //     .querySelector("#invalid-day")
  //     ?.classList.add("hidden");
  // }

  // if (inputMonth.value > 12 && !inputMonth.parentElement.querySelector("p")) {
  //   inputMonth.parentElement.appendChild(
  //     createErrMsg("Must be a valid month", "invalid-month")
  //   );
  // } else {
  //   inputMonth.parentElement
  //     .querySelector("#invalid-month")
  //     ?.classList.add("hidden");
  // }

  // if (
  //   inputYear.value > new Date().getFullYear() &&
  //   !inputYear.parentElement.querySelector("p")
  // ) {
  //   inputYear.parentElement.appendChild(
  //     createErrMsg("Must be in the past", "invalid-year")
  //   );
  // } else {
  //   inputYear.parentElement
  //     .querySelector("#invalid-year")
  //     ?.classList.add("hidden");
  // }
}
