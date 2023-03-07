const jwt = require("jsonwebtoken");

// function to check jwt token
const checkToken = (req, res, next) => {
  if (req.headers.token) {
    let token = req.headers.token;
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        res.status(401).json({ message: "Invalid token" });
        next();
      } else {
        req.username = data.username;
        req.password = data.password;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token not found" });
    next();
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
    next();
  } else {
    res.status(401).json({ message: "Passwords do not match" });
    next();
  }
};

// function to send a 403 response if username does not end in "@gmail.com"
const checkUsername = (req, res, next) => {
  // check if username ends in "@gmail.com"
  // regex for string ending in "@gmail.com" (VIA COPILOT)
  let regex = /@gmail.com$/;
  if (!regex.test(req.body.username)) {
    res.status(403).json({ message: "Username must end in @gmail.com" });
    next();
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
    next();
  } else {
    next();
  }
};

// function to reject requests not having JSON content type
const checkContentType = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(403).json({ message: "Content type must be application/json" });
    next();
  } else {
    next();
  }
};

//export the functions
module.exports = {
  checkToken,
  changePassword,
  checkUsername,
  checkDescription,
  checkContentType,
};
