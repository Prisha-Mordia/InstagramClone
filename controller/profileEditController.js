const profileuser = require("../models/userModel");

const profile = (req, res) => {
  return res.render("profile");
};

// //file upload by multer
// const fileUpload = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// })
// const imageUpload = multer({ storage: fileUpload }).single('profilePicture');
// //file upload by multer end

// route , http request , url
app.get("/", (req, res) => {
  profileuser
    .find({})
    .then((record) => {
      return res.render("profile", { record });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.post("/editProfileForm", imageUpload, (req, res) => {
  let id = req.body.editid;
  if (req.file) {
    profileuser
      .findById(id)
      .then((oldRecord) => {
        fs.unlinkSync(oldRecord.profilePicture);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    profileuser
      .findByIdAndUpdate(id, {
        name: req.body.name,
        username: req.body.username,
        bio: req.body.bio,
        profilePicture: req.file.path,
      })
      .then((success) => {
        console.log("successfully edit");
        return res.redirect("/profile");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    profileuser
      .findById(id)
      .then((oldRecord) => {
        profileuser
          .findByIdAndUpdate(id, {
            name: req.body.name,
            username: req.body.username,
            bio: req.body.bio,
            profilePicture: oldRecord.profilePicture,
            // description: req.body.description
          })
          .then((success) => {
            console.log("successfully edit");
            return res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
});

app.post("/addRecord", imageUpload, (req, res) => {
  const { name, username, bio, profilePicture } = req.body;
  if (!name || !username || !bio || !profilePicture || !req.file) {
    console.log("All field are required");
    return res.redirect("back");
  }
  profileuser
    .create({
      name,
      username,
      bio,
      profilePicture: req.file.path,
    })
    .then((success) => {
      console.log("User successfully insert");
      return res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.get("/editprofile", (req, res) => {
  let id = req.query.id;
  profileuser
    .findById(id)
    .then((single) => {
      return res.render("profile", {
        single,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

module.exports = {
  profile,
};
