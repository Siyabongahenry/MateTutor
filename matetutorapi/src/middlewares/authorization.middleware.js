module.exports = (...roles)=>{

    return (req,res,next)=>{

        if(roles.length > 0 && roles.some(role=>req.user.roles.includes(role)))
        {
            return next();
        }

        return res.sendStatus(403);
    }
}