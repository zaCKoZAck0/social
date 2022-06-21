const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require('../models/user-data/User')
const Friends = require('../models/user-data/Friends')


router.post('/', async function(request,response){
    console.log("User Added");
    try{
        //const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(request.body.password, 10)
        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashPassword,
        });
    const savedUser = await user.save();
    const friends = new Friends({
        user: savedUser._id, 
    })
    friends.save();
    response.status(201).json(savedUser);
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

// GET ALL USERS
router.get('/',async function(request,response){
    try{
    const users = await User.find();
    response.status(200).json(users);
    console.log("Got Users")
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

// GET SPECIFIC USERS
router.get('/:userID',async function(request,response){
    try{
    const user = await User.findById(request.params.userID);
    response.status(200).json(user);
    console.log("Got User " + request.params.userID)
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

router.delete('/:userID', async function(request,response){
    try{
        const removedUser = await User.remove({_id: request.params.userID});
        response.status(204).json(removedUser);
        console.log("User Deleted");
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

router.patch('/:userID', async function(request,response){
    try{
        const updatedUser = await User.updateOne({_id: request.params.userID},
            {$set: {username: request.body.username,
                password: request.body.password,
                email: request.body.email
            }});
        response.status(204).json(updatedUser);
        console.log("User Updated");
    }
    catch(err){
        response.status(500).json({message: err})
    }
})

module.exports = router;