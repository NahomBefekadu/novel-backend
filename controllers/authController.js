require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged in!" });
};
const register = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user registered!" });
};
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
