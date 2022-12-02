const express = require("express");

const authenticate = require("../middlewares/authentication.middleware");

const router = express.Router();

const bookingsmanager_controller = require("../controllers/bookingmanager");

router.get("/bookings",authenticate,bookingsmanager_controller.getBookings);

module.exports = router;