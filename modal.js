function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Add isActive on the links of the navbar
const links = document.querySelectorAll(".main-navbar > a");
console.log(links);
links.forEach((link) => link.addEventListener("click", isActive));
function isActive() {
  links.classList.add("active");
}

// DOM Elements

// Btn => Je m'inscris
const modalBtn = document.querySelectorAll(".modal-btn");
// Form modal - bg - closeBtn
const modalBgForm = document.querySelector(".bground");
const form = document.querySelector("form");
const closeBtn = document.querySelector(".close");
// Inputs form modal
const firstName = document.querySelector("#first");
const name = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const competition = document.querySelector("#quantity");
const checkbox = document.querySelectorAll('input[type="radio"]');
// let location = "";
const legalNotice = document.querySelector("#checkbox1");
const btnSubmit = document.querySelector(".btn-submit");
const btnToggle = document.querySelector(".toggle-modal");

// Regex inputs => function firstName, name, email
const regexName = /^[^0-9]+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Calculate age => function isAdult
const today = new Date();
const birthday = document.getElementById("birthdate");

// Error message
const errorInput = document.querySelectorAll(".text-control");
const errorMsg = document.querySelectorAll(".formData");
const question = document.querySelector(".text-label");
console.log(question);

// Check all inputs are complete
const inputsValidity = {
  firstname: false,
  name: false,
  email: false,
  birthdate: false,
  competition: false,
  checkbox: false,
  legalNotice: true,
};

// Display & close form modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

function launchModal() {
  modalBgForm.style.display = "block";
}

function closeModal() {
  modalBgForm.style.display = "none";
}

// Check all inputs form modal

// Check firstName input => See refactor in method 🔴
firstName.addEventListener("input", firstNameValidation);
// firstName.addEventListener("blur", userValidation);

function firstNameValidation() {
  if (
    firstName.value.length >= 2 &&
    firstName.value.length < 20 &&
    regexName.test(firstName.value)
  ) {
    validationInput({ index: 0, validation: true });
    inputsValidity.firstname = true;
  } else {
    validationInput({ index: 0, validation: false });
    inputsValidity.firstname = false;
  }
}

// Check name input => See refactor in method 🔴
name.addEventListener("input", nameValidation);
// name.addEventListener("blur", userValidation);

function nameValidation() {
  if (
    name.value.length >= 2 &&
    name.value.length < 20 &&
    regexName.test(name.value)
  ) {
    validationInput({ index: 1, validation: true });
    inputsValidity.name = true;
  } else {
    validationInput({ index: 1, validation: false });
    inputsValidity.name = false;
  }
}

// Check email input 👍
email.addEventListener("input", emailValidation);
// email.addEventListener("blur", emailValidation);

function emailValidation() {
  if (regexEmail.test(email.value)) {
    validationInput({ index: 2, validation: true });
    inputsValidity.email = true;
  } else {
    validationInput({ index: 2, validation: false });
    inputsValidity.email = false;
  }
}

// Check dateOfBirth
birthDate.addEventListener("input", isAdult);

function isAdult() {
  const birthdayFormatDate = new Date(birthday.value);
  if (yearsBetweenDates(today, birthdayFormatDate) >= 18) {
    validationInput({ index: 3, validation: true });
    inputsValidity.birthdate = true;
  } else {
    validationInput({ index: 3, validation: false });
    inputsValidity.birthdate = false;
  }
}

function yearsBetweenDates(day1, day2) {
  const duration = Math.round(
    (day1.getTime() - day2.getTime()) / (1000 * 3600 * 24 * 365)
  );
  // console.log(duration);
  return duration;
}

// check competition
competition.addEventListener("input", isNoCompleted);
// competition.addEventListener("blur", isNoCompleted);
function isNoCompleted() {
  // I'd like to check if !competition.value.length===0, for the moment it'doesn't work 😡
  if (competition.value >= 0 && competition.value <= 99) {
    validationInput({ index: 4, validation: true });
    inputsValidity.competition = true;
  } else {
    validationInput({ index: 4, validation: false });
    inputsValidity.competition = false;
  }
}

// Check checkboxes => 🔴 Return location doesn't work
checkbox.forEach((check) => check.addEventListener("click", handleClickCheck));

function handleClickCheck(e) {
  let location = e.target.value;
  if (location != "") {
    validationInput({ index: 5, validation: true });
    inputsValidity.checkbox = true;
  } else {
    validationInput({ index: 5, validation: false });
    inputsValidity.checkbox = false;
  }
  // console.log(location);
  // return location;
}

// Check legalNotice
legalNotice.addEventListener("click", handleClickCheck1);

function handleClickCheck1() {
  if (legalNotice.checked) {
    validationInput({ index: 6, validation: true });
    console.log((inputsValidity.legalNotice = true));
  } else {
    validationInput({ index: 6, validation: false });
    console.log((inputsValidity.legalNotice = false));
  }
}

// **********************************************************************************

// ❓ Refactor firstNameValidation et nameValidation => don't work
function userValidation({ inputName, index }) {
  console.log("InputName : ", inputName);
  console.log("Index : ", index);
  console.log("InputName : ", inputName.value);
  if (
    inputName.value.length >= 2 &&
    inputName.value.length < 20 &&
    regexName.test(inputName.value)
  ) {
    validationInput({ index: index, validation: true });
    inputsValidity = true;
  } else {
    validationInput({ index: index, validation: false });
    inputsValidity = false;
  }
}

// Methods for validating each input and used on each input function
function validationInput({ index, validation }) {
  if (validation) {
    errorInput[index].setAttribute("data-error-visible", "false");
    errorMsg[index].setAttribute("data-error-visible", "false");
  } else {
    errorInput[index].setAttribute("data-error-visible", "true");
    errorMsg[index].setAttribute("data-error-visible", "true");
  }
}

// Send form => replace content form by "Inscription validée"

// form.addEventListener("submit", validate);
let isAnimating = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // function validate(e) {
  // e.preventDefault();
  // console.log(location);
  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter((key) => !inputsValidity[key]);

  if (failedInputs.length && !isAnimating) {
    isAnimating = true;
    btnSubmit.classList.add("shake");

    setTimeout(() => {
      btnSubmit.classList.remove("shake");
      isAnimating = false;
    }, 400);

    failedInputs.forEach((failedInput) => {
      const index = keys.indexOf(failedInput);
      validationInput({ index: index, validation: false });
    });
  } else {
    errorMsg.forEach((msg) => msg.remove());
    question.remove();
    btnSubmit.remove();

    // Doesn'work =>  The location variable is undefined / btn style is strange / the height of the form needs to be reviewed 🔴

    const p = document.createElement("p");
    // const loc = document.querySelector('input[name="location"]');
    // console.log(loc);
    p.innerHTML = `Merci pour votre inscription au tournoi`;
    // p.classList.add("modal-confirmed-text");
    form.appendChild(p);

    // btnToggle.replace("C'est parti", "Fermer");

    const btn = document.createElement("btn");
    btn.innerHTML = `Fermer`;
    btn.classList.add("btn-submit");
    form.appendChild(btn);

    btn.addEventListener("click", closeModal);
  }
});
