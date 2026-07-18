function TaskSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default TaskSearch;