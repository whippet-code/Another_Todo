// routes dealing with todos
const express = require("express");
const router = express.Router();

// import custom middlewear
let {
  checkContentType,
  checkDescription,
  checkToken,
} = require("../routes/middlewear");

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
  {
    username: "admin@gmail.com",
    id: 3,
    title: "Todo 3",
    description: "Todo 3 description",
    completed: false,
  },
  {
    username: "billybob@gmail.com",
    id: 4,
    title: "Todo 4",
    description: "Todo 4 description",
    completed: false,
  },
];

/* GET todos route  */
router.get("/", checkToken, function (req, res) {
  // check todo username matches logged in user (pulled from token)
  let userTodos = todos.filter((todo) => todo.username === req.username);
  res.send(JSON.stringify(userTodos));
});

// POST request to add a todo

//export router
module.exports = router;
