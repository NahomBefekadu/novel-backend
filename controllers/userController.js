const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { NotFound, UnAuthenticated } = require("../errors");

const getUsers = async (req, res) => {};
const getUser = async (req, res) => {};
const createUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
};
