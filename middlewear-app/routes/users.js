var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");

// require fs module to work with local files
const fs = require("fs");

// import custom middlewear
let {
  checkToken,
  changePassword,
  checkUsername,
  checkContentType,
  getUserInfo,
} = require("../routes/middlewear");

// POST request to log user in returns a token
// takes username and password from body
// itterate the userInfo array to find a match
// if match is found, create a token and send it back to the client
router.post("/login", checkContentType, (req, res) => {
  let userInfo = getUserInfo();
  // check if username and password match
  // find the user in the userInfo array
  let user = userInfo.find((user) => user.username === req.body.username);
  // if user is found, check password
  if (user) {
    if (user.password === req.body.password) {
      // create token
      let token = jwt.sign(
        { username: req.body.username, password: req.body.password },
        "secretKey",
        { expiresIn: "12h" }
      );
      // send token back to client
      res.status(200).json({ message: "Login successful", token: token });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

// PUT request to change user [password]
router.put(
  "/change-password",
  checkToken,
  changePassword,
  checkContentType,
  (req, res) => {
    // find the user in the userInfo array
    let userInfo = getUserInfo();
    let user = userInfo.find((user) => user.username === req.username);
    // if user is found, update password
    if (user) {
      user.password = req.body.newPassword;
      //update userInfo file
      fs.writeFileSync("./database/users.json", JSON.stringify(userInfo));
    }
    res.status(200).json({ message: "Password changed" });
  }
);

// POST request to create a new user
router.post("/create-user", checkContentType, checkUsername, (req, res) => {
  // first test to see if user already exists
  // if user does not exist, create new user
  if (req.body.username === userInfo.username) {
    res.status(401).json({ message: "User already exists" });
  } else if (
    req.body.username &&
    req.body.password === req.body.confirmPassword
  ) {
    // update userInfo file with new user info
    userInfo.username = req.body.username;
    userInfo.password = req.body.password;
    userInfo.id = userInfo.id + 1;
    // send response
    res.status(200).json({ message: "User created" });
  } else if (req.body.password !== req.body.confirmPassword) {
    res.status(401).json({ message: "Passwords do not match" });
  } else {
    res.status(401).json({ message: "Username and password required" });
  }
});

module.exports = router;
