function ViewTaskModal({
  isOpen,
  onClose,
  task,
}) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Task Details
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
            <p className="text-gray-500 text-sm">Title</p>
            <p className="font-semibold">{task.title}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Assigned To</p>
            <p className="font-semibold">
              {task.assignedTo?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Priority</p>
            <p className="font-semibold">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Due Date</p>
            <p className="font-semibold">
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Description</p>
            <p className="font-semibold">
              {task.description || "-"}
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

export default ViewTaskModal;