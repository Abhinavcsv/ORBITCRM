import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaChartLine,
  FaIndianRupeeSign,
} from "react-icons/fa6";

import StatCard from "./StatCard";
import { getDashboardStats } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";

function StatsSection() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalLeads: 0,
    activeEmployees: 0,
    won: 0,
    newLeads: 0,
    negotiation: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {isAdmin ? (
        <>
          <StatCard
            title="Employees"
            value={stats.totalEmployees}
            icon={<FaUserTie size={28} />}
            color="blue"
          />

          <StatCard
            title="Leads"
            value={stats.totalLeads}
            icon={<FaChartLine size={28} />}
            color="green"
          />

          <StatCard
            title="Active Employees"
            value={stats.activeEmployees}
            icon={<FaUsers size={28} />}
            color="yellow"
          />

          <StatCard
            title="Won Deals"
            value={stats.won}
            icon={<FaIndianRupeeSign size={28} />}
            color="red"
          />
        </>
      ) : (
        <>
          <StatCard
            title="My Leads"
            value={stats.totalLeads}
            icon={<FaChartLine size={28} />}
            color="blue"
          />

          <StatCard
            title="New Leads"
            value={stats.newLeads}
            icon={<FaUsers size={28} />}
            color="green"
          />

          <StatCard
            title="Negotiation"
            value={stats.negotiation}
            icon={<FaUserTie size={28} />}
            color="yellow"
          />

          <StatCard
            title="Won Deals"
            value={stats.won}
            icon={<FaIndianRupeeSign size={28} />}
            color="red"
          />
        </>
      )}

    </div>
  );
}

export default StatsSection;