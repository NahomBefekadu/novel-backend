const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { UnAuthenticated, BadRequest } = require("../errors");
const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { createJWT, attachCookies } = require("../util/jwt");

const jwt = require("jsonwebtoken");

//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide proper credentials");
  }

  if (body(email).isEmail()) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      throw new BadRequest("Please provide proper credentials");
    }
  }

  const statement = `select * from user_tb where email = $1;`;
  const values = [req.body.email];
  const results = await db.query(statement, values);
  console.log(password);
  console.log(results.rows[0]);
  const tempData = results.rows[0];
  if (!results.rows[0]) {
    throw new UnAuthenticated("Invalid Credentials");
  }
  const correctPassword = await bcrypt.compare(
    password,
    results.rows[0].hashed_password
  );

  console.log(correctPassword);
  if (!correctPassword) {
    throw new UnAuthenticated("Invalid Credentials");
  }
  const tokenUser = createJWT(tempData);
  res.status(StatusCodes.OK).json({
    msg: "user logged in!",
    user: results.rows[0],
    userToken: tokenUser,
  });
};
//Registration
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);
  if (!email || !password || !username) {
    throw new BadRequest("Please provide proper credentials");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUserCred = { username, email, password: hashedPassword };
  const statement = `INSERT INTO user_tb (username,hashed_password,email,created)
  VALUES
  ($1,$2,$3,$4);`;
  const createdDate = Date.now();
  var dbDate = moment(createdDate).format("YYYY-MM-DD");
  console.log(dbDate);
  const values = [
    tempUserCred.username,
    tempUserCred.password,
    tempUserCred.email,
    dbDate,
  ];

  const results = await db.query(statement, values);
  const tokenUser = createJWT(tempUserCred);
  res
    .status(StatusCodes.OK)
    .json({ msg: "User Registered!", userToken: tokenUser });
};
//Logout
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
module.exports = {
  logout,
  register,
  login,
};
