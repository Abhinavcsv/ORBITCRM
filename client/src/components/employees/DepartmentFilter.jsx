function DepartmentFilter({
  department,
  setDepartment,
}) {
  return (
    <select
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      className="border rounded-xl px-4 py-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Departments</option>
      <option value="Sales">Sales</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
    </select>
  );
}

export default DepartmentFilter;