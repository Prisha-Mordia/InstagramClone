const mongoose = require('mongoose');
const User = require('./userModel');

const postSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    image :{
        type : String,
        required : true
    },
    caption :{
        type : String,
    },
    likes:  [{
        liker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;