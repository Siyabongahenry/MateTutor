const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authentication.middleware");

const authorize = require("../middlewares/authorization.middleware");

const notes_controller = require("../controllers/notes.controller");

//get a note by id
router.get("/:id",notes_controller.getNotes)

//for creating new note
router.post("/updateorcreate",[authenticate,authorize("tutor")],notes_controller.updateOrCreate);

//adding image to a specific note
router.post("/upload-image",[authenticate,authorize("tutor")],notes_controller.imageUpload);

module.exports = router;