import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllUsers } from "../../services/authService";
import { getEmployees } from "../../services/employeeService";

function Employees() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const [usersResponse, employeesResponse] =
        await Promise.all([
          getAllUsers(),
          getEmployees(),
        ]);

      setUsers(usersResponse.users || []);
      setEmployees(employeesResponse.employees || []);
    } catch (error) {
      console.error("User Management Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeDetails = (user) => {
    return employees.find(
      (employee) =>
        employee.userId === user._id ||
        employee.userId?._id === user._id
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole =
      filter === "all" ||
      user.role === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name
        ?.toLowerCase()
        .includes(searchText) ||
      user.email
        ?.toLowerCase()
        .includes(searchText);

    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          User Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all Admin and Employee accounts.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-5">

        <div className="flex flex-col md:flex-row gap-4">

          {/* Role Filter */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border rounded-lg p-3 text-gray-900 md:w-64"
          >
            <option value="all">
              All Users
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="employee">
              Employees
            </option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3 text-gray-900 flex-1"
          />

        </div>

      </div>

      {/* User Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
          Loading Users...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

          <table className="w-full text-gray-900">

            <thead className="bg-slate-100">
              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                {filter !== "admin" && (
                  <>
                    <th className="p-4 text-left">
                      Phone
                    </th>

                    <th className="p-4 text-left">
                      Department
                    </th>

                    <th className="p-4 text-left">
                      Designation
                    </th>

                    <th className="p-4 text-left">
                      Salary
                    </th>
                  </>
                )}

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={filter === "admin" ? 4 : 8}
                    className="text-center p-8 text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const employee =
                    user.role === "employee"
                      ? getEmployeeDetails(user)
                      : null;

                  return (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4 font-medium">
                        {user.name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role === "admin"
                            ? "Admin"
                            : "Employee"}
                        </span>
                      </td>

                      {filter !== "admin" && (
                        <>
                          <td className="p-4">
                            {employee?.phone || "-"}
                          </td>

                          <td className="p-4">
                            {employee?.department || "-"}
                          </td>

                          <td className="p-4">
                            {employee?.designation || "-"}
                          </td>

                          <td className="p-4">
                            {employee?.salary
                              ? `₹ ${employee.salary}`
                              : "-"}
                          </td>
                        </>
                      )}

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Employees;