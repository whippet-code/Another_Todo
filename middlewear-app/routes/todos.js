// routes dealing with todos
const express = require("express");
const router = express.Router();

// require fs module to work with local files
const fs = require("fs");

// import custom middlewear
let {
  checkContentType,
  checkDescription,
  checkToken,
  getTodosData,
} = require("../routes/middlewear");

/* GET todos route  */
router.get("/", checkToken, function (req, res) {
  // load todos.json file from local directory
  let todos = getTodosData();
  // check todo username matches logged in user (pulled from token)
  let userTodos = todos.filter((todo) => todo.username === req.username);
  res.send(JSON.stringify(userTodos));
});

// POST request to add a todo
router.post("/", checkToken, checkContentType, checkDescription, (req, res) => {
  // load todos.json file from local directory
  let todos = getTodosData();
  // create new todo object, for id create a date/time stamp, username is pulled from token
  let newTodo = {
    id: Date.now(),
    username: req.username,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  // add new todo to todos array
  todos.push(newTodo);
  // update todos.json file
  fs.writeFileSync("./database/todos.json", JSON.stringify(todos));
  // send response to client
  res.status(200).json({ message: "Todo added" });
});

//export router
module.exports = router;
