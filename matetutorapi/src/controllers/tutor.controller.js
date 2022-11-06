const User = require("../models/user");
const Tutor = require("../models/tutor");
const Course = require("../models/course");
const role = require("../utils/role");

exports.register = async (req,res) =>{

    console.log(req.file);
   

    const user = req.user;
    
    const  tutorExist = await Tutor.exists({tutorId:user.id});

    if(tutorExist) return res.sendStatus(409);

    const {description,bankName, accountNumber,branchCode} = req.body;

    const profileImg = req.file.filename;

    if(!(description && bankName &&  accountNumber && profileImg)) res.sendStatus(400);

    const tutor = new Tutor({
        user:user.id,
        profileImg,
        description,
        bankName,
        accountNumber,
        branchCode
    });

    tutor.save((error)=>{
       if(error)
       {
            res.sendStatus(500);
       }
       else
       {
            //grant user a tutor role
            User.updateOne({_id:user.id},{$push:{roles:role.tutor }},(error,success)=>{
                if(error)
                {
                    console.log("error")
                }
                else
                {
                    console.log("success");
                }

            });

             res.status(201).send({role:"tutor"});
       }
    });

}
exports.updateBankDetails=async (req,res)=>{

    const{bankName,accountNumber,branchCode} = req.body;

    if(!(bankName || accountNumber)) res.sendStatus(401);

    const user = req.user;
    
    const bankDetails = {bankName,accountNumber,branchCode};

    try
    {
        //grant user a tutor role
        const tutor = await Tutor.findOneAndUpdate({userId:user.id},{bankDetails});

        if(tutor === null) throw "Not found";

        res.sendStatus(201);
    }
    catch(error)
    {
        res.sendStatus(500);
    }

    
}

exports.updateSchedule = async (req,res)=>{
    const reqDaySchedule = req.body;

    if(!reqDaySchedule) return res.sendStatus(400);

    const user = req.user;
    
    try
    {
        //find the tutor with the user id and the requested day
        const tutor = await Tutor.findOne({userId:user.id,"schedule.day":reqDaySchedule.day});

        //updating the schedule for the requested day if tutor exist and day exist
        if(tutor)
        {

            tutor.schedule.map(
                (daySchedule)=>{
                    //find the day that match the requested day
                    if(daySchedule.day === reqDaySchedule.day)
                    {
                        daySchedule.available = reqDaySchedule.available;
                        //update tutoring time
                        daySchedule.tutoringTime = reqDaySchedule.tutoringTime;
                        return daySchedule;
                    }
                }
            );

            tutor.save((error)=>{
                if(error)
                {
                    res.sendStatus(403)
                }
                else
                {
                    res.sendStatus(200);
                }
            });
        }
        else
        {
            //push the day schedule if the day does not exist in the database
        
            await Tutor.updateOne({userId:user.id},{$push:{schedule:reqDaySchedule}});  

            res.sendStatus(200); 
        
        }
    }
    catch(error)
    {
        res.sendStatus(500);
    }
}

exports.getCurrentTutor = async (req,res)=>{
    const user = req.user;
    try
    {

        const tutor = await Tutor.findOne({userId:user.Id}).populate("user");


        if(tutor)
        {
            res.status(200).send(tutor);
        }
        else
        {
            res.sendStatus(403);
        }
         
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }

    
}


exports.getCourses =async (req,res)=>{
    const user = req.user;
    
    try
    {
    
        const findCourses = await Course
        .find({tutor:user.id})
        .select("name moduleCode ratingsPerHour");

        if(!findCourses) return res.sendStatus(404);
        res.status(200).send(findCourses);
    }
    catch(error)
    {
        res.sendStatus(500);
    }
}

exports.getCourseById = async (req,res)=>{
    

    
    try{
        const _id = req.params.id;

        if(!_id) res.sendStatus(400);

        const course = await Course.findOne({_id});

        if(!course) return res.sendStatus(404);

        res.status(200).send(course);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }

}