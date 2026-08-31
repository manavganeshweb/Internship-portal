import api from "./axios";

export const getMyCertificates = async () => {
  const response = await api.get("/certificates/my");

  return response.data;
};

export const getCertificateById = async (certificateId) => {
  const response = await api.get(
    `/certificates/${certificateId}`
  );

  return response.data;
};