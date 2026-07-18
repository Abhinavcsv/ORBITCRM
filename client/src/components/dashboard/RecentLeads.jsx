import { useEffect, useState } from "react";
import api from "../../services/api";

function RecentLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchRecentLeads();
  }, []);

  const fetchRecentLeads = async () => {
    try {
      const res = await api.get("/leads/recent");
      setLeads(res.data.leads);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Leads
      </h2>

      {leads.length === 0 ? (
        <p className="text-gray-500">
          No leads available.
        </p>
      ) : (
        <div className="space-y-4">

          {leads.map((lead) => (
            <div
              key={lead._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {lead.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {lead.company || "No Company"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  lead.status === "Won"
                    ? "bg-green-100 text-green-700"
                    : lead.status === "Lost"
                    ? "bg-red-100 text-red-700"
                    : lead.status === "New"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {lead.status}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentLeads;