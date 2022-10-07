const User = require("../models/user");
const Tutor = require("../models/tutor");
const Course = require("../models/course");
const Booking = require("../models/booking");
const { findOne } = require("../models/user");

exports.register = async (req,res) =>{
    const user = req.user;
    
    const  tutorExist = await Tutor.findOne({tutorId:user.id});

    if(tutorExist) return res.sendStatus(409);

    const {profileImage,description,bankDetails} = req.body;

    if(!(profileImage && bankDetails && description)) res.sendStatus(400);

    const tutor = new Tutor({
        user:user.id,
        profileImage,
        description,
        bankDetails
    });

    tutor.save((error)=>{
       if(error)
       {
        console.log(error);
       }
       else
       {
        console.log("The tutor has beed added successfuly.");
       }
    });

    res.send({tutor});
}
exports.updateBankDetails=async (req,res)=>{

    const{bankName,accountNumber,branchCode} = req.body;

    if(!(bankName || accountNumber)) res.sendStatus(401);

    const user = req.user;
    
    const bankDetails = {bankName,accountNumber,branchCode};

    try
    {
        const tutor = await Tutor.findOneAndUpdate({userId:user.id},{bankDetails});
        res.sendStatus(201);
    }
    catch(error)
    {
        res.sendStatus(500);
    }

    
}

exports.updateSchedule = async (req,res)=>{
    const reqDaySchedule = req.body;

    if(!reqDaySchedule) res.sendStatus(400);

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
    
        const findCourses = await Course.find({tutor:user.id});

        if(!findCourses) res.sendStatus(404);

        res.status(200).send(findCourses);
    }
    catch(error)
    {
        res.sendStatus(500);
    }
}