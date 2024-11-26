const express = require("express");
const { Login, Register } = require("../controller/userController");


const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.get('/view-all-user',);

module.exports = Router;
