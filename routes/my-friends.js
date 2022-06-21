const express = require('express');
const router = express.Router();
const authenticateToken = require("../libraries/JWTauth");
const Friends = require('../models/user-data/Friends');

router.get("/",authenticateToken, async (request,response)=>{
    try{
        const friends = await Friends.findOne({user: request.user._id})
        if (friends == null){
            response.status(404).send("Can't Find User")
        }
        response.json({friendList: friends.list})
    }catch{
            response.status(500);
    }

});

router.patch("/",authenticateToken, async (request,response)=>{
    try{
        const friends = await Friends.findOne({user: request.user._id})
        if (friends == null){
            response.status(404).send("Can't Find User")
        }
        let myFriends = friends.list
        myFriends.push(request.body._id)
        const updatedFriends = Friends.updateOne({user: request.user._id},{
          $set: {
            list: myFriends
          }  
        });
        response.status(201).send(updatedFriends);
    }catch{
        response.status(500);
    }
});

module.exports = router;