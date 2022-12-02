const express = require("express");

const role = require("../utils/role");

const authenticate = require("../middlewares/authentication.middleware");
const authorize = require("../middlewares/authorization.middleware");

const router = express.Router();

const accountmanager_controller = require("../controllers/accountmanager.controller");


router.get("/users",[authenticate,authorize(role.superadmin,role.admin)],accountmanager_controller.users);

router.post("/block",[authenticate,authorize(role.superadmin,role.admin)],accountmanager_controller.blockUser);

module.exports = router;