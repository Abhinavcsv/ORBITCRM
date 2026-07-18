import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LeadTable from "../../components/leads/LeadTable";
import AddLeadModal from "../../components/leads/AddLeadModal";
import DeleteLeadModal from "../../components/leads/DeleteLeadModal";
import ViewLeadModal from "../../components/leads/ViewLeadModal";
import EditLeadModal from "../../components/leads/EditLeadModal";

import {
  getLeads,
  deleteLead,
  convertLead,
} from "../../services/leadService";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads();

      setLeads(data.leads);
    } catch (error) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (lead) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };
  const handleConvert = async (lead) => {
  try {
    await convertLead(lead._id);

    toast.success("Lead Converted Successfully");

    fetchLeads();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Conversion Failed"
    );
  }
};

  const handleViewClick = (lead) => {
    setSelectedLead(lead);
    setIsViewOpen(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteLead(selectedLead._id);

      toast.success("Lead Deleted Successfully");

      setIsDeleteOpen(false);
      setSelectedLead(null);

      fetchLeads();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          Loading Leads...
        </div>
      ) : (
        <LeadTable
  leads={leads}
  onDelete={handleDeleteClick}
  onView={handleViewClick}
  onEdit={handleEditClick}
  onConvert={handleConvert}
/>
      )}

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchLeads}
      />

      <ViewLeadModal
        isOpen={isViewOpen}
        lead={selectedLead}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedLead(null);
        }}
      />

      <EditLeadModal
        isOpen={isEditOpen}
        lead={selectedLead}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedLead(null);
        }}
        onSuccess={() => {
          fetchLeads();
          setIsEditOpen(false);
          setSelectedLead(null);
        }}
      />

      <DeleteLeadModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedLead(null);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
}

export default Leads;