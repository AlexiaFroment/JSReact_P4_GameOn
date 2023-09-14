function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// Main modal
const modalBtn = document.querySelectorAll(".modal-btn");
// Modal form
const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/* close modal form
I create a element closeModal with querySelector(".close")
addEventListener, when i click the form modal close it 
*/
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}

// Implement form data
// ✔️ Implement regex on email and date of birth
// ✔️ Check email and date of birth are OK
// ✔️ Check all input are completed => if(true){return confirm message} else{return error message}
