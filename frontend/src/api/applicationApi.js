import api from "./axios";

export const applyForInternship = async (applicationData) => {
  const response = await api.post("/applications", applicationData);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

export const getApplicationById = async (applicationId) => {
  const response = await api.get(
    `/applications/${applicationId}`
  );

  return response.data;
};