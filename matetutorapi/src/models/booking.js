const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
    {
        courseName:String,
        tuteeId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        tutorId:{
            type:Schema.Types.ObjectId,
            ref:"Tutor",
            required:true
        },
        date:Date,
        bookedDate:Date,
        startTime:String,
        duration:Number,
        totalCost:Number,
        address:{
            type:String,
            enum:["Microsoft teams","Zoom","Google Meetings","Other"]
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
        ratings:{
            type:Number,
            default:0
        }
    }
);
module.exports = mongoose.model("Booking",BookingSchema,"Bookings");