const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register new user
exports.register_user = async (req,res)=>{
    
    const {firstName,lastName,cellNo,email,password} = req.body;

    if(!(firstName && lastName && cellNo && email && password))
    {
        res.sendStatus(400);
    }

    //check if user exist
    const userExist =await User.exists({email});

    //return coonflict status
    if(userExist) return res.sendStatus(409);

    //encrypt user password for security 
    const encryptedPassword = await bcrypt.hash(password,10);

    //create new user object
    const new_user = new User({
        firstName:firstName,
        lastName:lastName,
        cellNo:cellNo,
        email:email.toLowerCase(),
        password:encryptedPassword,
        roles:["user"]
    });
    
    //save user to mongodb and use callback for erros
    new_user.save((error)=>{
        if(error){
            res.sendStatus(500);
        } 
        else
        {
            //user successfully created
            res.sendStatus(201);
        }
    });    

}

//user login for authentication
exports.login_user = async (req,res)=>{
   
    const{email,password} = req.body;

    if(!(email && password)) return res.status(400).send({error:"Invalid inputs"});
    try
    {
        //find user by email
        const user = await User.findOne({email});

        if(!(user && (await bcrypt.compare(password,user.password)) )) return res.status(400).send({error:"User not registered"});
        
        //create a new token for the user
        const token = jwt.sign({id:user._id,
            fullNames:user.firstName+" "+user.lastName
            ,email:user.email,roles:user.roles
        },process.env.TOKEN_KEY,{expiresIn:"12h"});


        res.status(200).send({email:user.email,token,roles:user.roles});
    }
    catch(error)
    {
        res.sendStatus(500);
    }
}

//get current login user
exports.getUser = async (req,res)=>{
    try
    {

        const userId = req.user.id;

        //find current user but exclude password for security
        const user = await User.findById(userId).select("-_id -password -__v");

        if(user)
        {
            res.status(200).send(user);
        }
        else
        {
            res.sendStatus(404);
        }
    }
    catch
    {
        res.sendStatus(500);
    }

}


