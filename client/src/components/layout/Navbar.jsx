function Navbar() {
  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">OrbitCRM</h1>

      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤 Abhinav</span>
      </div>
    </nav>
  );
}

export default Navbar;