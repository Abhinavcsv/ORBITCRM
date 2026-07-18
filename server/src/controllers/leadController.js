import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";

export const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      source,
      priority,
      notes,
    } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Phone are required",
      });
    }

    // Check Duplicate Lead
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead already exists",
      });
    }

    // Create Lead
    // Auto Assign Employee
let employee = null;

if (priority === "High") {
  employee = await Employee.findOne({
    createdBy: req.session.user.id,
    department: "Sales",
    designation: "Sales Manager",
    status: "Active",
  });
}

if (priority === "Medium" && !employee) {
  employee = await Employee.findOne({
    createdBy: req.session.user.id,
    department: "Sales",
    designation: "Business Development Executive",
    status: "Active",
  });
}

if (priority === "Low" && !employee) {
  employee = await Employee.findOne({
    createdBy: req.session.user.id,
    department: "Sales",
    designation: "Sales Executive",
    status: "Active",
  });
}

if (!employee) {
  employee = await Employee.findOne({
    createdBy: req.session.user.id,
    department: "Sales",
    status: "Active",
  });
}

const lead = await Lead.create({
  name,
  email,
  phone,
  company,
  source,
  priority,
  notes,
  assignedTo: employee ? employee._id : null,
  createdBy: req.session.user.id,
});

await lead.populate(
  "assignedTo",
  "name email department designation"
);

return res.status(201).json({
  success: true,
  message: "Lead Created Successfully",
  lead,
});

  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllLeads = async (req, res) => {
  try {
    console.log("Logged In User:", req.session.user);

    const leads = await Lead.find({
      createdBy: req.session.user.id,
    }).populate(
      "assignedTo",
      "name email department designation"
    );

    console.log("Found Leads:", leads);

    return res.status(200).json({
      success: true,
      leads,
    });

  } catch (error) {
    console.error("GET LEADS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {
    console.error("GET LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead Updated Successfully",
      lead,
    });

  } catch (error) {
    console.error("UPDATE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead Deleted Successfully",
    });

  } catch (error) {
    console.error("DELETE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const assignLead = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Validation
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Check Employee
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check Lead
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Assign Lead
    lead.assignedTo = employeeId;

    await lead.save();

    // Populate Employee Details
    await lead.populate(
      "assignedTo",
      "name email department designation phone"
    );

    return res.status(200).json({
      success: true,
      message: "Lead Assigned Successfully",
      lead,
    });

  } catch (error) {
    console.error("ASSIGN LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validation
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Allowed Status
    const allowedStatus = [
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Negotiation",
      "Won",
      "Lost",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    // Find Lead
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email department designation"
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Update Status
    lead.status = status;

    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead Status Updated Successfully",
      lead,
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRecentLeads = async (req, res) => {
  try {
    console.log("SESSION USER:", req.session.user);

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    console.log("LEADS:", leads);

    return res.status(200).json({
      success: true,
      leads,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyLeads = async (req, res) => {
  try {
    console.log("SESSION:", req.session.user);

    const employee = await Employee.findOne({
      email: req.session.user.email,
    });

    console.log("EMPLOYEE:", employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const leads = await Lead.find({
      assignedTo: employee._id,
    }).populate(
      "assignedTo",
      "name email designation"
    );

    console.log("LEADS:", leads);

    return res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const convertLeadToCustomer = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead Not Found",
      });
    }

    const existingCustomer = await Customer.findOne({
      email: lead.email,
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer already exists",
      });
    }

    const customer = await Customer.create({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      assignedTo: lead.assignedTo,
      notes: lead.notes,
      createdBy: req.session.user.id,
      status: "Active",
    });

    lead.status = "Won";
    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead Converted Successfully",
      customer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};