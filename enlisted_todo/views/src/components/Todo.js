// todo component

// props passed to the component
// title, description, completed
// render each todo item as a card
// with buttons to edit and delete the todo item
// and a checkbox to mark the todo item as completed
function Todo(props) {
  return (
    <div className="todo">
      <h3>{props.todo.title}</h3>
      <p>{props.todo.description}</p>
      <button>Edit</button>
      <button>Delete</button>
      <input type="checkbox" />
    </div>
  );
}

export default Todo;
