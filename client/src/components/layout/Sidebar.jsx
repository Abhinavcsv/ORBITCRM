import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const adminMenu = [
    { icon: "🏠", name: "Dashboard", path: "/" },
    { icon: "👥", name: "Employees", path: "/employees" },
    { icon: "🤝", name: "Customers", path: "/customers" },
    { icon: "➕", name: "Register User", path: "/register-user" },
    { icon: "📈", name: "Leads", path: "/leads" },
    { icon: "✅", name: "Tasks", path: "/tasks" },
    { icon: "📊", name: "Reports", path: "/reports" },
    { icon: "⚙️", name: "Settings", path: "/settings" },
  ];

  const employeeMenu = [
    { icon: "🏠", name: "Dashboard", path: "/" },
    { icon: "📈", name: "My Leads", path: "/my-leads" },
    { icon: "✅", name: "My Tasks", path: "/my-tasks" },
    { icon: "👤", name: "Profile", path: "/profile" },
  ];

  const menu =
    user?.role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside className="w-72 h-screen bg-[#020617] border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold text-cyan-400">
          OrbitCRM
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Smart CRM Platform
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 p-5">

        <ul className="space-y-3">

          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}

        </ul>

      </div>

      {/* User */}

      <div className="border-t border-slate-800 p-5">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-white font-semibold">
              {user?.name}
            </h3>

            <p className="text-cyan-400 text-sm uppercase">
              {user?.role}
            </p>
          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl py-3 text-white font-semibold"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;