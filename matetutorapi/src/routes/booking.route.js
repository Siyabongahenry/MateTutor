const express = require("express");

const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

const booking_controller = require("../controllers/booking.controller");

router.get("/",checkAuth,booking_controller.getTuteeBookings);
router.post("/create",checkAuth,booking_controller.create);
router.post("/remove",checkAuth,booking_controller.remove);

module.exports = router;