import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="h-20 bg-[#020617] border-b border-slate-800 px-8 flex items-center justify-between">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-cyan-400">
          OrbitCRM
        </h1>

        <p className="text-slate-400 text-sm">
          Customer Relationship Management
        </p>
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