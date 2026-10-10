import { useEffect, useState } from "react";

import { getEmployees } from "../../services/employeeService";
import { getCustomers } from "../../services/customerService";
import { getTasks } from "../../services/taskService";

function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const [
          employeesResponse,
          customersResponse,
          tasksResponse,
        ] = await Promise.all([
          getEmployees(),
          getCustomers(),
          getTasks(),
        ]);

        const employees =
          employeesResponse?.employees ||
          employeesResponse?.data ||
          [];

        const customers =
          customersResponse?.customers ||
          customersResponse?.data ||
          [];

        const tasks =
          tasksResponse?.tasks ||
          tasksResponse?.data ||
          [];

        const activityList = [
          ...employees.map((employee) => ({
            id: `employee-${employee._id}`,
            type: "Employee",
            message: `${employee.name} was added as an employee`,
            date: employee.createdAt,
          })),

          ...customers.map((customer) => ({
            id: `customer-${customer._id}`,
            type: "Customer",
            message: `Customer "${customer.name}" was added`,
            date: customer.createdAt,
          })),

          ...tasks.map((task) => ({
            id: `task-${task._id}`,
            type: "Task",
            message: `Task "${task.title}" was created`,
            date: task.createdAt,
          })),
        ];

        const sortedActivities = activityList
          .filter((activity) => activity.date)
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date)
          )
          .slice(0, 6);

        setActivities(sortedActivities);
      } catch (error) {
        console.error(
          "Recent Activities Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "Employee":
        return "👤";

      case "Customer":
        return "🤝";

      case "Task":
        return "✅";

      default:
        return "📌";
    }
  };

  const formatDate = (date) => {
    const activityDate = new Date(date);

    return activityDate.toLocaleString();
  };

  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        Recent Activities
      </h2>

      {loading ? (
        <p className="text-gray-500">
          Loading activities...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activities.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                {getActivityIcon(activity.type)}
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  {activity.message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(activity.date)}
                </p>
              </div>

              <span className="text-xs font-semibold text-gray-500">
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivities;
