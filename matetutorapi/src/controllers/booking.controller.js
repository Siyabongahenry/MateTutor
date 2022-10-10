const Booking = require("../models/booking");

const bookings=(req,res)=>{

}
const create = (req,res)=>{

      const {courseId,bookedDate,startTime,duration,address,focusTopics} = req.body;

      const user = user.id;

      const booking = new Booking({
            courseId,
            startTime,
            duration,
            address,
            focusTopics
      });
      
}

const update = (req,res)=>{
      
}

const remove = (req,res)=>{
      
}


