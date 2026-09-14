import StatsSection from "../../components/dashboard/StatsSection";
import ChartSection from "../../components/dashboard/ChartSection";
import RecentLeads from "../../components/dashboard/RecentLeads";
import RecentActivities from "../../components/dashboard/RecentActivities";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome Back,
            <span className="text-cyan-400"> {user?.name}</span> 👋
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            {isAdmin
              ? "Monitor your business performance and manage your team efficiently."
              : "Track your assigned leads, customers and daily tasks."}
          </p>
        </div>

        <div className="mt-6 lg:mt-0 flex gap-4">

          <div className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 shadow-lg">
            <h4 className="text-slate-400 text-sm">
              Today's Date
            </h4>

            <p className="text-white font-bold text-xl">
              {new Date().toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

      {/* Stats */}

      <StatsSection />

      {/* Charts */}

      <ChartSection />

      {/* Bottom Section */}

      {isAdmin ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-cyan-500 transition-all">
            <h2 className="text-xl font-semibold text-white mb-5">
              📈 Recent Leads
            </h2>

            <RecentLeads />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-cyan-500 transition-all">
            <h2 className="text-xl font-semibold text-white mb-5">
              📋 Recent Activities
            </h2>

            <RecentActivities />
          </div>

        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-cyan-500 transition-all">

          <h2 className="text-xl font-semibold text-white mb-5">
            📈 My Recent Leads
          </h2>

          <RecentLeads />

        </div>
      )}

    </div>
  );
}

export default Dashboard;