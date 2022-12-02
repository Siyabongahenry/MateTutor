const User = require("../models/user");

exports.users = async (req,res)=>{
    const {skip,email,role} = req.query;

    let filter = role?{roles:role}:{};
    //prioritize searching by email
    filter = email?{email}:filter;
    
    const users = await User.find(filter)
    .select("firstName lastName email blocked")
    .skip(skip)
    .limit(20);

    if(users) return res.status(200).send(users);

    return res.status.send([]);
}
//blocking or unblocking the user
exports.blockUser = async(req,res)=>{

    const{userId:_id,reason,status} = req.body;

    if(!_id) return res.status(400).send({error:"Invalid inputs detected."});

    try
    {

        const blocked = {
            status,
            reason,
            date:new Date()
        }

        const user = await User.findOneAndUpdate({_id},
            {
                blocked
            }

        );
        

        if(!user) return res.status(406).send({error:"The user doesn't seem to exist.."});


        return res.status(200).send(blocked);
    }
    catch
    {
        return res.status(500).send({error:"Something went wrong in our server please contact admin or try again later."});
    }
}

