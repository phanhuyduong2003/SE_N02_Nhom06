const register = document
  .querySelector(".register")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const full_name = document.querySelector(".name").value.trim();
    const email = document.querySelector(".email").value.trim();
    const password = document.querySelector(".password").value.trim();
    const message = document.querySelector(".message");
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
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          message.innerHTML = data.message;
        } else {
          message.innerHTML = data.message;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}
function validate_password(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});
const User = sequelize.define("User", {
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (validate_name(full_name) == false) {
      return res.status(400).json({ message: "Please enter your name" });
    } else if (validate_email(email) == false) {
      return res
        .status(400)
        .json({ message: "Your email is not in the correct format" });
    } else if (validate_password(password) == false) {
      return res.status(400).json({
        message:
          "Your password is not in the correct format. Password must be at least 6 characters long",
      });
    }
    const existingUser = await User.findOne({ where: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      full_name: full_name,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({ message: "Registration succesful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
    // return res.status(200).json({ message: "Login succesful" }, user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
