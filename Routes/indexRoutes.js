const express = require("express");
const multer = require("multer");
const authcontroller = require("../controller/AuthController");
const admincontroller = require("../controller/AdminController");
const profileController = require("../controller/profileController");
const postController = require("../controller/postController");

// const storage = multer.memoryStorage();
// const fileUpload = multer({ storage: storage }).single("image");

const routes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    let img = Date.now() + "-" + file.originalname;
    cb(null, img);
  },
});

const fileUpload = multer({ storage: storage }).single("image");


const passport = require("passport");
routes.get("/404", (req, res) => res.render("404"));
// routes.get("/", passport.checkUser, (req, res) => {res.render("index", { user: req.user });});
routes.get("/", passport.checkUser, authcontroller.index);
routes.get("/profile/:username?", passport.checkUser, profileController.userProfile);
routes.post("/profile",passport.checkUser, fileUpload, profileController.updateProfile);

routes.get("/login", authcontroller.login);
routes.get("/signup", authcontroller.signup);
routes.post("/signupUser", authcontroller.signupUser);
routes.post("/loginUser",passport.authenticate("local", { failureRedirect: "/login" }),authcontroller.loginUser);
routes.get("/logout", authcontroller.logout);

routes.post("/post", passport.checkUser, fileUpload, postController.addPost);
routes.get("/deletepost/:id", passport.checkUser, postController.deletePost);
routes.get("/admin", passport.checkUser, admincontroller.admin);

module.exports = routes;
