# Enlisted

## JWT Auth, multi user todo app

### Built using express.js, custom middlewear and React

### By Mark Ivkovic

#### Description

A fun take on the standard todo list. Themed around a squad of todo's where each todo is "enlisted".
This app utilises local file storage for the user and todo data, storged as JSON files.
Upon launch the app allows users to login or register as a new user.
Once logged in, users can view thir todos, add new todos and edit/delete existing todo notes (including mark as complete without deletion).

#### Set-up

#### Future updates

The backend will transition to mongoDB with mongoose working as the go between from the server.
User passwords will be hashed both before requests are sent and within the database file system using bcrypt
The api key for DB log in will be hidden/hashed, along with the secret key used in producing/verifying JWT signatures
