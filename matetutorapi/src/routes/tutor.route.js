
const express = require("express");

const multer = require("multer");


//authorize user
const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

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

router.post("/register",[checkAuth,upload.single("profileImg")],tutor_controller.register);
router.post("/bank",checkAuth,tutor_controller.updateBankDetails);
router.post("/schedule",checkAuth,tutor_controller.updateSchedule);
router.get("/account",checkAuth,tutor_controller.getCurrentTutor);
router.get("/courses",checkAuth,tutor_controller.getCourses);

module.exports = router;