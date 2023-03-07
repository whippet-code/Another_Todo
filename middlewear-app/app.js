var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// set port unless already set via environment variable
let PORT = 8080 || process.env.PORT;

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
