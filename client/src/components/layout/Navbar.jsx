import { Bell, Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();

  return (
<<<<<<< HEAD
    <nav className="h-20 bg-[#020617] border-b border-slate-800 px-8 flex items-center justify-between">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-cyan-400">
          OrbitCRM
        </h1>

        <p className="text-slate-400 text-sm">
          Customer Relationship Management
        </p>
=======
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
>>>>>>> b3a40286e355c595ab358f69bd983afc122d4630
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="hidden md:flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 w-72">
          <span className="mr-2 text-slate-400">🔍</span>

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
          />
        </div>

        {/* Notification */}

        <button className="relative h-11 w-11 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 transition duration-300">
          🔔

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2">

          <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-white font-semibold">
              {user?.name}
            </h3>

            <p className="text-xs text-cyan-400 uppercase">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;