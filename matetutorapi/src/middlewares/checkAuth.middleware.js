const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

    const token = req.headers.token;
            
    if(!token) res.sendStatus(401);

    jwt.verify(token,process.env.TOKEN_KEY,(error,user)=>{
        if(error) res.sendStatus(403);
        req.user = user;
        next();
    });
      
}
