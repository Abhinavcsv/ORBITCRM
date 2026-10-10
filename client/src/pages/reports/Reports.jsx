import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import { getLeads } from "../../services/leadService";
import { getCustomers } from "../../services/customerService";
import { getTasks } from "../../services/taskService";

function Reports() {
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          employeesResponse,
          leadsResponse,
          customersResponse,
          tasksResponse,
        ] = await Promise.all([
          getEmployees(),
          getLeads(),
          getCustomers(),
          getTasks(),
        ]);

        setEmployees(
          employeesResponse?.employees ||
            employeesResponse?.data ||
            []
        );

        setLeads(
          leadsResponse?.leads ||
            leadsResponse?.data ||
            []
        );

        setCustomers(
          customersResponse?.customers ||
            customersResponse?.data ||
            []
        );

        setTasks(
          tasksResponse?.tasks ||
            tasksResponse?.data ||
            []
        );
      } catch (err) {
        console.error("Reports Error:", err);
        setError("Failed to load report data.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const leadStatuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const taskStatuses = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  const getLeadStatusCount = (status) =>
    leads.filter((lead) => lead.status === status).length;

  const getTaskStatusCount = (status) =>
    tasks.filter((task) => task.status === status).length;

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">
          Reports
        </h1>

        <p className="text-slate-400 mt-3">
          Loading report data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">
          Reports
        </h1>

        <div className="bg-red-100 text-red-700 rounded-xl p-5 mt-6">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Reports
        </h1>

        <p className="text-slate-400 mt-2">
          Overview of your CRM performance and activity.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm font-semibold">
            Total Employees
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {employees.length}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            {activeEmployees} Active
          </p>
        </div>

        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm font-semibold">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {leads.length}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            {wonLeads} Won
          </p>
        </div>

        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm font-semibold">
            Total Customers
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {customers.length}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Converted customers
          </p>
        </div>

        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-sm font-semibold">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {tasks.length}
          </h2>

          <p className="text-blue-600 text-sm mt-2">
            {completedTasks} Completed
          </p>
        </div>
      </div>

      {/* Lead Report */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">
            Lead Status
          </h2>

          <div className="space-y-4">
            {leadStatuses.map((status) => {
              const count = getLeadStatusCount(status);

              return (
                <div
                  key={status}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <span className="font-medium">
                    {status}
                  </span>

                  <span className="bg-slate-100 px-4 py-1 rounded-full font-bold">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Report */}

        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">
            Task Status
          </h2>

          <div className="space-y-4">
            {taskStatuses.map((status) => {
              const count = getTaskStatusCount(status);

              return (
                <div
                  key={status}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <span className="font-medium">
                    {status}
                  </span>

                  <span className="bg-slate-100 px-4 py-1 rounded-full font-bold">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Summary */}

      <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">
          Performance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-gray-600">
              Won Leads
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {wonLeads}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-gray-600">
              Lost Leads
            </p>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {lostLeads}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-gray-600">
              Pending Tasks
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {pendingTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;