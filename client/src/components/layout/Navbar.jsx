import { Bell, Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        OrbitCRM
      </h1>

      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition duration-200 cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 transition duration-200 cursor-pointer"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="leading-tight">
            <p className="font-semibold text-gray-800">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;