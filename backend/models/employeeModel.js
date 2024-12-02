const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    joiningDate: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    contractLength: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    workMode: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    pinCode: {
      type: Number,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employees", EmployeesSchema);
