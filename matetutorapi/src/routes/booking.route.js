const express = require("express");

const role = require("../utils/role");

const authenticate = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const router = express.Router();

const booking_controller = require("../controllers/booking.controller");

router.get("/",[authenticate,authorize(role.admin,role.tutor)],booking_controller.getTuteeBookings);
router.post("/create",[authenticate,authorize(role.admin,role.tutor)],booking_controller.create);
router.post("/remove",[authenticate,authorize(role.admin,role.tutor)],booking_controller.remove);

module.exports = router;