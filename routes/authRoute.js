const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const { login, logout, register } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
module.exports = router;
