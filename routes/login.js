require('dotenv/config')

const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require('../models/user-data/User')
const jwt = require('jsonwebtoken')
const refreshTokens = require("../models/refreshTokens")


router.post("/", async (request,response)=>{
    try{
    const user = await User.findOne({username: request.body.username})
    if (user === null){
        response.status(404).send("Can't find User");
    }
    if (await bcrypt.compare(request.body.password,user.password)){
        const accessToken = jwt.sign({_id: user._id}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "30m"});
        const refreshToken = jwt.sign(user, 
            process.env.REFRESH_TOKEN_SECRET);
        const newRefreshToken = new refreshTokens({token: refreshToken});
        response.status(200).json({accessToken: accessToken,
            refreshToken: refreshToken})
        console.log("Login Sucessfull")
    }
    else{
        response.send("Failiure")
    }
    }
    catch(err){
        response.json({message: err})
    }
});

router.post("/token", (request,response)=>{
    const refreshToken = request.body.token
    if (refreshToken == null) return response.sendStatus(401)
    const token = refreshTokens.findOne({token: refreshToken})
    if (!token) return response.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if (err) response.sendStatus(403)
        const accessToken = jwt.sign({_id: user._id}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "30m"});
            response.json({accessToken: accessToken})  
    });
    
});


module.exports = router;