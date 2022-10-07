const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
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
    publicNotes:[String],
    privateNotes:[String],
    tutor:{
        type:Schema.Types.ObjectId,
        ref:"Tutor",
        required:true
    }

});

module.exports = mongoose.model("Course",CourseSchema,"Courses");