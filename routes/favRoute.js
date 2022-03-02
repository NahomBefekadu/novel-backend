const express = require("express");
const router = express.Router();
const {
  getList,
  addToList,
  removeFromList,
} = require("../controllers/favController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.route("/:id").get(authMiddleware, getList);
router.route("/:id").post(authMiddleware, addToList);
router.route("/:id").delete(authMiddleware, removeFromList);

module.exports = router;
