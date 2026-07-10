function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">OrbitCRM</h2>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-blue-400">Dashboard</li>
        <li className="cursor-pointer hover:text-blue-400">Customers</li>
        <li className="cursor-pointer hover:text-blue-400">Leads</li>
        <li className="cursor-pointer hover:text-blue-400">Tasks</li>
        <li className="cursor-pointer hover:text-blue-400">Reports</li>
        <li className="cursor-pointer hover:text-blue-400">AI Assistant</li>
        <li className="cursor-pointer hover:text-blue-400">Settings</li>
      </ul>
    </aside>
  );
}

export default Sidebar;