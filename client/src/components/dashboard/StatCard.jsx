function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${theme.border} hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;