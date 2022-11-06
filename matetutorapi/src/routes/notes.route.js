const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth.middleware");

const notes_controller = require("../controllers/notes.controller");

router.get("/:id",checkAuth,notes_controller.getNotes)

router.post("/create",checkAuth,notes_controller.create);

module.exports = router;