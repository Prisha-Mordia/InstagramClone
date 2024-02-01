const Post = require('../models/postModel');
const User = require("../models/userModel");
const fs = require('fs');

// Create Profile
const userProfile = async (req, res) => {
  // find user
  let username = req.params.username;
  if (!username) {
    // Still have to fix this!
    username = res.locals.users;
  }
  const user = await User.findOne({ username: username });
  const posts = await Post.find({author: user._id});

  if (user) {
    return res.render("profile", { user, currentUser: req.user, posts });
  } else {
    res.redirect("/404");
  }
};

// Edit Profile
const updateProfile = async (req, res) => {
  let id = req.body.id;

  if (req.file) {
    await User.findOne({ _id: id }).then((oldRecord) => {
      if (!(oldRecord.pfp.includes('vecteezy'))) {
        fs.unlinkSync(oldRecord.pfp.substr(1));
      }
    }).catch((err) => {
      console.error(err);
      return false;
    });

    await User.findOneAndUpdate({_id: id}, {
      name: req.body.name,
      // username: req.body.username,
      bio: req.body.bio,
      pfp: "/" + req.file.path
    }).then((success) => {
      console.log("Successfully Updated");
      return res.redirect("/profile/" + req.body.username);
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
  } else {
    let oldRecord = await User.findOne({ _id: id });
    await User.findOneAndUpdate({_id: id}, {
      name: req.body.name,
      // username: req.body.username,
      bio: req.body.bio,
      pfp: oldRecord.pfp || 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
    }).then((success) => {
        console.log("Successfully Updated");
        return res.redirect("/profile/" + req.body.username);
      }).catch((err) => {
        console.error(err);
        return false;
      });
  }
}


module.exports = {
  userProfile,
  updateProfile
};




























