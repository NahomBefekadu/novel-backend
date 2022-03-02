const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { NotFound, UnAuthenticated } = require("../errors");

let cachedData;
let cachedTime;
const getList = async (req, res) => {
  const statement = `SELECT fav_id,book_name,summary,author,isbn,publishing_year,genre,image,rating
  FROM favorites
  join books ON (favorites.book_id=books.book_id)
  where favorites.user_id = $1;`;

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

const addToList = async (req, res) => {
  const statement = `INSERT INTO favorites (book_id,user_id)
  VALUES ($1,$2)`;
  const values = [req.body.book, req.params.id];
  const results = await db.query(statement, values);
  if (!results) {
    throw new NotFound(`No List Found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed added to List successfully",
  });
};
const removeFromList = async (req, res) => {
  const statement = `DELETE FROM favorites WHERE fav_id = $1;`;
  const values = [req.params.id];
  const results = await db.query(statement, values);
  if (!results) {
    throw new NotFound(`No List Found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed removed from List successfully",
  });
};
module.exports = {
  getList,
  addToList,
  removeFromList,
};
