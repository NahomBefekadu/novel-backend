const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
