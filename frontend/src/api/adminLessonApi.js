import api from "./axios";


// Get lessons by course

export const getLessonsByCourse = async(courseId)=>{

  const response = await api.get(
    `/admin/courses/${courseId}/lessons`
  );

  return response.data;

};




// Create lesson

export const createLesson = async(data)=>{

  const response = await api.post(
    "/admin/lessons",
    data
  );

  return response.data;

};




// Update lesson

export const updateLesson = async(
  id,
  data
)=>{

  const response = await api.put(
    `/admin/lessons/${id}`,
    data
  );

  return response.data;

};




// Delete lesson

export const deleteLesson = async(id)=>{

  const response = await api.delete(
    `/admin/lessons/${id}`
  );

  return response.data;

};