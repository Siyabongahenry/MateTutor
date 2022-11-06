const Notes = require("../models/notes");
const Course = require("../models/course");

exports.getNotes = async (req,res)=>{

    const courseId = req.params.id;

    if(!courseId) return res.sendStatus(500);

    const notes = await Notes.find({courseId});

    res.status(200).send(notes);
}

exports.create = async (req,res)=>{
    const{courseId,header,description,ytVideoLinks,gDriveLinks} = req.body;

    
    if(!(header && description && courseId)) return res.sendStatus(400);

    const course = await Course.findById(courseId).select("name");

    if(!course) return res.sendStatus(400);

    const notes = new Notes({
        courseId:course.id,
        courseName:course.name,
        header,
        description,
        ytVideoLinks,
        gDriveLinks
    });

    notes.save((error,result)=>{
        console.log(error);
        if(error) return res.sendStatus(500);
        return res.status(201).send(result);
    });

}