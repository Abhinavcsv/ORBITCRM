import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

await checkAuth();

toast.success("Login Successful");

if (res.data.user.role === "admin") {
  navigate("/");
} else {
  navigate("/");
}
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        OrbitCRM
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          value={form.password}
          onChange={handleChange}
        />
        <div className="flex justify-end">
  <Link
    to="/forgot-password"
    className="text-blue-600 text-sm hover:underline"
  >
    Forgot Password?
  </Link>
</div>

        <button
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
        >
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;