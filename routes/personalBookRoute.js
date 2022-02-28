const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getPersonalList,
} = require("../controllers/uploadController");
const { createBook } = require("../controllers/bookController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.route("/:id").get(getPersonalList);
router.route("/").post(createBook);
router.route("/img").post(uploadImage);

module.exports = router;
