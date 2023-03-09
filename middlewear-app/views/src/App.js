// import react HOOKS
import React, { useState } from "react";

import "./App.css";

// import components
import Welcome from "./components/Welcome";
import TodoList from "./components/TodoList";

function App() {
  // conditional rendering depednig on if user is logged in or not (stored in state isLoggedIn)
  // if user is not logged in, display log in and sign up forms
  // if user is logged in, display that users todo list
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>enlisted</h1>
        {isLoggedIn ? <button>Log Out</button> : null}
      </header>
      <main>{isLoggedIn ? <TodoList /> : <Welcome />}</main>
    </div>
  );
}

export default App;
