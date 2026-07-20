function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-4xl font-bold mt-3">--</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-4xl font-bold mt-3">--</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Total Leads</h2>
          <p className="text-4xl font-bold mt-3">--</p>
        </div>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          Reports Module Coming Soon
        </h2>
      </div>
    </div>
  );
}

export default Reports;