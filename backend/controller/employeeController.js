const httpStatusCode = require("../constants/httpStatusCode");
const EmployeesModel = require("../models/employeeModel");
const { validationResult } = require("express-validator");
const GetEmployees = async (req, res) => {
  try {
    const employees = await EmployeesModel.find();
    if (!employees) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: true,
        message: "No employees found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      data: employees,
      message: "employees found successfully!!",
    });
  } catch (error) {
    console.error("error in getting employees", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in getting employees",
      error: error.message,
    });
  }
};

const GetEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await EmployeesModel.findById(employeeId);
    if (!employee) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Employee not found!!",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      data: employee,
      message: "Employee found successfully!!",
    });
  } catch (error) {
    console.error("error in getting employees by ID", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in getting employees ById",
      error: error.message,
    });
  }
};

const AddEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: errors.array(),
      });
    }

    const {
      name,
      email,
      phoneNumber,
      designation,
      contractLength,
      category,
      salary,
      workMode,
      address,
      city,
      state,
      pinCode,
    } = req.body;

    const employee = await EmployeesModel.create({
      name,
      email,
      phoneNumber,
      designation,
      contractLength,
      category,
      salary,
      workMode,
      address,
      city,
      state,
      pinCode,
    });

    if (!employee) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Error in adding employee",
      });
    }

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Employee added successfully",
      data: employee,
    });
  } catch (error) {
    console.error("error in adding employees", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in adding employees",
      error: error.message,
    });
  }
};

const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phoneNumber,
      designation,
      contractLength,
      category,
      salary,
      workMode,
    } = req.body;
    const employee = await EmployeesModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phoneNumber,
          designation,
          contractLength,
          category,
          salary,
          workMode,
        },
      },
      {
        new: true,
      }
    );
    if (!employee) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.json({
      success: true,
      message: "Employee updated successfully",
      employee: employee,
    });
  } catch (error) {
    console.log("error in update Employee:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in update Employee",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await EmployeesModel.findByIdAndDelete(id);
    if (!employee) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log("error in delete Employee:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error in delete Employee",
      error: error.message,
    });
  }
};
module.exports = {
  GetEmployees,
  GetEmployeeById,
  AddEmployee,
  UpdateEmployee,
  deleteEmployee,
};
