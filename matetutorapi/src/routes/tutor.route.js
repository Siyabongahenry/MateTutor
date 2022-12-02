
const express = require("express");

const multer = require("multer");
const router = express.Router();


//authorize user
const authenticate = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");


const tutor_controller = require("../controllers/tutor.controller");

//for creating unique file names
const {v4:uuidv4} = require("uuid");

const DIR = "./public/images/profiles";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,DIR)
    },
    filename:(req,file,cb)=>{
        const fileExtention = file.originalname.split(".").pop();
        cb(null,uuidv4()+"."+fileExtention);
    }
});

const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{

        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
        {
            cb(null,true);
        }
        else
        {
            cb(null,false);

            return cb(new Error("invalid image"));
        }
    }
});

router.post("/register",[authenticate,authorize("tutor"),upload.single("profileImg")],tutor_controller.register);

router.post("/bank",[authenticate,authorize("tutor")],tutor_controller.updateBankDetails);

router.get("/schedule/:id",tutor_controller.getSchedule);

router.post("/schedule",[authenticate,authorize("tutor")],tutor_controller.updateSchedule);
//update description
router.post("/upddescription",[authenticate,authorize("tutor")],tutor_controller.updateDescription);

router.get("/courses",[authenticate,authorize("tutor")],tutor_controller.getCourses);

router.get("/course/:id",[authenticate,authorize("tutor")],tutor_controller.getCourseById);

router.get("/",[authenticate,authorize("tutor")],tutor_controller.getCurrentTutor);

//get tutor by id
router.get("/:id",tutor_controller.getTutorById);

module.exports = router;