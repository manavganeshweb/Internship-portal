import api from "./axios";

// Get all students
export const getAllStudents = async () => {
  const response = await api.get("/admin/students");
  return response.data;
};

// Get student details
export const getStudentById = async (id) => {
  const response = await api.get(
    `/admin/students/${id}`
  );

  return response.data;
};

// Get applications
export const getApplications = async () => {
  const response = await api.get(
    "/admin/applications"
  );

  return response.data;
};

// Update application status
export const updateApplicationStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/admin/applications/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(
    `/admin/students/${id}`
  );

  return response.data;
};