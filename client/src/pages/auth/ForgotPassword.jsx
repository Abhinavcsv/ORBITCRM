import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);

      navigate("/verify-otp", {
        state: {
          email,
        },
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        Forgot Password
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Enter your registered email to receive an OTP.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

      </form>

      <div className="text-center mt-5">

        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;