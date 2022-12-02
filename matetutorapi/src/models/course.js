const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    tutoredBy:String,
    ratingsPerHour:
    {
        type:Number,
        required:true
    },
    moduleCode:String,
    textBook:{
        type:String,
        default:"None"
    },

    tutor:{
        type:Schema.Types.ObjectId,
        ref:"Tutor",
        required:true
    },
    discount:Number,
    verified:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Course",CourseSchema,"Courses");