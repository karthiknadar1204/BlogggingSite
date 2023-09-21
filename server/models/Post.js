const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    summary: String,
    cover: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;