import api from "./api";


export const getInternships = async () => {

  const response = await api.get("/internships");

  return response.data.internships;

};