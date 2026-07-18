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
        backgroundColor: "#2563eb",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Employee Growth
      </h2>

      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartSection;