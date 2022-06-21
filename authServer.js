require("dontenv").config()

const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const refreshTokens = require("./models/refreshTokens")

app.use(express.json());

app.delete("/logout", async (request,respose)=>{
    const deletedRefreshToken = await refreshTokens.deleteOne({token: request.body.token})
    respose.sendStatus(204).json(deletedRefreshToken) 

});

app.post("/token", (request,response)=>{
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

app.post("/login", (request,response)=>{
    const user = {_id: request.body._id}
    const accessToken = jwt.sign(user, 
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "30m"});
    const refreshToken = jwt.sign(user, 
        process.env.REFRESH_TOKEN_SECRET);
    const newRefreshToken = new refreshTokens({token: refreshToken});
    response.json({accessToken: accessToken,
    refreshToken: refreshToken});

});