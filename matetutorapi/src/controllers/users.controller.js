const User = require("../models/user");
const Course = require("../models/course");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register_user = async (req,res)=>{
    
    const {firstName,lastName,cellNo,email,password} = req.body;

    if(!(firstName && lastName && cellNo && email && password))
    {
        res.sendStatus(400);
    }

    const userExist =await User.findOne({email});

    if(userExist) return res.sendStatus(409);

    const encryptedPassword = await bcrypt.hash(password,10);

    const new_user = new User({
        firstName:firstName,
        lastName:lastName,
        cellNo:cellNo,
        email:email.toLowerCase(),
        password:encryptedPassword
    });
    
    new_user.save((error)=>{
        if(error){
            res.sendStatus(500);
        } 
        else
        {
            res.sendStatus(201);
        }
    });    

}

exports.login_user = async (req,res)=>{
   
    const{email,password} = req.body;

    if(!(email && password)) return res.status(400).send({error:"Invalid inputs"});
    try
    {
        const user = await User.findOne({email});

        if(!(user && (await bcrypt.compare(password,user.password)) )) return res.status(400).send({error:"User not registered"});
            
        const token = jwt.sign({id:user._id,email:user.email},process.env.TOKEN_KEY,{expiresIn:"2h"});

        res.status(200).send({token});
    }
    catch(error)
    {
        res.sendStatus(500);
    }
}

