import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
const { user } = useAuth();

  const adminMenu = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Customers", path: "/customers" },
    { name: "Register User", path: "/register-user" },
    { name: "Leads", path: "/leads" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
    { name: "AI Assistant", path: "/ai-assistant" },
    { name: "Settings", path: "/settings" },
  ];

  const employeeMenu = [
    { name: "Dashboard", path: "/" },
    { name: "My Leads", path: "/my-leads" },
    { name: "My Tasks", path: "/my-tasks" },
    { name: "Profile", path: "/profile" },
  ];

  const menu =
    user?.role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        OrbitCRM
      </h2>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        <li className="pt-5 border-t border-slate-700">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;