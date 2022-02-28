const express = require("express");
const router = express.Router();
const { getList } = require("../controllers/favController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.route("/:id").get(authMiddleware, getList);

module.exports = router;
