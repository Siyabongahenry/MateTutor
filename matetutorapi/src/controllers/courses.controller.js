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
//get course details
exports.details = async (req,res)=>{
    const id = req.params.id;

    if(!id) res.sendStatus(400);

    const course = await Course.findOne({_id:id});

    res.status(200).send(course);
}
//create new cpurse
exports.create = async (req,res)=>{
    
    const{name, ratingsPerHour,moduleCode} = req.body;

    if(!(name && ratingsPerHour)) return res.sendStatus(400);
    
    const exist = await Course.exists({name});

    if(exist) return res.sendStatus(409);
    const user = req.user;

    const tutorId = await Tutor.exists({user:user.id});

    //create course model
    const course = new Course({
        name,
        tutoredBy:user.fullNames,
        ratingsPerHour,
        moduleCode,
        tutor:tutorId
    });

    //save course to mongodb
    course.save((error,result)=>{
        if(error)
        {
             res.sendStatus(500);
        }
        else{  
            //course created
            res.status(201).send(result);
        }  
    });
}

//update course fields
exports.update = async (req,res)=>{

    const{_id,name, ratingsPerHour,moduleCode} = req.body;

    //check for the existence of the course
    const courseExist = await Course.findOne({_id});

    if(!courseExist) return res.sendStatus(404);

    //update fields
    courseExist.name = name;
    courseExist.ratingsPerHour = ratingsPerHour;
    courseExist.moduleCode = moduleCode;

    //save course
    courseExist.save((error,course)=>{
        if(error) return res.sendStatus(500);
        res.status(200).send({course:courseExist});
    });
    
}

//delete course
exports.remove= async (req,res)=>{
    const{_id} = req.body;

    if(!_id) res.sendStatus(400);

    //verify if course really exist
    const courseExist = await Course.findOne({_id});

    if(!courseExist) res.sendStatus(404);

    //delete course
    await Course.deleteOne({_id});

    res.sendStatus(200);

}
//verify course
exports.verifyCourse = async (req,res)=>{
    const{courseId} = req.body;
    try{
        if(!courseId) return res.sendStatus(400);

        const courseExist = await Course.exists({_id:courseId});

        if(!courseExist) return res.sendStatus(406);

        await Course.updateOne({_id:courseId},{verified:true});

        return res.sendStatus(200);
    }
    catch
    {
        return res.sendStatus(500);
    }
}