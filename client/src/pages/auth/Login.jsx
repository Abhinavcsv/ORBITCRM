import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-blue-950/20">
        {/* Centered OrbitCRM Wordmark */}
        <div className="mb-8 flex justify-center">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Orbit<span className="text-blue-600">CRM</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <Mail
                size={18}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <LockKeyhole
                size={18}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full min-w-0 rounded-xl bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="mr-2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 font-semibold text-white shadow-md shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Secure access to your OrbitCRM account
      </p>
    </div>
  );
}

export default Login;