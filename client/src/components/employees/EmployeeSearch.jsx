import { FaSearch } from "react-icons/fa";

function EmployeeSearch({ search, setSearch }) {
  return (
    <div className="relative w-full md:w-96">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by name, email or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default EmployeeSearch;