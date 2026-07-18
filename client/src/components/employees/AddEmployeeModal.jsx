import EmployeeForm from "./EmployeeForm";

function AddEmployeeModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Add Employee
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <EmployeeForm
          onClose={onClose}
          onSuccess={onSuccess}
        />

      </div>

    </div>
  );
}

export default AddEmployeeModal;