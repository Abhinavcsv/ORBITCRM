import {
  FaEye,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
} from "react-icons/fa";

function LeadTable({
  leads,
  onDelete,
  onView,
  onEdit,
  onConvert,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
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

                    <button
                      onClick={() => onView && onView(lead)}
                      className="text-blue-600"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onEdit && onEdit(lead)}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </button>
                    <button
  onClick={() => onConvert(lead)}
  className="text-green-600"
  title="Convert to Customer"
>
  <FaExchangeAlt />
</button>

                    <button
                      onClick={() => onDelete(lead)}
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

export default LeadTable;