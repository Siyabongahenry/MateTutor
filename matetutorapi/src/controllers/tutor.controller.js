const User = require("../models/user");
const Tutor = require("../models/tutor");
const Course = require("../models/course");

const role = require("../utils/role");
//register a user as a tutor
exports.register = async (req,res) =>{

    const user = req.user;
    
    //check if the user exist as a tutor
    const  tutorExist = await Tutor.exists({tutorId:user.id});

    //throw conflict error
    if(tutorExist) return res.sendStatus(409);

    const {description,bankName, accountNumber,branchCode} = req.body;

    //get profile image name from the request
    const profileImg = req.file.filename;

    //check if required field exist
    if(!(description && bankName &&  accountNumber && profileImg)) res.sendStatus(400);

    //create a new tutor model
    const tutor = new Tutor({
        user:user.id,
        profileImg,
        description,
        bankName,
        accountNumber,
        branchCode
    });

    //save tutor and use callback to handle errors
    tutor.save((error)=>{
       if(error)
       {
            res.sendStatus(500);
       }
       else
       {
            //grant user a tutor role
            User.updateOne({_id:user.id},{$push:{roles:role.tutor }});

             res.status(201).send({role:"tutor"});
       }
    });

}

//update tutor banking details
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
    catch
    {
        res.sendStatus(500);
    } 
}
//update tutor description
exports.updateDescription = async (req,res)=>{

    const user = req.user;
    
    if(!user) return res.sendStatus(401);

    const{description} = req.body;

    if(!description) return res.sendStatus(400);

    try
    {
        await Tutor.updateOne({user:user.id},{description});

        return res.sendStatus(200);
    }
    catch
    {
        return res.sendStatus(500);
    }
    
}

//update tutor schedule
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
                if(error) return res.sendStatus(403);
               
                return res.sendStatus(200);
                
            });
        }
        else
        {
            //push the day schedule if the day does not exist in the database
        
            await Tutor.updateOne({userId:user.id},{$push:{schedule:reqDaySchedule}});  

            return res.sendStatus(200); 
        
        }
    }
    catch
    {
        return res.sendStatus(500);
    }
}

//get tutor
exports.getCurrentTutor = async (req,res)=>{
    const user = req.user;
    
    try
    {
       //find tutor using current login details
        const tutor = await Tutor.findOne({user:user.id}).populate("user");

        if(tutor) return res.status(200).send(tutor);
       
        return res.sendStatus(403);    
    }
    catch(error){
      
        return res.sendStatus(500);
    }
    
}

//get tutor by id for public appearance
exports.getTutorById = async (req,res)=>{

   const tutorId = req.params.id;

   if(!tutorId) return res.sendStatus(400);
 
   try
   {
       const tutor = await Tutor.findOne({user:tutorId})
                    .select("-bankDetails -_id")
                    .populate({
                        path:"user",
                        select:["firstName","lastName","cellNo","email"]
                    });


       if(tutor) return res.status(200).send(tutor);
      
        return res.sendStatus(403);
         
   }
   catch{
       return res.sendStatus(500);
   }
}
//get tutor schedule
exports.getSchedule =async (req,res)=>{
    const tutorId = req.params.id;

    if(!tutorId) return res.sendStatus(400);

    try
    {
        const tutor = await Tutor.findById(tutorId).select("schedule");
        
        res.status(200).send(tutor.schedule);
    }
    catch
    {
        res.sendStatus(500);
    }
}

//get tutor courses
exports.getCourses =async (req,res)=>{
    const user = req.user;

    try
    {
        const tutorId = await Tutor.exists({user:user.id});
    
        const findCourses = await Course
        .find({tutor:tutorId})
        .select("name moduleCode ratingsPerHour");

        if(!findCourses) return res.sendStatus(404);

        return res.status(200).send(findCourses);
    }
    catch(error)
    {
        return res.sendStatus(500);
    }
}

//get tutor course by id
exports.getCourseById = async (req,res)=>{
    
    try{
        const _id = req.params.id;

        if(!_id) res.sendStatus(400);

        const course = await Course.findOne({_id});

        if(!course) return res.sendStatus(404);

        return res.status(200).send(course);
    }
    catch{
        return res.sendStatus(500);
    }

}
