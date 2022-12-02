const express = require("express");

const authenticate = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const router = express.Router();

const users_controller = require("../controllers/users.controller");

router.post("/register",users_controller.register_user);

router.post("/login",users_controller.login_user);

router.get("/account",authenticate,users_controller.getUser);


module.exports = router;