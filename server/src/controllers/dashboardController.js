import Employee from "../models/Employee.js";
import Lead from "../models/Lead.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      status: "Active",
    });

    const inactiveEmployees = await Employee.countDocuments({
      status: "Inactive",
    });

    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "New",
    });

    const contacted = await Lead.countDocuments({
      status: "Contacted",
    });

    const qualified = await Lead.countDocuments({
      status: "Qualified",
    });

    const proposalSent = await Lead.countDocuments({
      status: "Proposal Sent",
    });

    const negotiation = await Lead.countDocuments({
      status: "Negotiation",
    });

    const won = await Lead.countDocuments({
      status: "Won",
    });

    const lost = await Lead.countDocuments({
      status: "Lost",
    });

    const monthlyEmployees = await Employee.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          employees: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const employeeGrowth = months.map((month, index) => {
      const found = monthlyEmployees.find(
        item => item._id === index + 1
      );

      return {
        month,
        employees: found ? found.employees : 0,
      };
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
        employeeGrowth,
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