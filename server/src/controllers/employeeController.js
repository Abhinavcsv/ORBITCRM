import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= CREATE EMPLOYEE =================

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      designation,
      salary,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !designation ||
      !salary
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      department,
      designation,
      salary,
      address,
      createdBy: req.session.user.id,
    });
    // Create login account for employee

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash("Welcome@123", 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role: "employee",
});

// Link Employee with User Login
employee.userId = user._id;

await employee.save();

    return res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      employee,
    });

  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL EMPLOYEES =================

export const getAllEmployees = async (req, res) => {
  try {

    const employees = await Employee.find({
      createdBy: req.session.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });

  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE EMPLOYEE =================

export const getEmployeeById = async (req, res) => {
  try {

    const employee = await Employee.findOne({
      _id: req.params.id,
      createdBy: req.session.user.id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {
    console.error("GET EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE EMPLOYEE =================

export const updateEmployee = async (req, res) => {
  try {

    console.log("========== UPDATE ==========");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("SESSION USER:", req.session.user);

    const employee = await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.session.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("UPDATED EMPLOYEE:", employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= DELETE EMPLOYEE =================

export const deleteEmployee = async (req, res) => {
  try {

    const employee = await Employee.findOneAndDelete({
  _id: req.params.id,
  createdBy: req.session.user.id,
});

if (!employee) {
  return res.status(404).json({
    success: false,
    message: "Employee not found",
  });
}

// Delete login account also
await User.findOneAndDelete({
  email: employee.email,
});

return res.status(200).json({
  success: true,
  message: "Employee Deleted Successfully",
});

  } catch (error) {
    console.error("DELETE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};