const express = require('express');
const router = express.Router();
const Post = require('../models/Post')



router.post('/', async function(request,response){
    console.log("Post Added");
    const post = new Post({
        type: request.body.type,
        byUser: request.body.byUser,
    });
    try{
    const savedPost = await post.save();
    response.json(savedPost);
    }
    catch(err){
        response.json({message: err})
    }
})

// GET ALL POSTS
router.get('/',async function(request,response){
    try{
    const posts = await Post.find();
    response.json(posts);
    console.log("Got Posts")
    }
    catch(err){
        response.json({message: err})
    }
})

// GET SPECIFIC POSTS
router.get('/:postID',async function(request,response){
    try{
    const post = await Post.findById(request.params.postID);
    response.json(post);
    console.log("Got Post " + request.params.postID)
    }
    catch(err){
        response.json({message: err})
    }
})

router.delete('/:postID', async function(request,response){
    try{
        const removedPost = await Post.remove({_id: request.params.postID});
        response.json(removedPost);
        console.log("Post Deleted");
    }
    catch(err){
        response.json({message: err})
    }
})

router.patch('/:postID', async function(request,response){
    try{
        const updatedPost = await User.updateOne({_id: request.params.postID},
            {$set: {
                type: request.body.type,
                byUser: request.body.byUser,
            }});
        response.json(updatedPost);
        console.log("Post Updated");
    }
    catch(err){
        response.json({message: err})
    }
})

module.exports = router;