const Notes = require("../models/notes");
const Course = require("../models/course");
const { updateOne } = require("../models/course");

exports.getNotes = async (req,res)=>{

    const courseId = req.params.id;

    if(!courseId) return res.sendStatus(500);

    const notes = await Notes.find({courseId});

    res.status(200).send(notes);
}

exports.updateOrCreate = async (req,res)=>{
    const{noteId,courseId,courseName,header,description,youtubeLinks,googleDriveLinks} = req.body;

    if(!(noteId || courseId)) return res.sendStatus(400);
    
    if(!(header && description)) return res.sendStatus(400);

    let noteObj = {
        header,
        description,
        youtubeLinks,
        googleDriveLinks
    };

    if(noteId)
    {
        
        await Notes.updateOne({_id:noteId},noteObj);

        return res.sendStatus(200);
    }
   
    //to create new note the course ID and Name is needed
    noteObj ={courseId,courseName,...noteObj}

    await create(noteObj);
    
}

const create = async (noteObj)=>{

    const courseExist = await Notes.exists({_id:noteObj.courseId});

    if(!courseExist) return res.status(406).send({error:"The specified course was not found in our database."});

    const note = new Notes(noteObj);

    note.save((error,result)=>{
        if(error) return res.sendStatus(500);
        return res.status(201).send(result);
    });
}

//uploading image name to a specific notes array of images
exports.imageUpload = async (req,res)=>{

    const{noteId} = req.body;
    const imgFileName = req.fileName;;

    if(!(noteId && imgFileName)) return res.sendStatus(400);

    const noteExist = await Notes.exists({_id:noteId});

    if(!noteExist) return res.sendStatus(406);

    await Notes.updateOne({_id:noteId},{$push:{imgFiles:imgFileName}});

    return res.sendStatus(200);
}

//delete image from file system and name from a specific note array of images

const delImage = async ()=>{

}

