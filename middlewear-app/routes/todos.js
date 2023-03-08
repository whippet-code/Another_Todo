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
} = require("../routes/middlewear");

// function to load todosData from local file
function getTodosData() {
  try {
    let todosData = fs.readFileSync("./database/todosData.json");
    return JSON.parse(todosData);
  } catch (err) {
    console.log(`ERROR Loading todos data: ${err}`);
  }
}

/* GET todos route  */
router.get("/", checkToken, function (req, res) {
  // check todo username matches logged in user (pulled from token)
  let userTodos = todos.filter((todo) => todo.username === req.username);
  res.send(JSON.stringify(userTodos));
});

// POST request to add a todo

//export router
module.exports = router;
