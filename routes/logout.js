require("dotenv/config")
    
const express = require("express")
//const app = express();
const router = express.Router()
//const jwt = require("jsonwebtoken");
const refreshTokens = require("../models/refreshTokens")

router.delete("/", async (request,respose)=>{
    const deletedRefreshToken = await refreshTokens.deleteOne({token: request.body.token})
    respose.sendStatus(204).json(deletedRefreshToken)
});

module.exports = router;