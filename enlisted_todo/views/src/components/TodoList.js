// todo list component

import { useState, useEffect } from "react";
// div to render out all of the users todo items
import Todo from "./Todo";
import NewTodo from "./NewTodo";

function TodoList(props) {
  // set up state  for the todo list
  const [todoList, setTodoList] = useState([]);

  //use use effect to make a fetch request to the server to get all of the users todo items. then prevent the infinite loop by passing an empty array as the second argument
  useEffect(() => {
    // make fetch request to the server to get all of the users todo items
    fetch("http://localhost:8080/todos/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: props.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // set the todos state to the data returned from the server
        setTodoList(data);
      })
      .catch((err) => console.log(err));
  }, [props.token]);

  // map the todo array and render a todo comp for each todo item

  return (
    <div className="todo-list">
      <NewTodo setTodoList={setTodoList} />
      <h3>Todo List</h3>
      {todoList.map((todo) => (
        <Todo todo={todo} key={todo.id} setTodoList={setTodoList} />
      ))}
    </div>
  );
}

export default TodoList;
