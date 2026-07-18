import { useEffect, useState } from "react";
import api from "../../services/api";
import LeadTable from "../../components/leads/LeadTable";

function MyLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchMyLeads();
  }, []);

  const fetchMyLeads = async () => {
    try {
      const res = await api.get("/leads/my-leads");
      setLeads(res.data.leads);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Leads</h1>

      <LeadTable leads={leads} />
    </div>
  );
}

export default MyLeads;