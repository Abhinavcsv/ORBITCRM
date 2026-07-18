import api from "./api";

// ================= GET ALL EMPLOYEES =================

export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

// ================= GET SINGLE EMPLOYEE =================

export const getEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data;
};

// ================= CREATE EMPLOYEE =================

export const createEmployee = async (data) => {
  const res = await api.post("/employees", data);
  return res.data;
};

// ================= UPDATE EMPLOYEE =================

export const updateEmployee = async (id, data) => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};

// ================= DELETE EMPLOYEE =================

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};