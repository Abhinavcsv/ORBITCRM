function ViewEmployeeModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Employee Details
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
            <p className="font-semibold">{employee.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{employee.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-semibold">{employee.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Department</p>
            <p className="font-semibold">{employee.department}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Designation</p>
            <p className="font-semibold">{employee.designation}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Salary</p>
            <p className="font-semibold">₹ {employee.salary}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                employee.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {employee.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Joining Date</p>
            <p className="font-semibold">
              {new Date(employee.joiningDate).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-semibold">
              {employee.address || "-"}
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

export default ViewEmployeeModal;