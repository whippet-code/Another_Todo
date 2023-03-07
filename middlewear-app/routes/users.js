var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
// import custom middlewear
let {
  checkToken,
  changePassword,
  checkUsername,
  checkContentType,
} = require("../routes/middlewear");

// dummy user info
const userInfo = {
  username: "test@gmail.com",
  password: "123456",
};

// dummy todos for testing / setup
const todos = [
  {
    username: "test@gmail.com",
    id: 1,
    title: "Todo 1",
    description: "Todo 1 description",
    completed: false,
  },
  {
    username: "test@gmail.com",
    id: 2,
    title: "Todo 2",
    description: "Todo 2 description",
    completed: true,
  },
];

/* GET users listing. using custom middlewear  */
router.get("/", checkToken, function (req, res) {
  res.send(JSON.stringify(todos));
});

// POST requ  to log user in returns a token
router.post("/login", (req, res) => {
  if (
    req.body.username === userInfo.username &&
    req.body.password === userInfo.password
  ) {
    let token = jwt.sign(
      {
        username: userInfo.username,
        password: userInfo.password,
        extra: "extra info",
      },
      "secretKey",
      { expiresIn: "1h" }
    );

    // return token to client - store token in local storage / global state for all future requests within the app whilst logged in
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

// PUT request to change user [password]
router.put("/change-password", changePassword, checkContentType, (req, res) => {
  // This would update the DB
  userInfo.password = req.newUserPassword;
  res.status(200).json({ message: "Password changed" });
});

// POST request to create a new user
router.post("/create-user", checkContentType, checkUsername, (req, res) => {
  if (req.body.username && req.body.password === req.body.confirmPassword) {
    // these would be saved to DB
    userInfo.username = req.body.username;
    userInfo.password = req.body.password;
    res.status(200).json({ message: "User created" });
  } else if (req.body.password !== req.body.confirmPassword) {
    res.status(401).json({ message: "Passwords do not match" });
  } else {
    res.status(401).json({ message: "Username and password required" });
  }
  // Also need protection against duplicate usernames
});

module.exports = router;
