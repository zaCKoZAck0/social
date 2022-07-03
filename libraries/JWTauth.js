const jwt = require('jsonwebtoken')


function authenticateToken(request,response,next){
    const authHeader = request.cookie.accessToken;
    //const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return response.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return response.status(403)
        request.user = user
        next() 
    }) 
}

module.exports = authenticateToken;