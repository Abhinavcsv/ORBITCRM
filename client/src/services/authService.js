import api from "./api";

// ================= REGISTER USER =================

export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// ================= GET ALL USERS =================

export const getAllUsers = async () => {
  const response = await api.get("/auth/users");

  return response.data;
};

// ================= LOGIN USER =================

export const loginUser = async (userData) => {
  const response = await api.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// ================= LOGOUT USER =================

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
