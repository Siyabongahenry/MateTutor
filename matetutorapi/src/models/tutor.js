const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        required:true
    },
    bankDetails:{
        bankName:{
            type:String,
            required:true
        },
        accountNumber:{
            type:Number,
            required:true
        },
        branchCode:Number
    },

    schedule:[
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
            tutoringTime:[]
        }
    ],
    description:{
        type:String,
        minLenth:20,
        maxLength:200,
        required:true
    }
});

module.exports = mongoose.model("Tutor",TutorSchema,"Tutors");