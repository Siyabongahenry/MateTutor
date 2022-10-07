const express = require("express");

const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

const users_controller = require("../controllers/users.controller");

router.post("/register",users_controller.register_user);

router.post("/login",users_controller.login_user);

module.exports = router;