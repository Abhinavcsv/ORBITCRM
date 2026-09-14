function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: {
      bg: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/20",
    },
    green: {
      bg: "from-emerald-500 to-green-600",
      glow: "shadow-green-500/20",
    },
    yellow: {
      bg: "from-amber-400 to-yellow-600",
      glow: "shadow-yellow-500/20",
    },
    red: {
      bg: "from-rose-500 to-red-600",
      glow: "shadow-red-500/20",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl ${theme.glow} hover:shadow-2xl hover:-translate-y-2 hover:border-cyan-500 transition-all duration-300`}
    >
      {/* Glow */}

      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${theme.bg}`}
      ></div>

      <div className="relative z-10 flex items-center justify-between">

        <div>

          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-white mt-4">
            {value}
          </h2>

          <p className="text-emerald-400 text-sm mt-3">
            ▲ Live Statistics
          </p>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.bg} flex items-center justify-center text-white text-2xl shadow-lg`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;