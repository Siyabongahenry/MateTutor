const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    courseName:{
        type:String
    },
    header:{
        type:String,
        maxLength:100
    },
    description:{
        type:String,
        maxLength:1000
    },
    youtubeLinks:[String],
    googleDriveLinks:[String],
    imgFiles:[String]
},
{
    timestamps:true
}
);


module.exports = mongoose.model("Notes",NotesSchema);