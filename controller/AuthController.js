const User = require("../models/userModel");

const login = (req, res) => {
  if (res.locals.users) {
    return res.redirect("/");
  }
  res.render("login", { user: null });
  // if (res.locals.users) {
  //   return res.redirect("/");
  // }
  // return res.render("login");
};

const signup = (req, res) => {
  if (res.locals.users) {
    return res.redirect("/");
  }
  return res.render("signup");
};

const signupUser = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    if (!name || !email || !password || !username) {
      console.log(`All field are required`);
      return res.redirect("back");
    }

    //record insert
    let user = await User.create({
      name: name,
      email: email,
      password: password,
      username: username,
    });
    if (user) {
      console.log(`user register`);
      return res.redirect("/login");
    } else {
      console.log(`user not register`);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const loginUser = (req, res) => {
  return res.redirect("/");
};

const index = async (req, res) => {
  const users = await User.find({});
  return res.render("index", { currentUser: req.user, users: users });
};

//logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("user not logout");
      return false;
    }
    return res.redirect("/login");
  });
};



const passport = require("passport");

// const loginUser = (req, res) => {
//   passport.authenticate("local", { failureRedirect: "/login" })(req, res, function () {
//     res.redirect("/profile/" + req.user.username);
//   });
// };


module.exports = {
  loginUser,
  login,
  signup,
  signupUser,
  loginUser,
  index,
  logout
};
