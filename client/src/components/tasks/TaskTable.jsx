import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function TaskTable({
  tasks,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Assigned To</th>
            <th className="p-4 text-left">Priority</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center p-8 text-gray-500"
              >
                No Tasks Found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{task.title}</td>

                <td className="p-4">
                  {task.assignedTo?.name || "-"}
                </td>

                <td className="p-4">{task.priority}</td>

                <td className="p-4">{task.status}</td>

                <td className="p-4">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() => onView && onView(task)}
                      className="text-blue-600"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onEdit && onEdit(task)}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(task)}
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

export default TaskTable;