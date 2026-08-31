import api from "./axios";

export const getStudentDashboard = async () => {
  const response = await api.get("/student/dashboard");
  return response.data;
};

export const markLessonComplete = async (
  enrollmentId,
  lessonId
) => {
  const response = await api.patch(
    `/progress/${enrollmentId}/lessons/${lessonId}/complete`
  );

  return response.data;
};

export const markLessonIncomplete = async (
  enrollmentId,
  lessonId
) => {
  const response = await api.patch(
    `/progress/${enrollmentId}/lessons/${lessonId}/incomplete`
  );

  return response.data;
};

export const getEnrollmentProgress = async (
  enrollmentId
) => {
  const response = await api.get(
    `/progress/${enrollmentId}`
  );

  return response.data;
};

export const registerStudent = async (studentData) => {
  const response = await api.post(
    "/auth/register",
    studentData
  );

  return response.data;
};