function ViewLeadModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-semibold">{lead.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{lead.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-semibold">{lead.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Company</p>
            <p className="font-semibold">{lead.company || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Source</p>
            <p className="font-semibold">{lead.source}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Priority</p>
            <p className="font-semibold">{lead.priority}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p className="font-semibold">{lead.status}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Assigned To</p>
            <p className="font-semibold">
              {lead.assignedTo?.name || "Not Assigned"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Notes</p>
            <p className="font-semibold">
              {lead.notes || "-"}
            </p>
          </div>

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}

export default ViewLeadModal;