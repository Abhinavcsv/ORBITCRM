import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function CustomerTable({
  customers,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Industry</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Assigned To</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>
              <td
                colSpan="7"
                className="text-center p-8 text-gray-500"
              >
                No Customers Found
              </td>
            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.company}
                </td>

                <td className="p-4">
                  {customer.phone}
                </td>

                <td className="p-4">
                  {customer.industry}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td className="p-4">
                  {customer.assignedTo?.name || "-"}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() => onView(customer)}
                      className="text-blue-600"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onEdit(customer)}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(customer)}
                      className="text-red-600"
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

export default CustomerTable;