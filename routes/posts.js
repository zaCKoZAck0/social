const express = require('express');
const router = express.Router();
const Post = require('../models/post-data/Post')
const Likes = require('../models/post-data/Likes')
const Comments = require('../models/post-data/Comment')
const authenticateToken = require("../libraries/JWTauth");


router.post('/', authenticateToken, async function(request,response){
    console.log("Post Added");
    const post = new Post({
        type: request.body.type,
        byUser: request.user._id,
    });
    try{
    const savedPost = await post.save();
    const likes = new Likes(
        {
            post: savedPost._id,
            by: [request.user._id]
        }
    );
    const newLikes = await likes.save();
    response.status(201).json([savedPost, newLikes]);
    }
    catch(err){
        response.status(500).json({message: err})
    }
});

// GET ALL POSTS
router.get('/',async function(request,response){
    try{
    const posts = await Post.find();
    response.status(200).json(posts);
    console.log("Got Posts")
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

// GET SPECIFIC POSTS
router.get('/:postID',async function(request,response){
    try{
    const post = await Post.findById(request.params.postID);
    response.status(200).json(post);
    console.log("Got Post " + request.params.postID)
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

router.delete('/:postID', async function(request,response){
    try{
        const removedPost = await Post.remove({_id: request.params.postID});
        response.status(204).json(removedPost);
        console.log("Post Deleted");
        Likes.remove({post: request.params.postID})
        Comments.deleteMany({post: request.params.postID})
    }
    catch(err){
        response.status(500).json({message: err})
    }
});

router.patch('/:postID', async function(request,response){
    try{
        const updatedPost = await User.updateOne({_id: request.params.postID},
            {$set: {
                type: request.body.type,
                byUser: request.body.byUser,
            }});
        response.status(204).json(updatedPost);
        console.log("Post Updated");
    }
    catch(err){
        response.status(500).json({message: err})
    }
});

router.get("/comments/:postID", async (request, response)=>{
    try{
        const comments = await Comments.find({post: request.params.postID});
        if(comments)
        response.status(200).send(comments);
        else
        response.status(404).send([])
    }
    catch{
        response.status(500);
    }
});

router.get("/likes/:postID", async (request, response)=>{
    try{
        const likes = await Likes.findOne({post: request.params.postID});
        if(likes)
        response.status(200).send(likes.by);
        else
        response.status(404).send([])
    }
    catch{
        response.status(500);
    }
});


module.exports = router;