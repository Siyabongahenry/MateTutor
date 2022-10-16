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
    publicNoteFiles:[String],
    privateNoteFiles:[String],
    tutor:{
        type:Schema.Types.ObjectId,
        ref:"Tutor",
        required:true
    },
    discount:[Number]
});

module.exports = mongoose.model("Course",CourseSchema,"Courses");