const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique: true
    },
    pfp : {
     type : String,
     default: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
    },
    bio : {
    type : String,
    },
})

const User = mongoose.model('User',userSchema);
module.exports = User;