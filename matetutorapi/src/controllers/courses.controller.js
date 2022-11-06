const Course = require("../models/course");
const User = require("../models/user");
const Tutor = require("../models/tutor");

//get all courses
exports.listAll = async (req,res)=>{
    try{

        const query = req.query;

        const searchReg = new RegExp(query.search,"i");

        //if search string is not null, find courses that matches the string
        const courses = await Course.find(query.search?{
            name:{$regex:searchReg}
        }:{})
        .select("_id name ratingsPerHour")
        .skip(parseInt(query.skip))
        .limit(6);

        res.status(200).send(courses);
    }
    catch(error)
    {
        res.sendStatus(500);
    }

}
exports.details = async (req,res)=>{
    const id = req.params.id;

    if(!id) res.sendStatus(400);

    const course = await Course.findOne({_id:id});

    const tutor = await Tutor
    .findOne({user:course.tutor.toString()})
    .select("-bankDetails -_id")
    .populate({
        path:"user",
        select:["firstName","lastName","email"]
    });

    res.status(200).send({course,tutor});
}

exports.create = async (req,res)=>{
    
    const{name, ratingsPerHour,moduleCode} = req.body;

    if(!(name && ratingsPerHour)) return res.status(400).send({error:"All fields marked with a * are required."});
    
    const exist = await Course.findOne({name});

    if(exist) return res.sendStatus(409);

    const user = req.user;

    const course = new Course({
        name,
        tutoredBy:user.fullNames,
        ratingsPerHour,
        moduleCode,
        tutor:user.id
    });

    course.save((error,result)=>{
        if(error)
        {
             res.sendStatus(500);
        }
        else{  
            res.status(201).send(result);
        }  
    });
}

exports.update = async (req,res)=>{

    const{_id,name, ratingsPerHour,moduleCode} = req.body;

    const courseExist = await Course.findOne({_id});

    if(!courseExist) return res.sendStatus(404);

    courseExist.name = name;
    courseExist.ratingsPerHour = ratingsPerHour;
    courseExist.moduleCode = moduleCode;

    courseExist.save((error,course)=>{
        if(error) return res.sendStatus(500);
        res.status(200).send({course:courseExist});
    });
    
}

exports.remove= async (req,res)=>{
    const{_id} = req.body;

    if(_id) res.sendStatus(400);

    const courseExist = await Course.findOne({_id});

    if(!courseExist) res.sendStatus(404);

    await Course.deleteOne({_id});

    res.sendStatus(200);
}

exports.uploadNotes = async (req,res)=>{

    const{courseId,header,description,ytVideoLink,googleDriveLink} = req.body;

    if(!(courseId && header && description)) return res.sendStatus(400);

    const courseExist = await Course.exists({_id:courseId});

    if(!courseExist) return res.sendStatus(400);

    const imgFile = req.file.filename;

    const note ={
        header,
        description,
        ytVideoLink,
        googleDriveLink,
        imgFile
    }


    await Course.updateOne({_id:courseId},{$push:{notes:note}});
    
    res.sendStatus(204);
}