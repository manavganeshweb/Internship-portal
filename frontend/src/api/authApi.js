import api from "./axios";

export const registerStudent = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginStudent = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const loginAdmin = async (data) => {
  const response = await api.post("/admin/login", data);
  return response.data;
};