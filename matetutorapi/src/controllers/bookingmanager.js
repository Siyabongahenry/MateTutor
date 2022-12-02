const Booking = require("../models/booking");

exports.getBookings = async (req,res)=>{

    const{skip} = req.params;
    
    try
    {
        const bookings = await Booking.find({})
        .skip(skip)
        .limit(20);

        if(bookings) return res.status(200).send(bookings);
        
        return res.sendStatus(406);
    }
    catch
    {
        return res.sendStatus(500);
    }
    
}
