// new todo / edit todo component

import { useState } from "react";

function NewTodo(props) {
  // set up state for the new todo form
  const [newTodo, setNewTodo] = useState({
    id: Date.now(),
    title: "",
    description: "",
    completed: false,
  });

  // handle change function for the new todo form
  const handleChange = (e) => {
    setNewTodo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit function for the new todo form
  const handleSubmit = (e) => {
    e.preventDefault();
    //verify form is complete
    if (!newTodo.title || !newTodo.description) {
      return alert("Please fill out the form");
    }
    // make fetch request to the server to create a new todo
    fetch("http://localhost:8080/todos/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // update the todo list state
        props.setTodoList((prevState) => [...prevState, newTodo]);
        // reset the new todo form
        setNewTodo((prevState) => ({
          id: Date.now(),
          title: "",
          description: "",
          completed: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <h3>New Todo</h3>
      <label htmlFor="title">Title</label>
      <input
        className="title"
        type="text"
        name="title"
        value={newTodo.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        className="description"
        type="text"
        name="description"
        value={newTodo.description}
        onChange={handleChange}
      />
      <input className="submit-button" type="submit" value="Add Todo" />
    </form>
  );
}

export default NewTodo;
