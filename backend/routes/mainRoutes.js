const express = require("express");
const {
  Login,
  Register,
  ViewAllUser,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  GetEmployees,
  GetEmployeeById,
  AddEmployee,
  UpdateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.get("/view-all-user", verifyToken, ViewAllUser);

//employees route
Router.get("/employees", verifyToken, GetEmployees);
Router.get("/employees/:employeeId", verifyToken, GetEmployeeById);
Router.post("/employees", verifyToken, AddEmployee);
Router.patch("/employees/:id", verifyToken, UpdateEmployee);
Router.delete("/employees/:id", verifyToken, deleteEmployee);

module.exports = Router;
