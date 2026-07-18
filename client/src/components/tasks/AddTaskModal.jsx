import TaskForm from "./TaskForm";

function AddTaskModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add Task
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <TaskForm
          onClose={onClose}
          onSuccess={onSuccess}
        />

      </div>

    </div>
  );
}

export default AddTaskModal;