const Post = require('../models/postModel');
const fs = require('fs');

const addPost = async (req, res) => {
    try {
        let caption = req.body.caption;
        let author = req.user;

        let newPost = await Post.create({
            author: author,
            image: "/" + req.file.path,
            caption: caption
        });

        if (newPost) {
            console.log("New Post Created!");
            return res.redirect('/profile/' + author.username);
        } else {
            console.error("Could not create new post!");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

const deletePost = async (req, res) => {
    try {
        const postData = await Post.findOne({_id: req.params.id});
        fs.unlinkSync(postData.image.substr(1));

        await Post.deleteOne({ _id: req.params.id });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    addPost,
    deletePost
}