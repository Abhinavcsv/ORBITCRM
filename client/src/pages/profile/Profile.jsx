import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          View your account information.
        </p>
      </div>

      <div className="bg-white text-gray-900 rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-500">
              {user?.role === "admin" ? "Administrator" : "Employee"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Full Name
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {user?.name || "-"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Email Address
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {user?.email || "-"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Role
            </label>

            <div className="border rounded-lg p-3 bg-gray-50 capitalize">
              {user?.role || "-"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Account Status
            </label>

            <div className="border rounded-lg p-3 bg-gray-50 text-green-600 font-semibold">
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;