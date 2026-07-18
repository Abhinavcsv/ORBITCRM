function TaskStatusFilter({
  status,
  setStatus,
}) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">All Status</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">
        In Progress
      </option>
      <option value="Completed">
        Completed
      </option>
    </select>
  );
}

export default TaskStatusFilter;