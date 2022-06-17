const express = require('express');
const router = express.Router();
const Post = require('../models/post-data/Post')



router.post('/', async function(request,response){
    console.log("Post Added");
    const post = new Post({
        type: request.body.type,
        byUser: request.body.byUser,
    });
    try{
    const savedPost = await post.save();
    response.status(201).json(savedPost);
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

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
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

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
})

module.exports = router;