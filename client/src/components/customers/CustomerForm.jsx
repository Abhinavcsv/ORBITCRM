import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createCustomer,
  updateCustomer,
} from "../../services/customerService";

import { getEmployees } from "../../services/employeeService";

function CustomerForm({
  onClose,
  onSuccess,
  customer,
}) {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    industry: "",
    assignedTo: "",
    status: "Active",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        company: customer.company || "",
        address: customer.address || "",
        industry: customer.industry || "",
        assignedTo: customer.assignedTo?._id || "",
        status: customer.status || "Active",
        notes: customer.notes || "",
      });
    }
  }, [customer]);

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

      if (customer) {
        await updateCustomer(customer._id, formData);

        toast.success("Customer Updated Successfully");
      } else {
        await createCustomer(formData);

        toast.success("Customer Created Successfully");
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
        name="name"
        placeholder="Customer Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="address"
        rows="3"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
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
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <textarea
        name="notes"
        rows="4"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
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
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading
            ? customer
              ? "Updating..."
              : "Creating..."
            : customer
            ? "Update Customer"
            : "Create Customer"}
        </button>

      </div>
    </form>
  );
}

export default CustomerForm;