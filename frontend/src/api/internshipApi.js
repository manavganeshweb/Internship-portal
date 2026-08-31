import api from "./axios";

export const getInternships = async () => {
  const response = await api.get("/internships");
  return response.data;
};

export const getInternshipById = async (internshipId) => {
  const response = await api.get(`/internships/${internshipId}`);
  return response.data;
};