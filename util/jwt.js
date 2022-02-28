const jwt = require("jsonwebtoken");

//Create Token
const createJWT = (data) => {
  console.log("I'm Here");
  console.log(data);
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

//Check Token
const checkToken = (token) => {
  const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return tokenIsValid;
};
//Add Cookies
const attachCookies = (token) => {
  const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return tokenIsValid;
};
module.exports = {
  createJWT,
  checkToken,
  attachCookies,
};
