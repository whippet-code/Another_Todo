var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let { checkToken, changePassword } = require("../routes/middlewear");

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

    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

// PUT request to change user [password]
router.put("/change-password", changePassword, (req, res) => {
  userInfo.password = req.newUserPassword;
  res.status(200).json({ message: "Password changed" });
});

module.exports = router;
