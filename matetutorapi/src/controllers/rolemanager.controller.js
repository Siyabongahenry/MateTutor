const User = require("../models/user");

exports.getUsers = async (req,res)=>{

    const {skip,email,role} = req.query;

    let filter = role?{roles:role}:{};
    //prioritize searching by email
    filter = email?{email}:filter;

    const users = await User.find(filter)
    .select("firstName lastName email roles")
    .skip(skip)
    .limit(20);

    if(users) return res.status(200).send(users);

    return res.status.send([]);
}

exports.deleteRoleFromUser = async (req,res)=>{

    const{userId,role} = req.body;

    if(!(userId && role)) return res.sendStatus(400);

    const user = await User.findOneAndUpdate({_id:userId},{$pull:{roles:role}});

    if(!user) return res.sendStatus(406);

    return res.sendStatus(200);
}

exports.addRoleToUser = async (req,res)=>{
    const{email,role} = req.body;

    if(!(email && role)) return res.sendStatus(400);

    const userExist =await User.exists({email,roles:role});

    if(userExist) return res.sendStatus(409);

    const user = await User.findOneAndUpdate({email},{$push:{roles:role}});

    if(!user) return res.sendStatus(406);

    return res.sendStatus(200);
}