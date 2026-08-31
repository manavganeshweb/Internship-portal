import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getCourseById } from "../../api/courseApi";
import {
  enrollInCourse,
  getMyEnrollments,
} from "../../api/enrollmentApi";

const CourseDetails = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const [courseData, enrollmentData] =
          await Promise.all([
            getCourseById(courseId),
            getMyEnrollments(),
          ]);

        if (!courseData.success) {
          throw new Error(
            courseData.message ||
              "Failed to load course"
          );
        }

        setCourse(courseData.course);

        const existingEnrollment =
          enrollmentData.enrollments?.find(
            (item) =>
              item.course?._id === courseId ||
              item.course === courseId
          );

        setEnrollment(existingEnrollment || null);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      setError("");

      const data = await enrollInCourse(courseId);

      if (!data.success) {
        throw new Error(
          data.message || "Enrollment failed"
        );
      }

      setEnrollment(data.enrollment);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to enroll"
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Loading course...
        </p>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-xl bg-red-50 px-6 py-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Course header */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-64 w-full object-cover"
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-blue-50">
              <BookOpen className="h-16 w-16 text-blue-500" />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium capitalize text-blue-600">
                {course.level}
              </span>

              <span className="flex items-center gap-1 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>

              {course.instructor && (
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <User className="h-4 w-4" />
                  {course.instructor}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {course.title}
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              {course.description}
            </p>

            {error && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6">
              {!enrollment ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enrolling
                    ? "Enrolling..."
                    : "Enroll Now"}
                </button>
              ) : (
                <Link
                  to={`/student/courses/${courseId}/learn`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <CheckCircle className="h-5 w-5" />
                  Continue Learning
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Syllabus */}
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Course Content
          </h2>

          <div className="mt-6 space-y-4">
            {course.modules?.length ? (
              course.modules
                .sort((a, b) => a.order - b.order)
                .map((module) => (
                  <div
                    key={module._id}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">
                        {module.order}. {module.title}
                      </h3>

                      <span className="text-sm text-slate-500">
                        {module.lessons?.length || 0} lessons
                      </span>
                    </div>

                    {module.lessons?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {module.lessons
                          .sort(
                            (a, b) => a.order - b.order
                          )
                          .map((lesson) => (
                            <div
                              key={lesson._id}
                              className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3"
                            >
                              <BookOpen className="h-4 w-4 text-slate-400" />

                              <span className="text-sm text-slate-700">
                                {lesson.order}.{" "}
                                {lesson.title}
                              </span>

                              <span className="ml-auto text-xs capitalize text-slate-400">
                                {lesson.type}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <p className="text-slate-500">
                Course content will be available soon.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetails;