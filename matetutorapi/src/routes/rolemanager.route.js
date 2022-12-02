const express = require("express");

const role = require("../utils/role");

const authenticate = require("../middlewares/authentication.middleware");

const authorize = require("../middlewares/authorization.middleware");

const router = express.Router();

const rolemanager_controller = require("../controllers/rolemanager.controller");

router.get("/users",[authenticate,authorize(role.superadmin,role.admin)],rolemanager_controller.getUsers);

router.post("/delete_from_role",[authenticate,authorize(role.superadmin,role.admin)],rolemanager_controller.deleteRoleFromUser);

router.post("/enrol",[authenticate,authorize(role.superadmin,role.admin)],rolemanager_controller.addRoleToUser);


module.exports = router;