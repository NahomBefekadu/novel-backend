const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getPersonalList,
  addToList,
} = require("../controllers/uploadController");
const { createBook } = require("../controllers/bookController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.route("/:id").get(authMiddleware, getPersonalList);
router.route("/img").post(authMiddleware, uploadImage);
router.route("/").post(authMiddleware, createBook);
router.route("/:id").post(authMiddleware, addToList);

module.exports = router;
