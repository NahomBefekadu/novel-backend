const express = require("express");
const router = express.Router();
const { getList } = require("../controllers/favController");

router.route("/:id").get(getList);

module.exports = router;
