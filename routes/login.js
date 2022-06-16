const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require('../models/User')



router.post("/", async (request,response)=>{
    try{
    const user = await User.findOne({username: request.body.username})
    if (user === null){
        response.status(404).send("Can't find User");
    }
    if (await bcrypt.compare(request.body.password,user.password)){
        response.send("Sucess")
        console.log("Login Sucessfull")
    }
    else{
        response.send("Failiure")
    }
    }
    catch(err){
        response.json({message: err})
    }
})

module.exports = router;