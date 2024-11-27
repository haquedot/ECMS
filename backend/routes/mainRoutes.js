const express = require("express");
const {
  Login,
  Register,
  ViewAllUser,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.get("/view-all-user", verifyToken, ViewAllUser);

module.exports = Router;
