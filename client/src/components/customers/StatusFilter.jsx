function StatusFilter({
  status,
  setStatus,
}) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border rounded-lg px-4 py-3 w-full md:w-56"
    >
      <option value="">
        All Status
      </option>

      <option value="Active">
        Active
      </option>

      <option value="Inactive">
        Inactive
      </option>
    </select>
  );
}

export default StatusFilter;