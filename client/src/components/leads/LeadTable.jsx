import {
  FaEye,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function LeadTable({
  leads,
  onDelete,
  onView,
  onEdit,
  onConvert,
}) {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full text-gray-900">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Source</th>
            <th className="p-4 text-left">Priority</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Assigned To</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center p-8 text-gray-500"
              >
                No Leads Found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{lead.name}</td>

                <td className="p-4">{lead.company}</td>

                <td className="p-4">{lead.source}</td>

                <td className="p-4">{lead.priority}</td>

                <td className="p-4">{lead.status}</td>

                <td className="p-4">
                  {lead.assignedTo?.name || "Not Assigned"}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    {/* View - available to everyone */}
                    <button
                      onClick={() => onView && onView(lead)}
                      className="text-blue-600"
                      title="View Lead"
                    >
                      <FaEye />
                    </button>

                    {/* Admin-only actions */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => onEdit && onEdit(lead)}
                          className="text-yellow-500"
                          title="Edit Lead"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => onConvert && onConvert(lead)}
                          className="text-green-600"
                          title="Convert to Customer"
                        >
                          <FaExchangeAlt />
                        </button>

                        <button
                          onClick={() => onDelete && onDelete(lead)}
                          className="text-red-600"
                          title="Delete Lead"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
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

export default LeadTable;
