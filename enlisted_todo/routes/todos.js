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
} = require("./middlewear");

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

// PUT request to update a todo
// takes id from url, and new todo data from body
router.put(
  "/:id",
  checkToken,
  checkContentType,
  checkDescription,
  (req, res) => {
    // load todos.json file from local directory
    let todos = getTodosData();
    // find the todo in the todos array, get id from req.params, and update it
    let todo = todos.find((todo) => todo.id === parseInt(req.params.id));
    // if todo is found, update it
    if (todo) {
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.completed = req.body.completed;
      // update todos.json file
      fs.writeFileSync("./database/todos.json", JSON.stringify(todos));
      // send response to client
      res.status(200).json({ message: "Todo updated" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  }
);

// DELETE request to delete a todo
// takes id from url
router.delete("/:id", checkToken, (req, res) => {
  // load todos.json file from local directory
  let todos = getTodosData();
  //get id from req.params, and remove that todo from the todos array
  let todoid = parseInt(req.params.id);
  // remove todo from todos array
  todos = todos.filter((todo) => todo.id !== todoid);
  // update todos.json file
  fs.writeFileSync("./database/todos.json", JSON.stringify(todos));
  // send response to client
  res.status(200).json({ message: "Todo deleted" });
});

//export router
module.exports = router;
