const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require('../models/User')



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
    response.json(savedUser);
    }
    catch(err){
        response.json({message: err})
    }
})

// GET ALL USERS
router.get('/',async function(request,response){
    try{
    const users = await User.find();
    response.json(users);
    console.log("Got Users")
    }
    catch(err){
        response.json({message: err})
    }
})

// GET SPECIFIC USERS
router.get('/:userID',async function(request,response){
    try{
    const user = await User.findById(request.params.userID);
    response.json(user);
    console.log("Got User " + request.params.userID)
    }
    catch(err){
        response.json({message: err})
    }
})

router.delete('/:userID', async function(request,response){
    try{
        const removedUser = await User.remove({_id: request.params.userID});
        response.json(removedUser);
        console.log("User Deleted");
    }
    catch(err){
        response.json({message: err})
    }
})

router.patch('/:userID', async function(request,response){
    try{
        const updatedUser = await User.updateOne({_id: request.params.userID},
            {$set: {username: request.body.username,
                password: request.body.password,
                email: request.body.email
            }});
        response.json(updatedUser);
        console.log("User Updated");
    }
    catch(err){
        response.json({message: err})
    }
})

module.exports = router;