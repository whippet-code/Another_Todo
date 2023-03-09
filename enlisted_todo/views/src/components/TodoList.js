// todo list component
// div to render out all of the users todo items
import Todo from "./Todo"

function TodoList(props) {
  return (
    <div className="todo-list">
      <h3>Todo List</h3>
      <Todo />
    </div>
  )
}

export default TodoList