//========== elements =======================


let userNameInput = document.getElementById("name"); //user name Input
let userEmailInput = document.getElementById("email"); //user email input
let userPasswordInput = document.getElementById("password"); //user password input
let signUp = document.getElementById("sign-up"); //sign up button
let login = document.getElementById("login"); //login button
let empty = document.querySelector(".empty-input"); //error message for empty inputs
let emptyButton = document.querySelector(".empty-button"); //error message button
let invalid = document.querySelector(".incorrect-input"); //error message for invalid inputs
let invalidButton = document.querySelector(".invalid-button"); //invalid message button
let exist = document.querySelector(".existing-input"); //error message for an already existing inputs
let successMsg = document.querySelector(".success"); //message after successfuly saving data
let welcomeUser = document.getElementById("welcome-msg"); //message for welcoming users
let lockOpen = document.getElementById("lock-open"); //closed lock icon
let lockClosed = document.getElementById("lock-closed"); //open lock icon
let welcomeMsg = document.getElementById("welcome-msg"); //welcome msg to the user
let signOut = document.querySelector(".sign-out");
let outerContainer = document.querySelectorAll(".outer-container"); //all outer containers of pop up error messages

//=========array of all users=========
//check if there's data in local storage or not
let userList = [];
if (localStorage.getItem("users") === null) {
  userList = [];
} else {
  userList = JSON.parse(localStorage.getItem("users"));
}
//=============\/ start of events /\=====================

//======sign up button ================
if (signUp) {
  signUp.addEventListener("click", function () {
    //=========== check if one or more input is empty
    if (emptyInput()) {
      return;
    }
    //============ check validation of name,password and email
    if (validationEmail() && validationName() && validationPassword()) {
      //========= check of email already saved or not and lead user to login page
      if (checkEmail() == false) {
        exist.classList.remove("d-none");
        return;
      }
      //create object user
      let user = {
        userName: userNameInput.value,
        userEmail: userEmailInput.value,
        userPassword: userPasswordInput.value,
      };
      //save user info in array and local storage
      userList.push(user);
      localStorage.setItem("users", JSON.stringify(userList));
      //clear all inputs and show message of success sign up
      clearInputs();
      successMsg.classList.remove("d-none");
    }
  });
}


//=========== login button =========================
if (login) {
  login.addEventListener("click", function () {
    if (userList.length===0 &&(userEmailInput.value===""||userPasswordInput.value==="")) {
      empty.classList.remove("d-none");
    }
    else if (userList.length===0 && !(userEmailInput.value === "" && userPasswordInput.value === "")) {
      invalid.classList.remove("d-none");
    }
    else {
      let email = userEmailInput.value;
      let password = userPasswordInput.value;
      for (let i = 0; i < userList.length; i++) {
        //if email anf password are correct and saved in storage
        if (
          userList[i].userEmail === email &&
          userList[i].userPassword === password
        ) {
          //change lock icon from closed to open
          lockOpen.classList.remove("d-none");
          lockClosed.classList.add("d-none");
          //save current user info
          localStorage.setItem("currentUser", JSON.stringify(userList[i]));
          //redirect to welcome page
          window.location.href = "welcome.html";
          return;
        }
        //if any of the inputs are empty show the empty inputs error message
        else if (email.trim() === "" || password.trim() === "") {
          empty.classList.remove("d-none");
        }
        //if any of the inputs are incorrect and doesn't match with user's saved data
        //show invalid inputs error message
        else if (
          userList[i].userEmail === email ||
          userList[i].userPassword === password
        ) {
          invalid.classList.remove("d-none");
        }
      }
    }
  });
}


//============= empty inputs error message button
if (empty) {
  emptyButton.addEventListener("click", function () {
    close();
  });
}


//===================== invalid inputs error message button
if (invalid) {
  invalidButton.addEventListener("click", function () {
    close();
  });
}


//========= say hi to user in welcome page
if (welcomeMsg) {
  //get current user name and adding it to inner html
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    welcomeMsg.innerText += ` ${currentUser.userName}`;
  }
  //delete current user info after signing out
  signOut.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
  });
}

//close all pop up error messege from the outer container

document.addEventListener("click", function (e) {
  if (e.target === exist || e.target === empty || e.target===invalid) {
    close();
  }
})


//=========== start of functions ====================


// =========== function to clear all inputs
function clearInputs() {
  userEmailInput.value = "";
  userNameInput.value = "";
  userPasswordInput.value = "";
}


//=========== function to close all error messages
function close() {
  empty.classList.add("d-none");
  invalid.classList.add("d-none");
  exist.classList.add("d-none");
}


//=========== function to check if the entered email already exists or not
function checkEmail() {
  for (let i = 0; i < userList.length; i++) {
    if (
      userList[i].userEmail.toLowerCase() === userEmailInput.value.toLowerCase()
    ) {
      return false; 
    }
  }
  return true; 
}

//===========function to check if any of the inputs are empty
function emptyInput() {
  if (
    userEmailInput.value.trim() === "" ||
    userNameInput.value.trim() === "" ||
    userPasswordInput.value.trim() === ""
  ) {
    //========show the empty input error message
    empty.classList.remove("d-none");
    return true;
  } else {
    empty.classList.add("d-none");
    return false;
  }
}


//============== function to check validation of user name
function validationName() {
  let text = userNameInput.value;
  let regex = /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/;
  if (regex.test(text)) {
    invalid.classList.add("d-none");
    return true;
  } else {
    //=========== show error message of invalid inputs
    invalid.classList.remove("d-none");
    return false;
  }
}


//================ function to check validation of user email
function validationEmail() {
  let text = userEmailInput.value;
  let regex = /.+@.+\..+/;
  if (regex.test(text)) {
    invalid.classList.add("d-none");
    return true;
  } else {
    invalid.classList.remove("d-none");
    return false;
  }
}


// ======================= functio to check validation of user password
function validationPassword() {
  let text = userPasswordInput.value;
  let regex = /^(?=(?:.*[A-Za-z]){5,})[A-Za-z\d@$!%*#?&]*$/;
  if (regex.test(text)) {
    invalid.classList.add("d-none");
    return true;
  } else {
    invalid.classList.remove("d-none");
    return false;
  }
}


//=================end of functions =============
