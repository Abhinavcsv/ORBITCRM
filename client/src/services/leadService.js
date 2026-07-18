import api from "./api";

// Get All Leads
export const getLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};

// Create Lead
export const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

// Update Lead
export const updateLead = async (id, leadData) => {
  const response = await api.put(`/leads/${id}`, leadData);
  return response.data;
};

// Delete Lead
export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

// Get Single Lead
export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};
export const convertLead = async (id) => {
  const response = await api.post(`/leads/${id}/convert`);
  return response.data;
};