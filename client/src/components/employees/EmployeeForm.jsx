import { useState } from "react";
import toast from "react-hot-toast";

import {
  createEmployee,
  updateEmployee,
} from "../../services/employeeService";

import { useEffect } from "react";

function EmployeeForm({
  employee,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    address: "",
  });
  useEffect(() => {
  if (employee) {
    setForm({
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || "",
      designation: employee.designation || "",
      salary: employee.salary || "",
      address: employee.address || "",
    });
  }
}, [employee]);

  const designationOptions = {
    Sales: [
      "Sales Executive",
      "Sales Manager",
      "Business Development Executive",
      "Account Manager",
    ],

    HR: [
      "HR Executive",
      "HR Manager",
      "Recruiter",
      "Talent Acquisition Specialist",
    ],

    IT: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "DevOps Engineer",
      "QA Engineer",
    ],

    Finance: [
      "Accountant",
      "Financial Analyst",
      "Finance Manager",
      "Auditor",
    ],

    Marketing: [
      "Marketing Executive",
      "Digital Marketing Executive",
      "SEO Specialist",
      "Social Media Manager",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm({
        ...form,
        department: value,
        designation: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (employee) {
      await updateEmployee(employee._id, form);

      toast.success("Employee Updated Successfully");
    } else {
      await createEmployee(form);

      toast.success("Employee Added Successfully");
    }

    onSuccess();
    onClose();

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Operation Failed"
    );
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4"
    >

      <input
        name="name"
        placeholder="Name"
        className="border rounded-lg p-3"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border rounded-lg p-3"
        value={form.email}
        onChange={handleChange}
        readOnly={!!employee}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        className="border rounded-lg p-3"
        value={form.phone}
        onChange={handleChange}
        required
      />

      {/* Department */}
      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className="border rounded-lg p-3"
        required
      >
        <option value="">Select Department</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
      </select>

      {/* Designation */}
      <select
        name="designation"
        value={form.designation}
        onChange={handleChange}
        className="border rounded-lg p-3"
        required
        disabled={!form.department}
      >
        <option value="">Select Designation</option>

        {form.department &&
          designationOptions[form.department].map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
      </select>

      <input
        name="salary"
        type="number"
        placeholder="Salary"
        className="border rounded-lg p-3"
        value={form.salary}
        onChange={handleChange}
        required
      />

      <textarea
        name="address"
        placeholder="Address"
        className="border rounded-lg p-3 col-span-2"
        rows="3"
        value={form.address}
        onChange={handleChange}
      />

      <div className="col-span-2 flex justify-end gap-3 mt-2">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-lg border hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {employee ? "Update Employee" : "Save Employee"}
        </button>

      </div>

    </form>
  );
}

export default EmployeeForm;