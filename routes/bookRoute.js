const express = require("express");
const router = express.Router();
const {
  getBook,
  getBooks,
  updateBook,
  DeleteBook,
  createBook,
} = require("../controllers/bookController");

router.route("/:id").get(getBook);
router.route("/").get(getBooks);
router.route("/").post(createBook);
router.route("/:id").put(updateBook);
router.route("/:id").delete(DeleteBook);
module.exports = router;
