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
  }

  // create a function to handle the checkbox
  //upon clicking the checkbox, the todo item should toggle it's complete state and send the updated todo item to the server
  function handleCheckbox() {
    // toggle the complete state of the todo item
    setTodo({
      ...todo,
      completed: !todo.completed,
    });
    // send the updated todo item to the server
    fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="todo">
      <h3>{props.todo.title}</h3>
      <p>{props.todo.description}</p>
      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <input type="checkbox" onClick={handleCheckbox} />
    </div>
  );
}

export default Todo;
