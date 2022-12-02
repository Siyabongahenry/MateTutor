const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

    const token = req.headers.token;
            
    if(!token) return res.sendStatus(401);

    jwt.verify(token,process.env.TOKEN_KEY,(error,user)=>{
        if(error) 
        {
            return res.sendStatus(403);
        }
        else
        {
            req.user = user;
            return next();
        }

    });
      
}
