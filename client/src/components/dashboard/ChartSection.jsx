import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getDashboardStats } from "../../services/dashboardService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartSection() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setChartData(data.employeeGrowth || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "Employees",
        data: chartData.map((item) => item.employees),
        backgroundColor: "#06b6d4",
        hoverBackgroundColor: "#22d3ee",
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#e2e8f0",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },

      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          color: "#1e293b",
        },
      },

      y: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          color: "#1e293b",
        },
      },
    },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 hover:border-cyan-500 transition-all duration-300">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            📈 Employee Growth
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Monthly employee growth overview
          </p>
        </div>

      </div>

      <div className="h-96">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}

export default ChartSection;