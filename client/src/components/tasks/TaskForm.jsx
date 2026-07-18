import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createTask,
  updateTask,
} from "../../services/taskService";
import { getEmployees } from "../../services/employeeService";

function TaskForm({
  onClose,
  onSuccess,
  task,
}) { 
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
  if (task) {
    setFormData({
      title: task.title || "",
      description: task.description || "",
      assignedTo: task.assignedTo?._id || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending",
      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
    });
  }
}, [task]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    if (task) {
      await updateTask(task._id, formData);

      toast.success("Task Updated Successfully");
    } else {
      await createTask(formData);

      toast.success("Task Created Successfully");
    }

    onSuccess();
    onClose();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Operation Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      >
        <option value="">
          Select Employee
        </option>

        {employees.map((emp) => (
          <option
            key={emp._id}
            value={emp._id}
          >
            {emp.name}
          </option>
        ))}
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {loading
  ? task
    ? "Updating..."
    : "Creating..."
  : task
  ? "Update Task"
  : "Create Task"}
        </button>

      </div>

    </form>
  );
}

export default TaskForm;