import api from "./axios";


// Get assignments by lesson

export const getAssignmentsByLesson = async (lessonId) => {

  const response = await api.get(
    `/admin/lessons/${lessonId}/assignments`
  );

  return response.data;

};




// Create assignment

export const createAssignment = async (data) => {

  const response = await api.post(
    "/admin/assignments",
    data
  );

  return response.data;

};




// Delete assignment

export const deleteAssignment = async (id) => {

  const response = await api.delete(
    `/admin/assignments/${id}`
  );

  return response.data;

};