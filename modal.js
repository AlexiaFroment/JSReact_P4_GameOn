function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// SELECT ITEMS*****************************************************
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
const legalNotice = document.querySelector("#checkbox1");
const btnSubmit = document.querySelector(".btn-submit");
const btnToggle = document.querySelector(".toggle-modal");

// Regex inputs => function firstName, name, email
const regexName = /^[^0-9]+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Calculate age => function isAdult
const birthday = document.getElementById("birthdate");

// Error message
const errorInput = document.querySelectorAll(".text-control");
const errorMsg = document.querySelectorAll(".formData");
const question = document.querySelector(".text-label");

// DISPLAY *******************************************************

// NavBar toggle
const btn = document.querySelector(".icon");
const icon = document.querySelector(".icon i");
const dropdownMenu = document.querySelector(".dropdown-menu");

btn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("open");
  const isOpen = dropdownMenu.classList.contains("open");

  icon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

// Open & close  modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

function launchModal() {
  modalBgForm.style.display = "block";
}

function closeModal() {
  modalBgForm.style.display = "none";
  location.reload();
}

// CHECK EACH MODAL INPUT INDIVIDUALLY**********************************

// ✅ Check firstName
firstName.addEventListener("input", firstNameValidation);
firstName.addEventListener("blur", firstNameValidation);

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

// ✅ Check name input
name.addEventListener("input", nameValidation);
name.addEventListener("blur", nameValidation);

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

// ✅ Check email input
email.addEventListener("input", emailValidation);
email.addEventListener("blur", emailValidation);

function emailValidation() {
  if (regexEmail.test(email.value)) {
    validationInput({ index: 2, validation: true });
    inputsValidity.email = true;
  } else {
    validationInput({ index: 2, validation: false });
    inputsValidity.email = false;
  }
}

// ✅ Check dateOfBirth
birthDate.addEventListener("input", isAdult);
birthDate.addEventListener("blur", isAdult);

function isAdult() {
  const today = new Date();
  const birthdayFormatDate = new Date(birthday.value);

  if (
    yearsBetweenDates(today, birthdayFormatDate) >= 18 &&
    yearsBetweenDates(today, birthdayFormatDate) <= 100
  ) {
    validationInput({ index: 3, validation: true });
    inputsValidity.birthdate = true;
  } else {
    validationInput({ index: 3, validation: false });
    inputsValidity.birthdate = false;
  }
}

function yearsBetweenDates(day1, day2) {
  const duration = Math.round(
    Math.abs(day1.getTime() - day2.getTime()) / (1000 * 3600 * 24 * 365)
  );
  return duration;
}

// ✅ check competition
competition.addEventListener("input", isNoCompleted);
function isNoCompleted() {
  if (competition.value >= 0 && competition.value <= 99) {
    validationInput({ index: 4, validation: true });
    inputsValidity.competition = true;
  } else {
    validationInput({ index: 4, validation: false });
    inputsValidity.competition = false;
  }
}

// ✅ Check checkboxes
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
}

// ✅ Check legalNotice
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

// ▶️ Methods for validating each input and used on each input function
function validationInput({ index, validation }) {
  if (validation) {
    errorInput[index].setAttribute("data-error-visible", "false");
    errorMsg[index].setAttribute("data-error-visible", "false");
  } else {
    errorInput[index].setAttribute("data-error-visible", "true");
    errorMsg[index].setAttribute("data-error-visible", "true");
  }
}

// CHECK ALL INPUTS BEFORE TO SEND

// When I click on "Let's Go", check that each modal input is complete
// Create an object to check ...
const inputsValidity = {
  firstname: false,
  name: false,
  email: false,
  birthdate: false,
  competition: false,
  checkbox: false,
  legalNotice: true,
};

let isAnimating = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter((key) => !inputsValidity[key]);

  // Create an animation on the button "Let's Go" if there is a problem
  if (failedInputs.length && !isAnimating) {
    isAnimating = true;
    btnSubmit.classList.add("shake");

    setTimeout(() => {
      btnSubmit.classList.remove("shake");
      isAnimating = false;
    }, 400);

    // Check on which input there is a problem
    failedInputs.forEach((failedInput) => {
      const index = keys.indexOf(failedInput);
      validationInput({ index: index, validation: false });
    });
  } else {
    errorMsg.forEach((msg) => msg.remove());
    question.remove();
    btnSubmit.remove();

    // Create element for replace the content form
    const p = document.createElement("p");
    p.innerText = `Merci pour \n votre inscription`;
    p.classList.add("modal-confirmed-text");
    form.appendChild(p);

    const btn = document.createElement("btn");
    btn.innerText = `Fermer`;
    btn.classList.add("btn-submit2");
    form.appendChild(btn);

    btn.addEventListener("click", closeModal);
  }
});
