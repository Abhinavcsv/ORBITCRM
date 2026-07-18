import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">
        OrbitCRM
      </h1>

      <div className="flex items-center gap-4">
        <span>🔔</span>

        <span className="font-medium">
          👤 {user?.name}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;