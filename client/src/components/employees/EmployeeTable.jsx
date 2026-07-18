import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function EmployeeTable({
  employees,
  onDelete,
  onView,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Designation</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center p-8 text-gray-500"
              >
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {emp.name}
                </td>

                <td className="p-4">
                  {emp.email}
                </td>

                <td className="p-4">
                  {emp.department}
                </td>

                <td className="p-4">
                  {emp.designation}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-4">

                    {/* View */}
                    <button
  onClick={() => onView(emp)}
  className="text-blue-600 hover:text-blue-800"
  title="View Employee"
>
  <FaEye />
</button>

                    {/* Edit */}
                    <button
  onClick={() => onEdit(emp)}
  className="text-yellow-500 hover:text-yellow-700"
  title="Edit Employee"
>
  <FaEdit />
</button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(emp)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Employee"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;