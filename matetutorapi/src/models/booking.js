const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
    {
        tutee:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        course:{
            type:Schema.Types.ObjectId,
            ref:"Course",
            required:true
        },
        bookedDate:Date,
        startTime:String,
        duration:Number,
        totalCost:Number,
        location:{
            type:String,
            enum:["Microsoft Teams","Zoom Call","Google Meetings","On Campus"]
        },
        focusTopics:[String],
        completed:{
            type:Boolean,
            default:false
        },
        paid:{
            type:Boolean,
            default:false
        },
        rating:[]
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Booking",BookingSchema,"Bookings");