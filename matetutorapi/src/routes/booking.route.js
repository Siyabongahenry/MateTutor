const express = require("express");

const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

const booking_controller = require("../models/booking");

router.get("/bookings",checkAuth,booking_controller.bookings);
router.post("/create",checkAuth,booking_controller.create);
router.post("/remove",checkAuth,booking_controller.remove);