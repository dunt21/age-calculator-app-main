"use script";

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const displayDates = document
  .querySelector(".age-display")
  .querySelectorAll("span");

const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
const dayContainer = document.querySelector(".dayField");
const monthContainer = document.querySelector(".monthField");
const yearContainer = document.querySelector(".yearField");
const allInputs = document.querySelectorAll("input");

//initialization function to start the app from fresh
function init() {
  inputDay.value = "";
  inputMonth.value = "";
  inputYear.value = "";

  displayDates.forEach((p) => (p.textContent = "--"));
}

//when the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateFullDate();
  calculateAge();
});

//used to create an err msg
function createErrMsg(msg, id) {
  uiErr("add");
  hasErr = true;
  const errMsg = document.createElement("p");
  errMsg.textContent = msg;
  errMsg.id = id;
  errMsg.classList.add("textErr", "italic", "text-xs", "mt-2");

  return errMsg;
}

//to check for the various errors in any input field
function checkErrs() {
  const inputValues = [];

  allInputs.forEach((inp) => {
    const parentEl = inp.parentElement;
    const emptyErr = parentEl.querySelector("#empty-field-err");
    const dayErr = parentEl.querySelector(`#invalid-day`);
    const monthErr = parentEl.querySelector(`#invalid-month`);
    const yearErr = parentEl.querySelector(`#invalid-year`);

    parentEl.querySelectorAll("p").forEach((p) => p.classList.remove("hidden"));
    const inputId = inp.id;

    inp.value === "" && !emptyErr
      ? parentEl.appendChild(
          createErrMsg("This field is required", "empty-field-err")
        )
      : removeErrMsg();

    if (inputId === "day" && inp.value > 31) {
      uiErr("add");

      console.log("wow");
      if (!dayErr)
        parentEl.appendChild(
          createErrMsg("Must be a valid day", "invalid-day")
        );
    } else {
      dayErr?.classList.add("hidden");
    }

    if (inputId === "month" && inp.value > 12) {
      uiErr("add");
      if (!monthErr)
        parentEl.appendChild(
          createErrMsg("Must be a valid month", "invalid-month")
        );
    } else {
      monthErr?.classList.add("hidden");
    }

    if (inputId === "year" && inp.value > new Date().getFullYear()) {
      uiErr("add");

      if (!yearErr)
        parentEl.appendChild(
          createErrMsg("Must be a valid year", "invalid-year")
        );
    } else {
      yearErr?.classList.add("hidden");
    }

    inputValues.push(+inp.value);
  });

  return inputValues;
}

//remove error msg
function removeErrMsg() {
  allInputs.forEach((inp) => {
    if (inp.value !== "") {
      const parentEl = inp.parentElement;
      const existingMSg = parentEl.querySelector(`#empty-field-err`);
      existingMSg?.classList.add("hidden");
    }
  });
}

//to display an err for the label and input
function uiErr(action) {
  document
    .querySelectorAll("label")
    .forEach((label) => label.classList[action]("textErr"));

  allInputs.forEach((inp) => inp.classList[action]("inputErr"));
}

//to validate the date of the user inputted
function validateFullDate() {
  const values = checkErrs();
  const invalidDateErr = dayContainer.querySelector("#invalid-date");

  if (values.some((val) => val === 0)) return;

  const monthDays = new Date(0, values[1], 0).getDate();

  if (values[0] > monthDays) {
    uiErr("add");

    dayContainer.querySelector(`#invalid-day`).classList.add("hidden");

    if (!invalidDateErr)
      inputDay.insertAdjacentElement(
        "afterend",
        createErrMsg("Must be a valid date", "invalid-date")
      );
    console.log("date is invalid");
  } else {
    invalidDateErr?.classList.add("hidden");
  }

  // console.log(values);
  return values;
}

//to calculate the age in month, day and year
function calculateAge() {
  const dateNow = new Date();
  console.log(dateNow);

  const vals = validateFullDate();

  if (!vals) return;
  uiErr("remove");

  console.log(dateNow.getDate());
  console.log(1 - dateNow.getFullYear());

  const days = vals[0] - dateNow.getDate();
  const month = vals[1] - dateNow.getMonth() - 1;
  const year = vals[2] - dateNow.getFullYear();

  displayDates.forEach((p) => {
    if (p.classList.contains("display-day")) p.textContent = Math.abs(days);
    if (p.classList.contains("display-month")) p.textContent = Math.abs(month);
    if (p.classList.contains("display-year")) p.textContent = Math.abs(year);
  });

  console.log(vals);
}

document.querySelector(".restart").addEventListener("click", init);
