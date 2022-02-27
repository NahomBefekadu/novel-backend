const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { NotFound, UnAuthenticated } = require("../errors");

let cachedData;
let cachedTime;
const getList = async (req, res) => {
  const statement = `SELECT book_name,summary,author,isbn,publishing_year,genre,image,rating
  FROM favorites
  join books ON (favorites.book_id=books.book_id)
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
  });
};
module.exports = {
  getList,
};
