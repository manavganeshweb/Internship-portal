import api from "./axios";

export const enrollInCourse = async (courseId) => {
  const response = await api.post("/enrollments", {
    courseId,
  });

  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await api.get("/enrollments/my");
  return response.data;
};
export const getEnrollmentByCourse = async (courseId) => {
  const response = await api.get(
    `/enrollments/course/${courseId}`
  );

  return response.data;
};