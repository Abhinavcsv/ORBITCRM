function CustomerSearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search Customers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-3 w-full md:w-80"
    />
  );
}

export default CustomerSearch;