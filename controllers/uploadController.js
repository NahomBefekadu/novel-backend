const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const customErrors = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
//explore streams in the future
const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "Novel-app" }
  );
  console.log(result);

  fs.unlinkSync(req.files.image.tempFilePath); // remove created temp files

  res.status(StatusCodes.CREATED).json({
    msg: "Query completed uploaded Image Successfully",
    imagePath: { src: `${result.secure_url}` },
  });
};

const uploadImageLocally = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw new customErrors.BadRequest("No files to upload");
  }

  let bookImage = req.files.image;
  // check if file is correct format
  if (!bookImage.mimetype.startsWith("image")) {
    throw new customErrors.BadRequest("Incorrect file");
  }
  // check if file size over 1mb
  if (bookImage.size > 1048576) {
    throw new customErrors.BadRequest("file size too large");
  }
  const imagePath = path.join(
    __dirname,
    "../public/images/" + `${bookImage.name}`
  ); // create a path to public folder with image name

  await bookImage.mv(imagePath); // move image to public folder

  res.status(StatusCodes.CREATED).json({
    msg: "Query completed created Book Successfully",
    imagePath: { src: `/images/${bookImage.name}` },
  });
};

const getPersonalList = async (req, res) => {
  const statement = `SELECT book_name,summary,author,isbn,publishing_year,genre,image,rating
  FROM personalBook
  join books ON (personalBook.book_id=books.book_id)
  where user_id = $1;`;

  if (cachedTime && cachedTime > Date.now() - 30 * 10000) {
    // return cached data if within 30 seconds
    res.status(StatusCodes.OK).json({
      msg: "Query completed retrieved List successfully",
      Books: cachedData,
    });
  }

  const values = [req.params.id];
  const results = await db.query(statement, values);
  if (!results) {
    throw new NotFound(`No List Found`);
  }
  cachedData = results.rows;
  cachedTime = Date.now();
  res.status(StatusCodes.OK).json({
    msg: "Query completed retrieved List successfully",
    Books: results.rows,
    username: req.username,
  });
};
module.exports = {
  uploadImage,
  getPersonalList,
};
