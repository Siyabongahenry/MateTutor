const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
     tutorId:{
        type:Schema.Types.ObjectId,
        ref:"tutor",
        required:true
     },
     week:[
        {
            day:{
                type:String,
                enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                unique:true,
                default:"saturday"
            },
            available:{
                type:Boolean,
                default:false
            },
            notAvailable:{
                type:Date,
                default:null
            },
            tutoringTime:[]
        }
    ],
});

module.exports = mongoose.model("Schedule",ScheduleSchema);