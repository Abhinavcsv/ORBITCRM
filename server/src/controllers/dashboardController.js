import Employee from "../models/Employee.js";
import Lead from "../models/Lead.js";

export const getDashboardStats = async (req, res) => {
  try {
    const createdBy = req.session.user.id;

    const totalEmployees = await Employee.countDocuments({
      createdBy,
    });

    const activeEmployees = await Employee.countDocuments({
      createdBy,
      status: "Active",
    });

    const inactiveEmployees = await Employee.countDocuments({
      createdBy,
      status: "Inactive",
    });

    const totalLeads = await Lead.countDocuments({
      createdBy,
    });

    const newLeads = await Lead.countDocuments({
      createdBy,
      status: "New",
    });

    const contacted = await Lead.countDocuments({
      createdBy,
      status: "Contacted",
    });

    const qualified = await Lead.countDocuments({
      createdBy,
      status: "Qualified",
    });

    const proposalSent = await Lead.countDocuments({
      createdBy,
      status: "Proposal Sent",
    });

    const negotiation = await Lead.countDocuments({
      createdBy,
      status: "Negotiation",
    });

    const won = await Lead.countDocuments({
      createdBy,
      status: "Won",
    });

    const lost = await Lead.countDocuments({
      createdBy,
      status: "Lost",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        totalLeads,
        newLeads,
        contacted,
        qualified,
        proposalSent,
        negotiation,
        won,
        lost,
      },
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};