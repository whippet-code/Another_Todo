const jwt = require("jsonwebtoken");
const fs = require("fs");

// function to check jwt token (verify if user is logged in or not  and if they have access to the route)
const checkToken = (req, res, next) => {
  if (req.headers.token) {
    let token = req.headers.token;
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.username = data.username;
        req.password = data.password;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token not found" });
  }
};

// function to change user password & verify if it is over 6 characters long
const changePassword = (req, res, next) => {
  if (
    req.body.newPassword == req.body.confirmPassword &&
    req.body.newPassword.length >= 6
  ) {
    req.newUserPassword = req.body.newPassword;
    next();
  } else if (req.body.newPassword.length < 6) {
    res.status(401).json({ message: "Password must be at least 6 characters" });
  } else {
    res.status(401).json({ message: "Passwords do not match" });
  }
};

// function to send a 403 response if username does not end in "@gmail.com"
const checkUsername = (req, res, next) => {
  // check if username ends in "@gmail.com"
  // regex for string ending in "@gmail.com" (VIA COPILOT)
  let regex = /@gmail.com$/;
  if (!regex.test(req.body.username)) {
    res.status(403).json({ message: "Username must end in @gmail.com" });
  } else {
    next();
  }
};

// function to reject requests with description longer than 140 characters
const checkDescription = (req, res, next) => {
  if (req.body.description.length > 140) {
    res
      .status(403)
      .json({ message: "Description must be less than 140 characters" });
  } else {
    next();
  }
};

// function to reject requests not having JSON content type
const checkContentType = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(403).json({ message: "Content type must be application/json" });
  } else {
    next();
  }
};

//function to search user.json file and confirm if passsed in user is a valid user
const checkUser = (req, res, next) => {
  // search userInfo json file for a match
  let userInfo = getUserInfo();
  let userExists = false;
  userInfo.forEach((user) => {
    if (user.username === req.body.username) {
      userExists = true;
    }
  });
  if (userExists) {
    next();
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

// get user data file from local directory
function getUserInfo() {
  try {
    let userInfo = fs.readFileSync("./database/users.json");
    return JSON.parse(userInfo);
  } catch (err) {
    console.log(`ERROR Loading users data: ${err}`);
  }
}

// function to load todosData from local file
function getTodosData() {
  try {
    let todosData = fs.readFileSync("./database/todos.json");
    return JSON.parse(todosData);
  } catch (err) {
    console.log(`ERROR Loading todos data: ${err}`);
  }
}

//export the functions
module.exports = {
  checkToken,
  changePassword,
  checkUsername,
  checkDescription,
  checkContentType,
  checkUser,
  getUserInfo,
  getTodosData,
};
