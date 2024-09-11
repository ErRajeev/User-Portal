const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const userController = require("../controller/userController");

router.post("/", userController.addUser);

router.get("/", userController.getAllUser);

router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUser);

router.patch("/:id", userController.updateUser);

module.exports = router;
