function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">

        <div>
          <label className="font-semibold">
            Company Name
          </label>

          <input
            className="w-full border rounded-lg p-2 mt-2"
            placeholder="OrbitCRM"
          />
        </div>

        <div>
          <label className="font-semibold">
            Support Email
          </label>

          <input
            className="w-full border rounded-lg p-2 mt-2"
            placeholder="support@orbitcrm.com"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Settings;