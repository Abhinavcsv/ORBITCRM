import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authService";

function Register() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    address: "",
  });

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

      await registerUser(formData);

      toast.success(
        formData.role === "employee"
          ? "Employee Created Successfully"
          : "Admin Created Successfully"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        address: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const isEmployee = formData.role === "employee";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white text-gray-900 shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create New User
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-gray-900"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-gray-900"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-gray-900"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-gray-900"
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          {isEmployee && (
            <>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-gray-900"
                required
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-gray-900"
                required
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-gray-900"
                required
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-gray-900"
                required
              />

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg p-3 text-gray-900"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Creating..."
              : formData.role === "employee"
              ? "Create Employee"
              : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;