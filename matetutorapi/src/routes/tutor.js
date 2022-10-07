
const express = require("express");

const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

const tutor_controller = require("../controllers/tutor.controller");

router.post("/register",checkAuth,tutor_controller.register);
router.post("/bank",checkAuth,tutor_controller.updateBankDetails);
router.post("/schedule",checkAuth,tutor_controller.updateSchedule);
router.get("/account",checkAuth,tutor_controller.getCurrentTutor);
router.get("/courses",checkAuth,tutor_controller.getCourses);

module.exports = router;