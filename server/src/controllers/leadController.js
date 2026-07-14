import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";

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
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      priority,
      notes,
      createdBy: req.session.user.id,
    });

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
    const leads = await Lead.find({
      createdBy: req.session.user.id,
    }).populate(
      "assignedTo",
      "name email department designation"
    );

    return res.status(200).json({
      success: true,
      count: leads.length,
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