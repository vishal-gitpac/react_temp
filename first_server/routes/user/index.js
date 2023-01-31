const express = require("express");
const router = express.Router();
const verify = require("./verifyjwttoken");

const userController = require("./user.controller");
//using exported function from user.controller.js
router.post("/", userController.create);
router.post("/login", userController.login);
router.post("/todos/save", verify, userController.save);
router.get("/todos/get", verify, userController.get);
router.get("/logout", userController.logout);
router.get("/auth/:token", verify, userController.auth);
router.get("/user", userController.getById);

module.exports = router;
