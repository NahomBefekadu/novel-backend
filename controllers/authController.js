const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { UnAuthenticated, BadRequest } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    throw new BadRequest("Please provide proper credentials");
  }
  const statement = `select * from user_tb where email = $1 AND hashed_password=$2;`;
  const values = [req.body.email, req.body.password];
  const results = await db.query(statement, values);
  if (!results.rows[0]) {
    throw new UnAuthenticated("Invalid Credentials");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "user logged in!", user: results.rows[0] });
};
const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide proper credentials");
  }
  res.status(StatusCodes.OK).json({ msg: "user registered!" });
};
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
module.exports = {
  logout,
  register,
  login,
};
