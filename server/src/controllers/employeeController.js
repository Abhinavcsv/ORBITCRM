import Employee from "../models/Employee.js";

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

    // Validation
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

    // Check duplicate email
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    // Create Employee
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
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

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
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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
    console.error("UPDATE EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

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
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .sort({ createdAt: -1 });

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