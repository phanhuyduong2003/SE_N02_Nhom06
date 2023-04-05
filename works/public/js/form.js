// const form = [...document.querySelector('.form').children]
// form.forEach((item, i) => {
//     setTimeout(() => {
//         item.style.opacity = 1;
//     }, i*100);
// })
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoIyXQkDT3_eJGdp3_1TM3tMy8_drjP8I",
  authDomain: "car-parking-auth.firebaseapp.com",
  projectId: "car-parking-auth",
  storageBucket: "car-parking-auth.appspot.com",
  messagingSenderId: "160221815148",
  appId: "1:160221815148:web:7579ef0f0395c2750a9349",
  measurementId: "G-KDC6B2NYPE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebaseConfig.auth();
const database = firebaseConfig.database();

const register = document
  .getElementsByClassName("register")
  .addEventListener("submit", (e) => {
    // e.preventDefault();
    const full_name = document.getElementsByClassName("name").value;
    const email = document.getElementsByClassName("email").value;
    const password = document.getElementsByClassName("password").value;
    const message = document.getElementsByClassName("message");
    if (validate_name(full_name) == false) {
      message.innerHTML = "Please enter your name";
      return;
    } else if (validate_email(email) == false) {
        message.innerHTML = 'Your email is not in the correct format';
        return;
    } else if (validate_password(password) == false) {
        message.innerHTML = 'Your password is not in the correct format. Password must be at least 6 characters long';
        return;
    }
  });
function validate_name(full_name) {
  if (full_name == null) {
    return false;
  }
  if (full_name.length <= 0) {
    return false;
  } else {
    return true;
  }
}
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}
function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}
