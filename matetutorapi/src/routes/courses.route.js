const express = require("express");

const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

const courses_controller = require("../controllers/courses.controller");

router.get("/",courses_controller.listAll);
router.get("/details/:id",courses_controller.details);
router.post("/create",checkAuth,courses_controller.create);
router.post("/update",checkAuth,courses_controller.update);
router.post("/remove",checkAuth,courses_controller.remove);


module.exports = router;