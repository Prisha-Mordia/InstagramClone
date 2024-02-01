const express = require("express");
const passport = require("passport");
// const fs = require('fs')
const session = require("express-session");

const db = require("./config/db");
const passportLocal = require("./config/passport-stratergy");
// const profileuser = require("../models/userModel");

const PORT = 3001;
const app = express();

app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "rnw",
    secret: "rnw4",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

// Routes
app.use("/", require("./Routes/indexRoutes"));
app.use('/uploads', express.static('uploads'));
app.use("/public", express.static("public"));



app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server is not started`);
    return false;
  }
  console.log(`Server is started on port: http://localhost:${PORT}`);
});
