const Booking = require("../models/booking");

exports.create = async (req,res)=>{

      const{courseId,bookedDate,startTime,duration,location,focusTopics,ratingsPerHour} = req.body;

      if(!(courseId && bookedDate && startTime && duration && location && focusTopics)) return res.sendStatus(400);

      const bookingExist = await Booking.exists({bookedDate,startTime});

      if(bookingExist) return res.sendStatus(409);

      const user = req.user;

      const newBooking = new Booking({
            tutee:user.id,
            course:courseId,
            bookedDate,
            startTime,
            totalCost:duration*ratingsPerHour,
            duration,
            focusTopics,
            location
      });
      
      newBooking.save((error)=>{
            if(error)
            {
                  console.log(error);
                  res.sendStatus(500);
            }
            else
            {
                  res.sendStatus(201);
            }
      });
      
}

exports.getTuteeBookings = async (req,res)=>{
      
      const userId = req.user.id;
      
      try
      {
            const bookings =await Booking.find({tutee:userId})
                        .populate({
                              path:"course",
                              select:["name","ratingsPerHour"]
                        });


            if(bookings) return res.status(200).send(bookings);

             return res.sendStatus(404);
      }
      catch(error){
            console.log(error);

            return res.sendStatus(500);
      }
}

exports.remove = (req,res)=>{
      
}
