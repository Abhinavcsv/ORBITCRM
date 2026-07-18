import StatsSection from "../../components/dashboard/StatsSection";
import ChartSection from "../../components/dashboard/ChartSection";
import RecentLeads from "../../components/dashboard/RecentLeads";
import RecentActivities from "../../components/dashboard/RecentActivities";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          {isAdmin
            ? "Manage your employees, leads and business."
            : "Manage your assigned leads and update their status."}
        </p>
      </div>

      <StatsSection />

      <ChartSection />

      {isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentLeads />
          <RecentActivities />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <RecentLeads />
        </div>
      )}

    </div>
  );
}

export default Dashboard;