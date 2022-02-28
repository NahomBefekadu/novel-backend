const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  console.log(err.code);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code === 23505) {
    let messages = "Data already exists in the database for";
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: messages });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong try again later" });
};

module.exports = errorHandlerMiddleware;
