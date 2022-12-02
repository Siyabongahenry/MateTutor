const express = require("express");

const role = require("../utils/role");

const authenticate = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const router = express.Router();

const courses_controller = require("../controllers/courses.controller");

router.get("/",courses_controller.listAll);
router.get("/details/:id",courses_controller.details);
router.post("/create",[authenticate,authorize(role.tutor,role.admin)],courses_controller.create);
router.post("/update",[authenticate,authorize(role.tutor,role.admin)],courses_controller.update);
router.post("/remove",[authenticate,authorize(role.tutor,role.admin)],courses_controller.remove);
router.post("/verify",[authenticate,authorize(role.admin)],courses_controller.verifyCourse);

module.exports = router;