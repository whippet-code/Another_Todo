// todo component

// props passed to the component
// title, description, completed
// render each todo item as a card
// with buttons to edit and delete the todo item
// and a button to mark the todo item as completed
// load the props into state
// create a function to handle the edit button
// create a function to handle the delete button
// create a function to handle the checkbox

// CHECKBOX TURN TO BUTTON AND MAKE SURE IT WORKS.

import { useState } from "react";

// import styles
import "./compStyles.css";

function Todo(props) {
  // load the props into state
  const [todo, setTodo] = useState(props.todo);

  // create a function to handle the edit button
  function handleEdit() {
    console.log("edit");
  }

  // create a function to handle the delete button
  // take the id of the todo item and send it to the server to delete it
  function handleDelete() {
    fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));

    // remove the todo item from the screen
    const todoItem = document.getElementById(todo.id);
    todoItem.remove();
  }

  // function of handle complete
  // when clicked the todo item with toggle the complete value of the todo item
  // also toggle a completed class to the todo item on screen
  function handleComplete() {
    fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));

    // toggle the completed value of the todo item
    setTodo({
      ...todo,
      completed: !todo.completed,
    });

    // toggle the completed class on the todo item
    const todoItem = document.getElementById(todo.id);
    todoItem.classList.toggle("completed");
  }

  return (
    <div
      className={props.todo.completed ? "todo completed" : "todo"}
      id={props.todo.id}
    >
      <h3>{props.todo.title}</h3>
      <p>{props.todo.description}</p>
      {props.todo.completed ? <p>Done</p> : <p>Todo</p>}
      <button className="editButton" type="button" onClick={handleEdit}>
        Edit
      </button>
      <button className="deleteButton" type="button" onClick={handleDelete}>
        Delete
      </button>
      <button className="completeToggle" type="button" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
}

export default Todo;
