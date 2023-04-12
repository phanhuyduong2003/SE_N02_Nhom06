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
      message.innerHTML = "Your email is not in the correct format";
      return;
    } else if (validate_password(password) == false) {
      message.innerHTML =
        "Your password is not in the correct format. Password must be at least 6 characters long";
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
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await username.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({message: 'Username already exists'})
    }
  } catch (error) {}
});
