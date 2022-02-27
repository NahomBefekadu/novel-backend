const jwt = require("jsonwebtoken");
const { unAuthenticated } = require("../errors");
const authMiddleware = async (err, req, res, next) => {
  console.log(req.headers.authorization);
  next();
};
module.exports = authMiddleware;
