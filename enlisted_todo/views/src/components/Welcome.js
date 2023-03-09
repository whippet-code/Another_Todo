// Welcome component
// username / password form with two buttons, log in and register. If log in is clicked, send a post request to the server to log in. If register is clicked, send a post request to the server to register a new user

import { useState, useEffect } from "react";

function Welcome(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [username, password]);

  // make a fetch call to the server to log in and with returned token set state in App.js
  function handleSignIn() {
    //ensure form is filled in completely
    if (!username || !password) {
      return alert("Please fill out the form");
    }
    // make fetch call to the server to log in
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
        console.log(data.message);
        if (data.token) {
          localStorage.setItem("token", data.token);
          props.setToken((prevState) => data.token);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setUsername((prevState) => "");
        setPassword((prevState) => "");
      });
  }

  // make a fetch call to the server to register a new user. Notify user that account is created and sign them in
  function handleRegister() {
    // ensure form is filled in completely
    if (!username || !password) {
      return alert("Please fill out the form");
    }
    //make fetch call to the server to register a new user
    fetch("http://localhost:8080/users/create-user", {
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
        alert(`${data.message} -= Please Log In With new user details =-`);
      })
      .catch((err) => {
        alert(`Error Registering User: ${err}`);
      });
  }

  // track changes in input fields
  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername((prevState) => e.target.value);
    } else if (e.target.name === "password") {
      setPassword((prevState) => e.target.value);
    }
  }
  // handle submit function for the welcome form
  // used to prevent defualt behavior of the form
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="welcome">
      <h3>Welcome to enlisted</h3>
      <form className="signInForm" onSubmit={handleSubmit}>
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
