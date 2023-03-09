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
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogOut = () => {
    // clear out the JWT token and localstorage, which will cause the user to be logged out
    setToken((prevState) => null);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>enlisted</h1>
        {token ? <button onClick={handleLogOut}>Log Out</button> : null}
      </header>
      <main>
        {token ? (
          <TodoList token={token} />
        ) : (
          <Welcome token={token} setToken={setToken} />
        )}
      </main>
    </div>
  );
}

export default App;
