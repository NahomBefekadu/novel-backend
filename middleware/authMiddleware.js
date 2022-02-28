const { checkToken, attachCookies } = require("../util/jwt");
const CustomErrors = require("../errors");

const authMiddleware = async (req, res, next) => {
  //check headers
  console.log("hey");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuthenticated("Authentication is Invalid!");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new CustomErrors.unAuthenticated("Authentication is Invalid!");
  }
  console.log(token);

  try {
    const payload = checkToken(token);
    console.log(payload);
    //req.user = { username: payload.username };
    next();
  } catch (error) {
    throw new CustomErrors.unAuthenticated("Authentication is Invalid!");
  }
};
module.exports = { authMiddleware };
