const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class UnAuthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnAuthenticated;
