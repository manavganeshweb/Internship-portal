import api from "./axios";

// Get ALL internships for admin
export const getAllInternships = async () => {
  const response = await api.get(
    "/internships/admin/all"
  );

  return response.data;
};

// Get single internship for admin edit
export const getInternshipById = async (id) => {
  const response = await api.get(
    `/internships/admin/${id}`
  );

  return response.data;
};

// Create internship
export const createInternship = async (data) => {
  const response = await api.post(
    "/internships",
    data
  );

  return response.data;
};

// Update internship
export const updateInternship = async (
  id,
  data
) => {
  const response = await api.put(
    `/internships/${id}`,
    data
  );

  return response.data;
};

// Delete internship
export const deleteInternship = async (id) => {
  const response = await api.delete(
    `/internships/${id}`
  );

  return response.data;
};