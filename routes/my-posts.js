const express = require('express');
const router = express.Router();
const authenticateToken = require("../libraries/JWTauth");
const Posts = require('../models/user-data/user-posts');

router.get("/", authenticateToken, async (request,response)=>{
    try{
        const posts = await Posts.findOne({user: request.user._id})
        if (posts == null){
            response.status(404).send("Can't Find User")
        }
        response.json({postList: posts.list})
    }catch{outer.post("/new-user", async (request,response)=>{
    
    });
            response.status(500);
    }

});

router.patch("/",authenticateToken, async (request,response)=>{
    try{
        const posts = await Posts.findOne({user: request.user._id})
        if (posts == null){
            response.status(404).send("Can't Find User")
        }
        let myPosts = posts.list
        myPosts.push(request.body._id)
        const updatedPosts = Posts.updateOne({user: request.user._id},{
          $set: {
            list: myPosts
          }  
        });
        response.status(201).send(updatedPosts);
    }catch{
        response.status(500);
    }
});

module.exports = router;