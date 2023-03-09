// Welcome component
// username / password form with two buttons, log in and register. If log in is clicked, send a post request to the server to log in. If register is clicked, send a post request to the server to register a new user

import { useState, useEffect } from "react";

function Welcome(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("username: ", username);
  }, [username]);

  useEffect(() => {
    console.log("password: ", password);
  }, [password]);

  // make a fetch call to the server to log in and with returned token set state in App.js
  function handleSignIn() {
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        props.setToken((prevState) => data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // make a fetch call to the server to register a new user. Notify user that account is created and prompt them to sign in
  function handleRegister() {
    props.setToken((prevState) => "JWT Token");
  }

  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername((prevState) => e.target.value);
    } else if (e.target.name === "password") {
      setPassword((prevState) => e.target.value);
    }
  }

  return (
    <div className="welcome">
      <h3>Welcome to enlisted</h3>
      <form className="signInForm">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit" onClick={handleSignIn}>
          Log In
        </button>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Welcome;
