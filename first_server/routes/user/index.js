const express = require("express");
const router = express.Router();
const verify = require("./verifyjwttoken");

const userController = require("./user.controller");
//using exported function from user.controller.js
router.post("/", userController.create);
router.get("/auth", verify, userController.auth);
router.get("/user", userController.getById);

module.exports = router;
