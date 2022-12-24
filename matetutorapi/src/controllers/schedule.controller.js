const Schedule = require("../models/schedule");
const Tutor = require("../models/tutor");

exports.getSchedule = async (req,res)=>{
    
    const{id:tutorId} = req.params;

    if(!id) return res.status(400).send({error:"Id not found."});

    try
    {
        const schedule = await Schedule.findOne({tutorId}).select("week");

        if(!schedule) return res.status(404).send({error:"The user does not have a schedule."});

        return res.status(200).send(schedule);
    }
    catch
    {
        return res.status(500).send({error:"An unexpected error occurred on our server."});
    }

}
exports.update=async (req,res)=>{
    const reqDaySchedule = req.body;

    if(!reqDaySchedule) return res.sendStatus(400);

    const user = req.user;
    
    try
    {
        //find the tutor with the user id and the requested day
        const tutor = await Schedule.findOne({userId:user.id,"week.day":reqDaySchedule.day});

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